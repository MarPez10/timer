import React, { /* useState */ } from 'react'
import styles from './styles.module.scss'
import { Title } from '../Title'
import { HomeScoreboard } from '../HomeScoreboard'
import { ButtonsHome } from '../Button/ButtonsHome'
import { Checkbox } from '../Checkbox'

export const HomeMain = () => {
  // const [remember, setRemember] = useState(false)
  // const toggleType = () => setRemember(prev => !prev)
  return (
    <div className={styles.homeMain}>
      <Title
        title={'ОТМЕЧАЛОЧКА'}
        ending=" ."
      />
      <HomeScoreboard />
      <ButtonsHome />
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
