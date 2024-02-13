import { platformIcons } from '../PlatformIcons'

/**
 * Function to get the platform icon based on the platform name.
 * @param {string} platform - The platform name.
 * @returns {string} - The platform icon.
 */
export const getPlatformIcon = (platform) => {
  return platformIcons[platform] || ''
}
  
/**
   * Function to prioritize the current device in the data array.
   * @param {Array} data - The array of devices.
   * @param {string} deviceId - The ID of the current device.
   * @returns {Array} - The updated array with the current device at the beginning.
   */
export const prioritizeCurrentDevice = (data, deviceId) => {
  if (Array.isArray(data) && deviceId) {
    const newData = [...data] // Create a new array to avoid modifying the original
    const currentDeviceIndex = newData.findIndex(device => {return device?.deviceId === deviceId})
  
    if (currentDeviceIndex !== -1) {
      const currentDevice = newData[currentDeviceIndex]
      newData?.splice(currentDeviceIndex, 1)
      newData?.unshift(currentDevice)
    }
  
    return newData
  }
  return data
}
  