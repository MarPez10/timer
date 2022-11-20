import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Title } from '../Title'
import { Checkbox } from '../../lib/Checkbox'
import { Button } from '../../lib/Button'
import { Scoreboard } from '../../lib/Scoreboard'
import moment from 'moment/moment'
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const INITIAL_VALUE = '- - : - -'
export const HomeMain = () => {
  const user = useSelector((s) => s.user)

  const [startTime, setStartTime] = useState(INITIAL_VALUE)
  const [endTime, setEndTime] = useState(INITIAL_VALUE)

  const sendStartWork = async () => {
    const currentTime = moment().format('HH:mm')
    await setDoc(doc(db, 'users', user.email, 'time', moment().format('YYYY-MM-DD')), {
      start: currentTime,
      end: INITIAL_VALUE,
      day: moment().format('YYYY-MM-DD')
    })
    setStartTime(currentTime)
  }
  const sendEndWork = async () => {
    const currentTime = moment().format('HH:mm')
    await updateDoc(doc(db, 'users', user.email, 'time', moment().format('YYYY-MM-DD')), {
      end: currentTime
    })
    setEndTime(currentTime)
  }
  const getWorkTime = async () => {
    if (user.email) {
      const docRef = doc(db, 'users', user.email, 'time', moment().format('YYYY-MM-DD'))
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { start, end } = docSnap.data()
        setStartTime(start)
        setEndTime(end)
      }
    }
  }
  useEffect(() => {
    getWorkTime()
  }, [user.email])
  const PlusMinutesSchema = yup.object().shape({
    minutes: yup
      .number()
      .max(60, 'Не больше 60 минут')
      .typeError('Введите количество минут')
  })
  const { formState: { isValid } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(PlusMinutesSchema)
  })

  const [openScoreboard, setOpenScoreboard] = useState(false)
  const [changeButton, setChangeButton] = useState(false)
  const [addScoreboard, setAddScoreboard] = useState(false)
  const [doneScoreboard, setDoneScoreboard] = useState(true)

  const openSc = () => {
    setOpenScoreboard(true)
    setChangeButton(true)
    setAddScoreboard(false)
    setDoneScoreboard(false)
  }

  const [dinnerTime, setDinnerTime] = useState('')
  const addMin = async () => {
    await updateDoc(doc(db, 'users', user.email, 'time', moment().format('YYYY-MM-DD')), {
      dinnerTime: `00:${dinnerTime}`
    })
    setOpenScoreboard(true)
    setChangeButton(false)
    setAddScoreboard(true)
    setDoneScoreboard(false)
  }
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
        {openScoreboard
          ? <input
            className={styles.scoreboard}
              name='minutes'
              value={dinnerTime}
              onChange={(e) => setDinnerTime(e.target.value)}
              type='text'
              placeholder='00'
            />
          : null
        }
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
          disabled={endTime !== INITIAL_VALUE}
        />
        {doneScoreboard
          ? < Button
            style="button__dark"
            text="РАБОТАЮ В ОБЕД"
            onClick={openSc}
          />
          : null
        }
        {changeButton
          ? <Button
            style="button__dark"
            text="ДОБАВИТЬ"
            onClick={addMin}
            disabled={!isValid}
          />
          : null
        }
        {addScoreboard
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
        />
      </div>
        <Checkbox
          style="fake__ball"
          name="remember"
          type="checkbox"
          // onClick={toggleType}
          text="Работаю из дома"
        />
    </div>
  )
}
