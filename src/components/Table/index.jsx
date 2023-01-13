import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { useSelector } from 'react-redux'
import moment from 'moment'

const INITIAL_VALUE = '- - : - -'
export const Table = () => {
  const user = useSelector((s) => s.user)
  const [days, setDays] = useState([])
  const getWorkTime = async () => {
    if (user.email) {
      const workingDays = await getDocs(collection(db, 'users', user.email, 'time'))
      setDays(workingDays.docs.map(item => item.data()))
    }
  }
  const sumPauseHours = (array) => {
    const initialValue = 0
    return array.reduce(
      (accumulator, currentValue) => +accumulator + +currentValue,
      initialValue
    )
  }
  function getTimeFromMins (mins) {
    const hours = Math.trunc(mins / 60)
    const getHours = () => {
      Math.trunc(mins / 60)
      return (hours.length !== 1) ? '0' + hours : hours
    }
    const minutes = mins % 60
    const getMinutes = () => {
      return (minutes.length !== 1) ? '0' + minutes : minutes
    }
    return getHours() + ':' + getMinutes()
  }
  function getTimeIntervalStartEnd (startTime, endTime, dinnerTime, pauseArray) {
    const start = moment(startTime, 'HH:mm')
    const end = moment(endTime, 'HH:mm')
    const minutes = end.diff(start, 'minutes')
    const pauseMinutes = sumPauseHours(pauseArray)
    const interval = moment().hour(0).minute(minutes)
    interval.add(dinnerTime, 'minutes')
    interval.subtract(pauseMinutes, 'minutes')
    return interval.format('HH:mm')
  }
  const time0900 = moment().format('09:00')
  function getDifferenceTime (total) {
    const start = moment(total, 'HH:mm')
    const end = moment('09:00', 'HH:mm')
    const minutes = Math.abs(end.diff(start, 'minutes'))
    const interval = moment().hour(0).minute(minutes)
    return interval.format('HH:mm')
  }
  useEffect(() => {
    getWorkTime()
  }, [user.email])
  return (
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <li className={styles.headerRow}>
            <div className={styles.cell}>ДАТА</div>
            <div className={styles.cell}>ПРИШЕЛ</div>
            <div className={styles.cell}>УШЕЛ</div>
            <div className={styles.cell}>ВСЕГО</div>
            <div className={styles.cell}>РЕЗУЛЬТАТ</div>
          </li>
        </div>
        <ul className={styles.tableBody}>
          {days.map(day =>
            (<li className={styles.row} key={`${day.start}${day.end}${day.pauseHours}${day.dinnerTime}`}>
              <div className={styles.cell}>
                {`${day.day}`}
              </div>
              <div className={styles.cell}>
               {`${day.start}`}
              </div>
              <div className={styles.cell}>
                {`${day.end}`}
              </div>
              <div className={(getTimeIntervalStartEnd(day.start, day.end, day.dinnerTime, day.pauseHours) > time0900)
                ? `${styles.rowGreen}`
                : (getTimeIntervalStartEnd(day.start, day.end, day.dinnerTime, day.pauseHours) < time0900)
                    ? `${styles.rowRed}`
                    : `${styles.row}`}
                  key={`${day.start}`}>
                {day.end !== INITIAL_VALUE
                  ? getTimeIntervalStartEnd(day.start, day.end, day.dinnerTime, day.pauseHours)
                  : INITIAL_VALUE}
                <div>
                  {day.dinnerTime
                    ? <div className={styles.obed}>
                      <p data-tooltip={`${day.dinnerTime}`}>
                      <span className={styles.obedIcon}>
                      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1694_29)">
                          <path d="M9.79051 0.915633L20.0849 11.21C20.3412 11.4663 20.3412 11.8824 20.0849 12.1387L18.2919 13.9317C18.0357 14.188 17.6195 14.188 17.3633 13.9317L7.06885 3.63729C6.81257 3.38101 6.81257 2.96489 7.06885 2.70861L8.86183 0.915633C9.11811 0.659353 9.53423 0.659353 9.79051 0.915633Z" fill="#00CF2C"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M6.8632 9.90669C7.30608 9.46381 8.02522 9.46369 8.4681 9.90657C8.91098 10.3494 8.91098 11.0687 8.4681 11.5116C8.02522 11.9545 7.30596 11.9545 6.86308 11.5116C6.4202 11.0687 6.42032 10.3496 6.8632 9.90669ZM5.93156 14.1377C6.37444 13.6948 7.0937 13.6948 7.53658 14.1377C7.97946 14.5805 7.97934 15.2997 7.53646 15.7426C7.09358 16.1854 6.37444 16.1856 5.93156 15.7427C5.48868 15.2998 5.48868 14.5805 5.93156 14.1377ZM7.12207 4.66675L4.9004 10.8528L2.50421 17.5251C2.20365 18.3619 2.63901 18.7972 3.47581 18.4967L10.1481 16.1005L16.3341 13.8788L7.12207 4.66675ZM10.6285 11.7192C11.0714 11.2763 11.7904 11.2763 12.2333 11.7192C12.6761 12.162 12.6763 12.8812 12.2334 13.3241C11.7905 13.7669 11.0712 13.7669 10.6284 13.3241C10.1855 12.8812 10.1856 12.162 10.6285 11.7192Z" fill="#00CF2C"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_1694_29">
                            <rect width="21" height="21" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                      </span>
                      </p>
                    </div>
                    : null}
                  {day.pauseHours.length !== 0
                    ? <div className={styles.pause}>
                      <p data-tooltip={getTimeFromMins(day.pauseHours)}>
                     <span className={styles.pauseIcon}>
                      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 2C5.81158 2 2 5.81158 2 10.5C2 15.1884 5.81158 19 10.5 19C15.1884 19 19 15.1884 19 10.5C19 5.81158 15.1884 2 10.5 2ZM9.42632 13.0411C9.42632 13.7747 8.83579 14.3653 8.10211 14.3653C7.36842 14.3653 6.77789 13.7747 6.77789 13.0411V7.95895C6.77789 7.22526 7.36842 6.63474 8.10211 6.63474C8.83579 6.63474 9.42632 7.22526 9.42632 7.95895V13.0411ZM14.2221 13.0411C14.2221 13.7747 13.6316 14.3653 12.8979 14.3653C12.1642 14.3653 11.5737 13.7747 11.5737 13.0411V7.95895C11.5737 7.22526 12.1642 6.63474 12.8979 6.63474C13.6316 6.63474 14.2221 7.22526 14.2221 7.95895V13.0411Z" fill="white"/>
                      </svg>
                    </span>
                      </p>
                    </div>
                    : null}
                </div>
              </div>
              <div className={(getTimeIntervalStartEnd(day.start, day.end, day.dinnerTime, day.pauseHours) > time0900)
                ? `${styles.rowGreenResult}`
                : (getTimeIntervalStartEnd(day.start, day.end, day.dinnerTime, day.pauseHours) < time0900)
                    ? `${styles.rowRedResult}`
                    : `${styles.rowResult}`} key={`${day.dinnerTime}`}>
                {getDifferenceTime(getTimeIntervalStartEnd(day.start, day.end, day.dinnerTime, day.pauseHours))}
              </div>
            </li>))}
        </ul>
      </div>
  )
}
