import React from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const EntranceButton = () => (<Link to="/auth/login" className={styles.entranceButton}>ВХОД</Link>)
