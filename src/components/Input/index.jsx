import {useState} from 'react'
import styles from './styles.module.scss'

export const Input = ({name, placeholder, type}) => {
  const [isTypeText, setIsTypeText] = useState(false)
  const toggleType = () => setIsTypeText(prev => !prev)

  return (
    <div className={styles.wrapper}>
      <input className={styles.input} name={name} placeholder={placeholder} type={isTypeText ? "text" : type}/>
      {name === "password" ? (
        <button onClick={toggleType} className={styles.eyeBlock} type={"button"}>
          {isTypeText ?
            <svg className={styles.passOpen} width="24" height="24" viewBox="0 0 24 24" fill="white"
              xmlns="http://www.w3.org/2000/svg"> <path d="M12 9C11.206 9.00524 10.4459
          9.32299 9.88447 9.88447C9.32299 10.4459 9.00524 11.206 9 12C9 13.642
          10.358 15 12 15C13.641 15 15 13.642 15 12C15 10.359 13.641 9 12 9Z" fill="#A1A1A1"/>
              <path d="M11.9998 5C4.3668 5 2.0728 11.617 2.0518 11.684L1.9458 12L2.0508
          12.316C2.0728 12.383 4.3668 19
          11.9998 19C19.6328 19 21.9268 12.383 21.9478 12.316L22.0538 12L21.9488
          11.684C21.9268 11.617 19.6328 5
          11.9998 5ZM11.9998 17C6.6488 17 4.5758 13.154 4.0738 12C4.5778 10.842
          6.6518 7 11.9998 7C17.3508 7 19.4238
          10.846 19.9258 12C19.4218 13.158 17.3478 17 11.9998 17Z" fill="#A1A1A1"/>
            </svg>
            :
            <svg className={styles.passClose} width="24" height="24" viewBox="0 0 24 24" fill="white"
              xmlns="http://www.w3.org/2000/svg"><path d="M12.0002 19C12.9462 19 13.8102 18.897
          14.5982 18.719L12.8412 16.962C12.5682 16.983 12.2912 17
          12.0002 17C6.64922 17 4.57622 13.154 4.07422 12C4.45117 11.1588 4.96027 10.3833 5.58222 9.703L4.18422
          8.305C2.64622 9.972 2.06322 11.651 2.05222 11.684C1.98324 11.8894 1.98324 12.1116 2.05222 12.317C2.07322
          12.383 4.36722 19 12.0002 19ZM12.0002 5C10.1632 5 8.65422 5.396 7.39622 5.981L3.70722 2.293L2.29322
          3.707L20.2932 21.707L21.7072 20.293L18.3882 16.974C21.0022 15.023 21.9352 12.359 21.9492 12.317C22.0182
          12.1116 22.0182 11.8894 21.9492 11.684C21.9272 11.617 19.6332 5 12.0002 5ZM16.9722 15.558L14.6922
          13.278C14.8822 12.888 15.0002 12.459 15.0002 12C15.0002 10.359 13.6412 9 12.0002 9C11.5412 9 11.1122
          9.118 10.7232 9.309L8.91522 7.501C9.90774 7.16041 10.9509 6.991 12.0002 7C17.3512 7 19.4242 10.846
          19.9262 12C19.6242 12.692 18.7602 14.342 16.9722 15.558Z" fill="#A1A1A1"/>
            </svg>}
        </button>
      ): null}
    </div>
  )
}


// function TypePassword() {
//   const [passInputChange, setPassInputChange] = useState('')
//   const [passInputClasses, setPassInputClasses] = useState('pass-input-passive')
//   const [toggleIcon, setToggleIcon] = useState('.passOpen')
//   const [toggleIconClasses, setToggleIconClasses] = useState('toggle-icon-passive')
//   const [ripple, setRipple] = useState('')
//   const [type, setType] = useState('password')
//
//   return (
//     <div className="TypePassword">
//       <div className='input-container'>
//         <div className='input-group'>
//
//         </div>
//       </div>
//     </div>
//   )
// }


// export const Input = (props) => {
//   // console.log(props.test)
//   return (
//     <input className={styles.input} name={props.name} placeholder={props.placeholder} type={props.type}/>
//   )
// }
