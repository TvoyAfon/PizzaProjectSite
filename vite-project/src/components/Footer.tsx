import React from 'react'
import styles from './Footer.module.scss'

const Footer:React.FC = () => {
  return (
    <div className={styles.footer_container}>
      <span>Все права защищены.</span>
      <span>Сайт был создан в 2024г.</span>
      <span>Политика конфиденциальности</span>
      <span style={{fontSize:'20px'}}>by TvoyAfon <a  href="https://github.com/TvoyAfon">https://github.com/TvoyAfon</a></span>
    </div>
  )
}

export default Footer
