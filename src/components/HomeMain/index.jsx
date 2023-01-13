import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Title } from '../Title'
import { Checkbox } from '../../lib/Checkbox'
import { Button } from '../../lib/Button'
import { Scoreboard } from '../../lib/Scoreboard'
import moment from 'moment/moment'
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { useSelector } from 'react-redux'

const INITIAL_VALUE = '- - : - -'
export const HomeMain = () => {
  const user = useSelector((s) => s.user)

  const [startTime, setStartTime] = useState(INITIAL_VALUE)
  const [endTime, setEndTime] = useState(INITIAL_VALUE)
  const [dinnerTime, setDinnerTime] = useState('')
  const [valueDinner, setValueDinner] = useState('')

  const [openScoreboard, setOpenScoreboard] = useState(false)
  const [addDinnerMinutes, setAddDinnerMinutes] = useState(false)
  const [DinnerMinutesDone, setDinnerMinutesDone] = useState(false)
  const [workInDinner, setWorkInDinner] = useState(true)
  const [pauseHours, setPauseHours] = useState(true)

  const currentTime = moment().format('HH:mm')
  const sendArrayPause = () => {
    const end = moment(endTime, 'HH:mm')
    const pause = moment(currentTime, 'HH:mm')
    return pause.diff(end, 'minutes')
  }
  const sendStartWork = async () => {
    await setDoc(doc(db, 'users', user.email, 'time', moment().format('YYYY-MM-DD')), {
      start: currentTime,
      end: INITIAL_VALUE,
      day: moment().format('YYYY-MM-DD'),
      fromHome: false,
      dinnerTime: null,
      pauseHours: [],
      pauseHoursToggle: false
    })
    setStartTime(currentTime)
  }
  const sendEndWork = async () => {
    const currentTime = moment().format('HH:mm')
    await updateDoc(doc(db, 'users', user.email, 'time', moment().format('YYYY-MM-DD')), {
      end: currentTime,
      pauseHoursToggle: false
    })
    setEndTime(currentTime)
    setPauseHours(false)
  }
  const sendWorkFromHome = async () => {
    await updateDoc(doc(db, 'users', user.email, 'time', moment().format('YYYY-MM-DD')), {
      fromHome: true
    })
  }
  const sendPauseHours = async () => {
    await updateDoc(doc(db, 'users', user.email, 'time', moment().format('YYYY-MM-DD')), {
      pauseHours: arrayUnion(sendArrayPause()),
      pauseHoursToggle: true,
      end: INITIAL_VALUE
    })
    setPauseHours(true)
    setEndTime(INITIAL_VALUE)
  }
  const getWorkTime = async () => {
    if (user.email) {
      const docRef = doc(db, 'users', user.email, 'time', moment().format('YYYY-MM-DD'))
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { start, end, dinnerTime, pauseHoursToggle } = docSnap.data()
        setStartTime(start)
        setEndTime(end)
        setDinnerTime(dinnerTime)
        setPauseHours(pauseHoursToggle)
        if (dinnerTime !== null) {
          setOpenScoreboard(false)
          setAddDinnerMinutes(false)
          setDinnerMinutesDone(true)
          setWorkInDinner(false)
        }
      }
    }
  }
  const openSc = () => {
    setOpenScoreboard(true)
    setAddDinnerMinutes(true)
    setDinnerMinutesDone(false)
    setWorkInDinner(false)
  }
  const setNumber = ({ target }) => {
    let { value, min, max } = target
    value = Math.max(Number(min), Math.min(Number(max), Number(value)))
    setValueDinner(value)
    setDinnerTime(value)
  }
  const onChange = ({ target: { value } }) => setValueDinner(prev => /\d+/.test(Number(value)) ? value : prev)
  const sendDinnerMinutes = async () => {
    await updateDoc(doc(db, 'users', user.email, 'time', moment().format('YYYY-MM-DD')), {
      dinnerTime: (`00:${dinnerTime}` === '00:60') ? '01:00' : (sendDinnerMinutes.length < 5) ? `00:0${dinnerTime}` : `00:${dinnerTime}`
    })
    setOpenScoreboard(true)
    setAddDinnerMinutes(false)
    setDinnerMinutesDone(true)
    setWorkInDinner(false)
  }
  useEffect(() => {
    getWorkTime()
    setPauseHours()
  }, [user.email])
  return (
    <div className={styles.homeMain}>
      <Title
        title={'ОТМЕЧАЛОЧКА'}
        ending=" ."
      />
      <div className={styles.homeScoreboard}>
        <Scoreboard
          text={startTime}
          style="red"
        />
        <Scoreboard
          text={endTime}
          style="green"
        />
        <div className={styles.scoreboardWhite}>
          {(dinnerTime !== null)
            ? <Scoreboard
              text={dinnerTime}
              style="white"
            />
            : null}
          {openScoreboard
            ? <div className={styles.addMinutesBlock}>
              {addDinnerMinutes
                ? <span className={styles.addMinutesSpan}>Введи количество отработанных минут</span>
                : null
              }
              <input
                {...{ valueDinner, onChange }}
                className={styles.scoreboard}
                name='minutes'
                value={valueDinner}
                onChange={setNumber}
                type='number'
                placeholder='00'
                max='60'
              />
            </div>

            : null
          }
        </div>
      </div>
      <div className={styles.buttonsHome}>
        <Button
          width={'290px'}
          style="buttonRed"
          text="ПРИШЕЛ НА РАБОТУ"
          onClick={sendStartWork}
          disabled={startTime !== INITIAL_VALUE}
        />
         <Button
          style="button__white"
          text="УШЕЛ ДОДОМУ"
          onClick={sendEndWork}
          disabled={(endTime !== INITIAL_VALUE) && pauseHours === false}
        />
        {workInDinner
          ? < Button
            style="button__dark"
            text="РАБОТАЮ В ОБЕД"
            onClick={openSc}
          />
          : null
        }
        {addDinnerMinutes
          ? <Button
            style="button__dark"
            text="ДОБАВИТЬ"
            onClick={sendDinnerMinutes}
            // disabled={!isValid}
          />
          : null
        }
        {DinnerMinutesDone
          ? <Button
            style="button__dark"
            text="ВРЕМЯ ДОБАВЛЕНО"
            disabled={true}
          />
          : null
        }
        <Button
          style="button__dark"
          text="ПРОДОЛЖИТЬ РАБОТУ"
          onClick={sendPauseHours}
          disabled={pauseHours}
        />
      </div>
        <Checkbox
          style="fake__ball"
          name="remember"
          type="checkbox"
          onClick={sendWorkFromHome}
          text="Работаю из дома"
        />
    </div>
  )
}
