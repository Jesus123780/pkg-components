import qrCode from 'qrcode'

export const generateQRCodeImage = async (text) => {
  try {
    const qrDataURL = await qrCode.toDataURL(text)
    return qrDataURL
  } catch (error) {
    console.error('Error generating QR code:', error)
    return ''
  }
}
