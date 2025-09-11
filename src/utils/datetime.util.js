import { format } from 'date-fns'
import OffsetInMilisecond from './offsetInMilisecond.json'

export const formatDatetime = (dateTimeString, formatString) => {
  try {
    return format(new Date(dateTimeString), formatString)
  } catch (error) {
    console.error('Error formatting date:', error)
    return null
  }
}

export function convertISOToLocalTimeWithGMT(value, gmtString, formatString) {
  // Remove "Z" latest character
  const parseValue = new Date(value.slice(0, -1))
  const timestamp = parseValue.getTime()
  const offset = OffsetInMilisecond[gmtString]

  if (offset) {
    const result = timestamp + offset
    return formatDatetime(result, formatString, true)
  }

  return '-'
}

export const convertNumberToTwoDigitals = (data) => {
  const num = parseInt(data)
  if (num < 0) {
    return '00'
  }
  if (num < 10 && num >= 0) {
    return `0${num}`
  }
  return num
}

export const convertTimeToTwoDigitals = (hour, minute) => {
  const hourString = convertNumberToTwoDigitals(hour)
  const minuteString = convertNumberToTwoDigitals(minute)

  return `${hourString}:${minuteString}`
}

export function convertTimestamp(timestamp) {
  let date = new Date(timestamp * 1000)
  let formattedDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
  return formattedDate
}

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate()
}

export function getDatesInRange(startDate, endDate, noEndDate) {
  let dates = []
  let currentDate = new Date(startDate)
  currentDate.setHours(0)

  if (noEndDate || endDate === null) {
    return Array.from({ length: 31 }, (_, i) => i + 1)
  } else {
    endDate = new Date(endDate)
  }

  do {
    dates.push(currentDate.getDate())
    currentDate.setDate(currentDate.getDate() + 1)
  } while (currentDate <= endDate)

  return dates
}

export function getUserTimeAndTimezone() {
  const now = new Date()

  let hours = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()

  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  const localTime = `${hours}:${minutes}:${seconds}`

  const timeZoneOffset = (now.getTimezoneOffset() * -1) / 60

  const timeZone = `GMT${timeZoneOffset >= 0 ? '+' : ''}${String(timeZoneOffset).padStart(2, '0')}`

  return {
    localTime: localTime,
    timeZoneOffset: timeZoneOffset,
    timeZone: timeZone
  }
}

export function CalculateUserTime(serverTime, timezoneString) {
  let serverTimezoneOffset
  let serverDate = new Date()
  const [hours, minutes] = serverTime.split(':').map(Number)
  serverDate.setHours(hours, minutes, 0, 0)
  const regex = /GMT([+-]\d+):\d+/
  const match = timezoneString.match(regex)

  if (match && match[1]) {
    serverTimezoneOffset = parseInt(match[1], 10)
  } else {
    return null
  }
  const userTimezoneOffset = getUserTimeAndTimezone().timeZoneOffset
  const timezoneDifference = userTimezoneOffset - serverTimezoneOffset
  serverDate.setHours(serverDate.getHours() + timezoneDifference)

  let userHourResult = serverDate.getHours()
  let userMinuteResult = serverDate.getMinutes()

  const userTime = `${userHourResult
    .toString()
    .padStart(2, '0')}:${userMinuteResult.toString().padStart(2, '0')}`

  return userTime
}

export function getCurrentDate() {
  const today = new Date()

  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  return {
    year,
    month,
    day
  }
}

export function convertToISOString(dateObj) {
  const { year, month, day } = dateObj

  const date = new Date(year, month - 1, day, 0, 0, 0, 0)

  return date.toISOString()
}

export function calculateDays(startDate) {
  const start = new Date(startDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const timeDifference = today - start
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  return daysDifference
}
