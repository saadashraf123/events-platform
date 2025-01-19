import React from 'react'
import styles from './style.module.css'
import { ReactComponent as AppLoaderSVG } from '../../assets/app-loader.svg'

const AppLoader = () => {
  return (
    <div className={styles.wrapper}>
      <AppLoaderSVG className={styles.loader} />
    </div>
  )
}

export default AppLoader