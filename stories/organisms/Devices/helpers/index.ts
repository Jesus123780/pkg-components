import { platformIcons } from '../PlatformIcons'

/**
 * Function to get the platform icon based on the platform name.
 * @param {keyof typeof platformIcons} platform - The platform name.
 * @returns {Element | ''} - The platform icon.
 */
export const getPlatformIcon = (platform: keyof typeof platformIcons) => {
  return platformIcons[platform] || ''
}

/**
   * Function to prioritize the current device in the data array.
   * @param {Array} data - The array of devices.
   * @param {string} deviceId - The ID of the current device.
   * @returns {Array} - The updated array with the current device at the beginning.
   */
interface Device {
  deviceId: string
  [key: string]: any
}

export const prioritizeCurrentDevice = (data: Device[], deviceId: string): Device[] => {
  if (Array.isArray(data) && deviceId) {
    const newData = [...data] // Create a new array to avoid modifying the original
    const currentDeviceIndex = newData.findIndex((device: Device) => { return device?.deviceId === deviceId })

    if (currentDeviceIndex !== -1) {
      const currentDevice = newData[currentDeviceIndex]
      newData?.splice(currentDeviceIndex, 1)
      newData?.unshift(currentDevice)
    }

    return newData
  }
  return data
}
