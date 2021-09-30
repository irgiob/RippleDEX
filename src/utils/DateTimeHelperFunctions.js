import { Timestamp } from "firebase/firestore"

/**
 *  Converts milliseconds to seconds for converting to epoch
 * @param {Number} ms
 * @returns value in seconds without decimal place
 */
export const msToSeconds = ms => {
  if (!ms) {
    return null
  }
  return Math.floor(ms / 1000.0)
}
/**
 *
 * @param {Date} date
 * @returns {String} string in epoch time
 */
export const dateToEpoch = date => {
  if (!date) {
    return null
  }
  return msToSeconds(date.getTime()).toString()
}

/**
 * Converts epoch time to date object
 * @param {String} epoch
 * @returns {Date} date object
 */
export const epochToDate = epoch => {
  if (!epoch) {
    return null
  }
  let d = new Date(0)
  d.setUTCSeconds(parseInt(epoch))
  return d
}

export const msToEpoch = ms => {
  if (!ms) {
    return null
  }
  return msToSeconds(ms).toString()
}

export const dateToFirebaseTimestamp = date => {
  return Timestamp.fromDate(date)
}