import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { useSelector } from 'react-redux'
import moment from 'moment'

export const MyTable = () => {
  const user = useSelector((s) => s.user)
  const [days, setDays] = useState([])

  const getWorkTime = async () => {
    if (user.email) {
      const workingDays = await getDocs(collection(db, 'users', user.email, 'time'))
      setDays(workingDays.docs.map(item => item.data()))
    }
  }
  useEffect(() => {
    getWorkTime()
  }, [user.email])

  function getTimeIntervalStartEnd (startTime, endTime, dinnerTime) {
    const start = moment(startTime, 'HH:mm')
    const end = moment(endTime, 'HH:mm')
    const minutes = end.diff(start, 'minutes')
    const interval = moment().hour(0).minute(minutes)
    interval.add(dinnerTime, 'minutes')
    return interval.format('HH:mm')
  }

  function getDifferenceTime (startTime, endTime, dinnerTime) {
    const start = moment(startTime, 'HH:mm')
    const end = moment(endTime, 'HH:mm')
    const minutes = end.diff(start, 'minutes')
    const interval = moment().hour(0).minute(minutes)
    interval.add(dinnerTime, 'minutes')
    if (Time0900 > minutes) {
      interval.subtract(Time0900, 'minutes')
    } else {
      interval.subtract('minutes', Time0900)
    }
    return interval.format('HH:mm')
  }
  const Time0900 = moment().format('09:00')
  return (
      <div className={styles.body}>
        <div className={styles.tableBody}>
          <ul className={styles.mainRow}>
            {days.map(day =>
              (<li className={styles.row} key={`${day.day}`}>
                {`${day.day}`}
              </li>))}
            <span className={styles.headerSpan}>ДАТА</span>
          </ul>
          <ul className={styles.mainRow}>
            {days.map(day =>
              (<li className={styles.row} key={`${day.start}`}>
                {`${day.start}`}
              </li>))}
            <span className={styles.headerSpan}>ПРИШЕЛ</span>
          </ul>
          <ul className={styles.mainRow}>
            {days.map(day =>
              (<li className={styles.row} key={`${day.end}`}>
                {`${day.end}`}
              </li>))}
            <span className={styles.headerSpan}>УШЕЛ</span>
          </ul>
          <ul className={styles.mainRow}>
            {days.map(day =>
              (<li className={(getTimeIntervalStartEnd(day.start, day.end, day.dinnerTime) > Time0900)
                ? `${styles.rowGreen}`
                : (getTimeIntervalStartEnd(day.start, day.end, day.dinnerTime) < Time0900)
                    ? `${styles.rowRed}`
                    : `${styles.row}`}
                   key={`${day.start}`}>
                 {getTimeIntervalStartEnd(day.start, day.end, day.dinnerTime)}
              </li>))}
            <span className={styles.headerSpan}>ВСЕГО</span>
          </ul>
          <ul className={styles.mainRow}>
           {days.map(day =>
             (<li className={(getTimeIntervalStartEnd(day.start, day.end, day.dinnerTime) > Time0900)
               ? `${styles.rowGreenResult}`
               : (getTimeIntervalStartEnd(day.start, day.end, day.dinnerTime) < Time0900)
                   ? `${styles.rowRedResult}`
                   : `${styles.rowResult}`} key={`${day.dinnerTime}`}>
               {getDifferenceTime(day.start, day.end, day.dinnerTime)}
             </li>))}
            <span className={styles.headerSpanLast}>РЕЗУЛЬТАТ</span>
          </ul>
        </div>
      </div>
  )
}
