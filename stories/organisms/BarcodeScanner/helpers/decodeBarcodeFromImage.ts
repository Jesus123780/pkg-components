import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType
} from '@zxing/library'

/** Tipos de imagen aceptados por el lector. */
export const ACCEPTED_IMAGE_MIME = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

/** Tamaño máximo de imagen (bytes). Configurable y coherente con el proyecto. */
export const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024 // 8 MB

export interface DecodeImageResult {
  success: boolean
  /** Código decodificado (string, preserva ceros). */
  code: string | null
  /** Formato ZXing detectado, p. ej. 'EAN_13'. */
  format: string | null
  /** Mensaje legible para la UI cuando falla. */
  message: string
}

/**
 * Valida el archivo ANTES de intentar decodificar:
 * - tipo MIME permitido (no confía solo en la extensión),
 * - tamaño dentro del límite,
 * - no vacío.
 * Verifica además la "magic number" del contenido para no fiarse del MIME
 * informado por el navegador.
 */
export const validateImageFile = async (
  file: File
): Promise<{ valid: boolean; message: string }> => {
  if (!file) {
    return { valid: false, message: 'No se seleccionó ninguna imagen.' }
  }
  if (file.size === 0) {
    return { valid: false, message: 'La imagen está vacía.' }
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    const mb = (MAX_IMAGE_SIZE_BYTES / (1024 * 1024)).toFixed(0)
    return { valid: false, message: `La imagen supera el tamaño máximo de ${mb} MB.` }
  }
  if (!ACCEPTED_IMAGE_MIME.includes(file.type)) {
    return { valid: false, message: 'Formato no soportado. Usa JPG, PNG o WebP.' }
  }

  // Verificación por "magic number": no confiar solo en file.type.
  try {
    const header = new Uint8Array(await file.slice(0, 12).arrayBuffer())
    const isJpg = header[0] === 0xff && header[1] === 0xd8
    const isPng =
      header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4e && header[3] === 0x47
    const isWebp =
      header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46 &&
      header[8] === 0x57 && header[9] === 0x45 && header[10] === 0x42 && header[11] === 0x50
    if (!isJpg && !isPng && !isWebp) {
      return { valid: false, message: 'El contenido del archivo no es una imagen válida.' }
    }
  } catch {
    // Si no se puede leer la cabecera, dejamos pasar: ZXing fallará de forma controlada.
  }

  return { valid: true, message: '' }
}

/**
 * Modo de decodificación:
 * - 'linear': códigos de barras lineales (EAN/UPC/CODE/ITF).
 * - 'qr': solo QR.
 * - 'all': lineales + QR.
 */
export type DecodeMode = 'linear' | 'qr' | 'all'

const LINEAR_FORMATS = [
  BarcodeFormat.EAN_13,
  BarcodeFormat.EAN_8,
  BarcodeFormat.UPC_A,
  BarcodeFormat.UPC_E,
  BarcodeFormat.CODE_128,
  BarcodeFormat.CODE_39,
  BarcodeFormat.ITF
]

/** Crea un lector ZXing configurado para el modo indicado. */
const createReader = (mode: DecodeMode = 'linear'): BrowserMultiFormatReader => {
  const hints = new Map()
  const formats =
    mode === 'qr'
      ? [BarcodeFormat.QR_CODE]
      : mode === 'all'
        ? [...LINEAR_FORMATS, BarcodeFormat.QR_CODE]
        : LINEAR_FORMATS
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats)
  hints.set(DecodeHintType.TRY_HARDER, true)
  return new BrowserMultiFormatReader(hints)
}

/**
 * Decodifica un código desde un archivo de imagen, 100% en el navegador (no se
 * envía la imagen al backend). Procesa, decodifica y libera los recursos/URL
 * temporales. Soporta códigos lineales y/o QR según `mode`.
 *
 * @param file - Imagen seleccionada por el usuario.
 * @param mode - Modo de decodificación ('linear' por defecto).
 * @returns Resultado con el código detectado o un mensaje de error recuperable.
 */
export const decodeBarcodeFromImage = async (
  file: File,
  mode: DecodeMode = 'linear'
): Promise<DecodeImageResult> => {
  const validation = await validateImageFile(file)
  if (!validation.valid) {
    return { success: false, code: null, format: null, message: validation.message }
  }

  const reader = createReader(mode)
  let objectUrl = ''
  try {
    objectUrl = URL.createObjectURL(file)
    const result = await reader.decodeFromImageUrl(objectUrl)
    const code = result?.getText?.() ?? ''
    const format = result?.getBarcodeFormat
      ? BarcodeFormat[result.getBarcodeFormat()]
      : null

    if (!code) {
      return {
        success: false,
        code: null,
        format,
        message: 'No se detectó ningún código en la imagen.'
      }
    }

    return {
      success: true,
      code: `${code}`,
      format,
      message: 'Código detectado en la imagen.'
    }
  } catch {
    // ZXing lanza NotFoundException cuando no encuentra un código.
    return {
      success: false,
      code: null,
      format: null,
      message: 'No pudimos leer un código de barras en esa imagen. Prueba con otra foto más nítida.'
    }
  } finally {
    try {
      reader.reset()
    } catch {
      // ignore
    }
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl)
    }
  }
}
