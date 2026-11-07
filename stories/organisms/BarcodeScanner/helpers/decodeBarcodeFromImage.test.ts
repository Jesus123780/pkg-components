import {
  ACCEPTED_IMAGE_MIME,
  MAX_IMAGE_SIZE_BYTES,
  validateImageFile
} from './decodeBarcodeFromImage'

/**
 * Crea un File de prueba con bytes de cabecera concretos y un tipo MIME.
 *
 * jsdom no implementa de forma fiable `Blob.slice().arrayBuffer()`, así que
 * añadimos un `arrayBuffer`/`slice` deterministas sobre el File para poder
 * ejercitar la verificación real de "magic number" del helper (en navegador
 * real esta capacidad existe de forma nativa).
 */
const makeFile = (
  headerBytes: number[],
  type: string,
  totalSize = 1024
): File => {
  const bytes = new Uint8Array(totalSize)
  headerBytes.forEach((b, i) => {
    bytes[i] = b
  })
  const file = new File([bytes], 'test', { type })

  const makeSliceable = (buf: Uint8Array): any => ({
    arrayBuffer: async () => buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
    slice: (start = 0, end = buf.length) => makeSliceable(buf.slice(start, end))
  })

  Object.defineProperty(file, 'arrayBuffer', {
    value: async () => bytes.buffer.slice(0),
    configurable: true
  })
  Object.defineProperty(file, 'slice', {
    value: (start = 0, end = bytes.length) => makeSliceable(bytes.slice(start, end)),
    configurable: true
  })

  return file
}

// Magic numbers reales de cada formato.
const JPG_HEADER = [0xff, 0xd8, 0xff, 0xe0]
const PNG_HEADER = [0x89, 0x50, 0x4e, 0x47]
const WEBP_HEADER = [0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50]

describe('validateImageFile', () => {
  it('acepta un JPG válido (MIME + magic number)', async () => {
    const file = makeFile(JPG_HEADER, 'image/jpeg')
    const res = await validateImageFile(file)
    expect(res.valid).toBe(true)
  })

  it('acepta un PNG válido', async () => {
    const file = makeFile(PNG_HEADER, 'image/png')
    const res = await validateImageFile(file)
    expect(res.valid).toBe(true)
  })

  it('acepta un WebP válido', async () => {
    const file = makeFile(WEBP_HEADER, 'image/webp')
    const res = await validateImageFile(file)
    expect(res.valid).toBe(true)
  })

  it('rechaza un MIME no soportado', async () => {
    const file = makeFile(JPG_HEADER, 'application/pdf')
    const res = await validateImageFile(file)
    expect(res.valid).toBe(false)
    expect(res.message).toMatch(/no soportado/i)
  })

  it('rechaza un archivo que supera el tamaño máximo', async () => {
    // MIME y magic ok, pero tamaño > límite.
    const file = makeFile(JPG_HEADER, 'image/jpeg', MAX_IMAGE_SIZE_BYTES + 1)
    const res = await validateImageFile(file)
    expect(res.valid).toBe(false)
    expect(res.message).toMatch(/tamaño/i)
  })

  it('rechaza un archivo vacío', async () => {
    const file = new File([], 'empty', { type: 'image/png' })
    const res = await validateImageFile(file)
    expect(res.valid).toBe(false)
  })

  it('rechaza cuando el MIME dice imagen pero el contenido no lo es (magic inválido)', async () => {
    // type image/png pero cabecera no corresponde a ningún formato.
    const file = makeFile([0x00, 0x01, 0x02, 0x03], 'image/png')
    const res = await validateImageFile(file)
    expect(res.valid).toBe(false)
    expect(res.message).toMatch(/no es una imagen/i)
  })

  it('expone la lista de MIME aceptados y el límite', () => {
    expect(ACCEPTED_IMAGE_MIME).toContain('image/jpeg')
    expect(ACCEPTED_IMAGE_MIME).toContain('image/png')
    expect(ACCEPTED_IMAGE_MIME).toContain('image/webp')
    expect(MAX_IMAGE_SIZE_BYTES).toBeGreaterThan(0)
  })
})
