/**
 * Organizes schedule data by day of the week and hour, ensuring no overlapping hours on the same day.
 * @param {Array<Object>} data - Array of schedule objects.
 * @returns {Object} - Organized schedule data.
 */
export const organizeData = (data) => {
  // Create an object to hold organized data
  const organizedData = {}
  
  // Create an object for each day of the week
  for (let i = 0; i <= 6; i++) {
    organizedData[i] = []
  }
  
  // Iterate over the data and organize it by day of the week
  if (data?.length > 0) {
    data.forEach(schedule => {
      const day = schedule.schDay
      organizedData[day].push(schedule)
    })
  }
  
  // Generate the final structure considering the difference in hours
  const finalData = {}
  const hours = Array.from({ length: 24 }, (_, i) => {return i})
  
  for (let day in organizedData) {
    finalData[day] = {}
    const usedHours = new Set() // To keep track of used hours for this day
    hours.forEach(hour => {
      const events = organizedData[day].filter(schedule => {
        const startHour = parseInt(schedule.schHoSta.split(':')[0])
        const endHour = parseInt(schedule.schHoEnd.split(':')[0])
        return hour >= startHour && hour < endHour && startHour !== endHour
      })
      if (events.length > 0 && !usedHours.has(hour)) {
        finalData[day][hour] = events
        usedHours.add(hour) // Mark this hour as used
      }
    })
  }
  
  return finalData
}
  

/**
 * Reduces the organized schedule data to include only one item per day with the schedule covering the entire day.
 * @param {Object} data - Organized schedule data.
 * @returns {Object} - Reduced schedule data with one item per day covering the entire day.
 */
export const reduceDataToOneItemPerDay = (data) => {
  const reducedData = {}
  
  for (const day in data) {
    const schedules = data[day]
    if (Object.keys(schedules).length > 0) {
      // Get the first schedule of the day
      const firstSchedule = schedules[Object.keys(schedules)[0]]
      // Check if there are multiple schedules for the same day
      const multipleSchedules = Object.keys(schedules).length > 1
      if (!multipleSchedules) {
        // If there's only one schedule, use it as is
        reducedData[day] = schedules
      } else {
        // If there are multiple schedules, combine them into one covering the entire day
        const combinedSchedule = firstSchedule.reduce((acc) => {
          acc.schHoSta = '00:00' // Start time of the day
          acc.schHoEnd = '23:59' // End time of the day
          return acc
        })
        reducedData[day] = { '0': [combinedSchedule] } // Using '0' as key for the entire day
      }
    }
  }
  
  return reducedData
}