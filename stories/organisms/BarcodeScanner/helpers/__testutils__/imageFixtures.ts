/**
 * Utilidades SOLO para tests: generan imágenes PNG REALES de códigos de barras
 * y QR, y las decodifican con el núcleo de ZXing (sin DOM/canvas), para validar
 * de verdad la lectura de imágenes (no mocks).
 *
 * - Lineales: jsbarcode renderiza a un <svg> del DOM (jsdom) y sharp lo
 *   rasteriza a PNG.
 * - QR: qrcode genera el PNG directamente.
 * - Decodificación: sharp extrae los píxeles RGBA y ZXing core
 *   (MultiFormatReader + RGBLuminanceSource + HybridBinarizer) decodifica.
 */
import {
  BarcodeFormat,
  BinaryBitmap,
  DecodeHintType,
  HybridBinarizer,
  MultiFormatReader,
  RGBLuminanceSource
} from '@zxing/library'
import JsBarcode from 'jsbarcode'
// 'qrcode' no trae tipos propios; solo se usa en utilidades de test.
// @ts-expect-error -- no type declarations for 'qrcode'
import QRCode from 'qrcode'
import sharp from 'sharp'

export type LinearFixtureFormat = 'EAN13' | 'EAN8' | 'UPC' | 'CODE128' | 'CODE39'

/** Genera un PNG real de un código de barras lineal con el valor dado. */
export const makeLinearBarcodePng = async (
  value: string,
  format: LinearFixtureFormat = 'EAN13',
  opts: { width?: number; height?: number; margin?: number } = {}
): Promise<Buffer> => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  JsBarcode(svg, value, {
    format,
    width: opts.width ?? 3,
    height: opts.height ?? 120,
    margin: opts.margin ?? 20,
    displayValue: false,
    background: '#ffffff',
    lineColor: '#000000'
  })
  let svgString = new XMLSerializer().serializeToString(svg)
  // jsbarcode añade su propio xmlns y createElementNS otro: el serializer
  // produce un `xmlns` duplicado que libxml (sharp) rechaza. Dejamos un único
  // xmlns en la etiqueta <svg> raíz.
  svgString = svgString.replace(
    /<svg([^>]*)>/,
    (_m, attrs: string) => {
      const cleaned = attrs.replace(/\s*xmlns(:xlink)?="[^"]*"/g, '')
      return `<svg xmlns="http://www.w3.org/2000/svg"${cleaned}>`
    }
  )
  return await sharp(Buffer.from(svgString)).png().toBuffer()
}

/** Genera un PNG real de un código QR con el texto dado. */
export const makeQrPng = async (text: string): Promise<Buffer> => {
  return await QRCode.toBuffer(text, { type: 'png', width: 300, margin: 2 })
}

/** Aplica una rotación al PNG (para probar imágenes rotadas). */
export const rotatePng = async (png: Buffer, degrees: number): Promise<Buffer> => {
  return await sharp(png).rotate(degrees, { background: '#ffffff' }).png().toBuffer()
}

/** Reduce el brillo del PNG (simula poca iluminación). */
export const darkenPng = async (png: Buffer, factor = 0.45): Promise<Buffer> => {
  return await sharp(png).modulate({ brightness: factor }).png().toBuffer()
}

/** Compone dos códigos lineales en una sola imagen (varios códigos). */
export const composeTwoBarcodesPng = async (a: Buffer, b: Buffer): Promise<Buffer> => {
  const top = await sharp(a).resize({ width: 400 }).toBuffer()
  const bottom = await sharp(b).resize({ width: 400 }).toBuffer()
  const topMeta = await sharp(top).metadata()
  const bottomMeta = await sharp(bottom).metadata()
  const width = 400
  const height = (topMeta.height ?? 160) + (bottomMeta.height ?? 160) + 40
  return await sharp({
    create: { width, height, channels: 3, background: '#ffffff' }
  })
    .composite([
      { input: top, top: 10, left: 0 },
      { input: bottom, top: (topMeta.height ?? 160) + 30, left: 0 }
    ])
    .png()
    .toBuffer()
}

/** Imagen en blanco (sin código). */
export const makeBlankPng = async (): Promise<Buffer> => {
  return await sharp({ create: { width: 300, height: 150, channels: 3, background: '#ffffff' } })
    .png()
    .toBuffer()
}

export interface DecodeResult {
  text: string | null
  format: string | null
}

/**
 * Decodifica un PNG con el núcleo de ZXing en Node (sin DOM/canvas). Extrae los
 * píxeles con sharp y construye una fuente de luminancia RGB para el lector
 * multi-formato. Devuelve el texto y formato o null si no encuentra código.
 */
export const decodePngWithZxing = async (
  png: Buffer,
  mode: 'linear' | 'qr' | 'all' = 'all'
): Promise<DecodeResult> => {
  const { data, info } = await sharp(png)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height } = info
  // RGBLuminanceSource (esta versión de ZXing) espera un buffer de LUMINANCIAS
  // ya calculadas de tamaño width*height (no RGBA crudo). Convertimos RGBA →
  // luminancia con los pesos estándar (Rec. 601).
  const luminances = new Uint8ClampedArray(width * height)
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    luminances[j] = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) | 0
  }

  const hints = new Map()
  const formats =
    mode === 'qr'
      ? [BarcodeFormat.QR_CODE]
      : mode === 'linear'
        ? [
            BarcodeFormat.EAN_13,
            BarcodeFormat.EAN_8,
            BarcodeFormat.UPC_A,
            BarcodeFormat.UPC_E,
            BarcodeFormat.CODE_128,
            BarcodeFormat.CODE_39,
            BarcodeFormat.ITF
          ]
        : [
            BarcodeFormat.EAN_13,
            BarcodeFormat.EAN_8,
            BarcodeFormat.UPC_A,
            BarcodeFormat.UPC_E,
            BarcodeFormat.CODE_128,
            BarcodeFormat.CODE_39,
            BarcodeFormat.ITF,
            BarcodeFormat.QR_CODE
          ]
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats)
  hints.set(DecodeHintType.TRY_HARDER, true)

  const reader = new MultiFormatReader()
  reader.setHints(hints)

  const source = new RGBLuminanceSource(luminances, width, height)
  const bitmap = new BinaryBitmap(new HybridBinarizer(source))

  try {
    const result = reader.decode(bitmap)
    return {
      text: result.getText(),
      format: BarcodeFormat[result.getBarcodeFormat()]
    }
  } catch {
    return { text: null, format: null }
  }
}
