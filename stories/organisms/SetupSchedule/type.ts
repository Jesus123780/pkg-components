export interface Day {
  day: string
  loading: boolean
  name: string
  schHoEnd: string
  schHoSta: string
  schId: string
}

export interface SetupScheduleProps {
  days?: Day[]
  selectedDays?: number[]
  totalHours?: number
  dynamicDays?: Day[]
  times?: string[]
  hours?: number
  handleSelectedDay?: (day: number) => void
  setOpenModal?: (state: any) => void
  handleDeleteSchedule?: (day: string) => void
  onChangeSaveHour?: (args: { time: string, name: string, day: string }) => void
  loading?: boolean
}
