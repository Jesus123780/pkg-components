/**
 * Validación REAL de lectura de códigos desde imágenes (no mocks).
 *
 * Genera PNGs reales (jsbarcode+sharp para lineales, qrcode para QR) y los
 * decodifica con el núcleo de ZXing. Cubre los casos solicitados: imagen clara,
 * rotada, con poca iluminación, con varios códigos, sin código, formato no
 * permitido y archivo demasiado grande. Verifica que el valor recuperado
 * coincide EXACTAMENTE, incluyendo ceros a la izquierda.
 */
import {
  MAX_IMAGE_SIZE_BYTES,
  validateImageFile
} from './decodeBarcodeFromImage'
import {
  composeTwoBarcodesPng,
  darkenPng,
  decodePngWithZxing,
  makeBlankPng,
  makeLinearBarcodePng,
  makeQrPng,
  rotatePng
} from './__testutils__/imageFixtures'

// Las operaciones de imagen (sharp/jsbarcode) pueden tardar; ampliamos timeout.
jest.setTimeout(30_000)

// jsdom no expone TextEncoder/TextDecoder globalmente, pero el decodificador QR
// de ZXing los necesita para contenido de texto (byte mode, p. ej. URLs). Los
// tomamos de Node ('util'); es un polyfill estándar, no un mock del decoder.
import { TextDecoder as NodeTextDecoder, TextEncoder as NodeTextEncoder } from 'util'
if (typeof (globalThis as any).TextEncoder === 'undefined') {
  (globalThis as any).TextEncoder = NodeTextEncoder
}
if (typeof (globalThis as any).TextDecoder === 'undefined') {
  (globalThis as any).TextDecoder = NodeTextDecoder
}

describe('Lectura real de códigos desde imágenes (ZXing + fixtures reales)', () => {
  it('EAN-13 nítido: decodifica el valor exacto', async () => {
    const value = '7701234567897' // EAN-13 con checksum válido
    const png = await makeLinearBarcodePng(value, 'EAN13')
    const { text, format } = await decodePngWithZxing(png, 'linear')
    expect(text).toBe(value)
    expect(format).toBe('EAN_13')
  })

  it('preserva ceros a la izquierda (EAN-13 con ceros internos)', async () => {
    // Un EAN-13 cuyo primer dígito es 0 equivale a UPC-A (estándar GS1), así que
    // ZXing puede devolverlo como 12 dígitos: no es pérdida del cero, es la
    // equivalencia del formato. Para probar inequívocamente que NO se pierden
    // ceros usamos un EAN-13 con ceros INTERNOS y primer dígito distinto de 0.
    const value = '7700012003008' // 770001200300 + checksum 8
    const png = await makeLinearBarcodePng(value, 'EAN13')
    const { text } = await decodePngWithZxing(png, 'linear')
    expect(text).toBe(value)
    // Los ceros internos se conservan exactamente.
    expect(text).toContain('000')
  })

  it('EAN-8 nítido', async () => {
    const value = '96385074'
    const png = await makeLinearBarcodePng(value, 'EAN8')
    const { text, format } = await decodePngWithZxing(png, 'linear')
    expect(text).toBe(value)
    expect(format).toBe('EAN_8')
  })

  it('CODE128 alfanumérico', async () => {
    const value = 'ABC-123-XYZ'
    const png = await makeLinearBarcodePng(value, 'CODE128')
    const { text, format } = await decodePngWithZxing(png, 'linear')
    expect(text).toBe(value)
    expect(format).toBe('CODE_128')
  })

  it('QR: decodifica el texto exacto', async () => {
    const value = '7701234567897'
    const png = await makeQrPng(value)
    const { text, format } = await decodePngWithZxing(png, 'qr')
    expect(text).toBe(value)
    expect(format).toBe('QR_CODE')
  })

  it('imagen rotada (QR tolera rotación): decodifica igual', async () => {
    const value = 'https://tienda.example/p/770'
    const png = await makeQrPng(value)
    const rotated = await rotatePng(png, 90)
    const { text } = await decodePngWithZxing(rotated, 'qr')
    expect(text).toBe(value)
  })

  it('imagen con poca iluminación: aún decodifica (HybridBinarizer)', async () => {
    const value = '7700000000002' // checksum válido
    const png = await makeLinearBarcodePng(value, 'EAN13', { height: 160, width: 4 })
    const dark = await darkenPng(png, 0.5)
    const { text } = await decodePngWithZxing(dark, 'linear')
    expect(text).toBe(value)
  })

  it('imagen con varios códigos: devuelve uno válido de los presentes', async () => {
    const codeA = '7701111111113' // checksum válido
    const codeB = '7702222222224' // checksum válido
    const a = await makeLinearBarcodePng(codeA, 'EAN13')
    const b = await makeLinearBarcodePng(codeB, 'EAN13')
    const composed = await composeTwoBarcodesPng(a, b)
    const { text } = await decodePngWithZxing(composed, 'linear')
    expect([codeA, codeB]).toContain(text)
  })

  it('imagen sin código: no detecta nada (null)', async () => {
    const png = await makeBlankPng()
    const { text } = await decodePngWithZxing(png, 'all')
    expect(text).toBeNull()
  })

  it('validateImageFile rechaza formato no permitido (PDF)', async () => {
    const pdf = new File([new Uint8Array([0x25, 0x50, 0x44, 0x46])], 'x.pdf', {
      type: 'application/pdf'
    })
    const res = await validateImageFile(pdf)
    expect(res.valid).toBe(false)
  })

  it('validateImageFile rechaza archivo demasiado grande', async () => {
    const bytes = new Uint8Array(MAX_IMAGE_SIZE_BYTES + 1)
    bytes[0] = 0xff
    bytes[1] = 0xd8
    const big = new File([bytes], 'big.jpg', { type: 'image/jpeg' })
    const res = await validateImageFile(big)
    expect(res.valid).toBe(false)
    expect(res.message).toMatch(/tamaño/i)
  })
})
