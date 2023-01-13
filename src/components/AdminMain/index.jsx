// import React from 'react'
// import styles from './styles.module.scss'
// import { Title } from '../Title'
// import { Button } from '../../lib/Button'
// import { useSelector } from 'react-redux'
//
// export const AdminMain = () => {
//   const user = useSelector((s) => s.user)
//   // console.log(user)
//   // const start = moment()
//   // const end = moment()
//   // console.log(moment())
//
//   // const startWork = async () => {
//   //   await setDoc(doc(db, 'users', user.email, 'time', moment().format('YYYY-MM-DD')), {
//   //     start: moment().format('HH:mm')
//   //   })
//   //   // console.log(moment().format('YYYY-MM-DD'))
//   // }
//   // const endWork = async () => {
//   //   await updateDoc(doc(db, 'users', user.email, 'time', moment().format('YYYY-MM-DD')), {
//   //     end: moment().format('HH:mm')
//   //   })
//   //   // console.log(moment().format('YYYY-MM-DD'))
//   // }
//   // const startWork = doc(db, 'users', data.email, 'startWorkTime', 'timeNow')
//
//   // const startWork = async (data) => {
//   //   await console.log(now.format('HH:mm'))
//   //   await addDoc(collection(db, 'users'), {
//   //     startWorkTime: data.name
//   //   })
//   // }
//
//   return (
//     <div className={styles.adminMain}>
//       <Title
//         title={'АДМИН ПАНЕЛЬ'}
//         ending=" ."
//       />
//       <div className={styles.buttonsAdmin}>
//         <Button
//           style="buttonAdmin__red"
//           text="ПОКАЗАТЬ  СКОЛЬКО ОТРАБОТАНО"
//           // onClick={startWork}
//         />
//         <Button
//           style="buttonAdmin__dark"
//           text="ДОБАВИТЬ РАБОЧЕЕ ВРЕМЯ"
//           // onClick={startWork}
//       />
//         <Button
//           style="buttonAdmin__dark"
//           text="ДОБАВИТЬ ВРЕМЯ В ОБЕД"
//           // onClick={startWork}
//       />
//       </div>
//       <Button
//         width={'290px'}
//         style="buttonRed"
//         text="ПРИШЕЛ НА РАБОТУ"
//         // onClick={startWork}
//       />
//     </div>
//   )
// }
