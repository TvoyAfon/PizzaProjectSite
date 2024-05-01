import React, {  MouseEvent, useState } from 'react'
import logo from '../assets/logoIcon.png'
import styles from './Header.module.scss'
import { FaShoppingCart } from "react-icons/fa";
import {Link} from "react-router-dom";
import {Routes} from '../components/routes/routes'
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import WindowWrite from './WindowWrite';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useRef } from 'react';


const Header:React.FC = () => {
  const {count,amount} = useSelector((state:RootState) => state.counter)
  const [modalShow,setModalShow] = useState<boolean>(false)
  const [modalCall,setModalCall] = useState<boolean>(false)
  const textInput = useRef<HTMLInputElement>(null)

  const openModal = () =>{
    setModalShow(true)
  }
  const openModalCall = () =>{
    setModalCall(true)
  }
 
  const sendTelephone = (event:MouseEvent) =>{
     event.preventDefault()
     if (textInput.current!.value.length > 9 ){
       console.log('Перезвонить сюда: ',textInput.current!.value)
       alert('Звонок был успешно заказан')
       textInput.current!.value = ''
       setModalCall(false)
     }
     else {
        alert('Ошибка: Введите ваш номер телефона в формате +7xxxxxxx')
        textInput.current!.value = ''
     }
  }
  return (
    <div className={styles.container}>
        <div className={styles.info}>
            <div style={{display:'flex',flexDirection:'column'}}>
              <Link to={Routes.main}>
              <img src={logo} className={styles.logo} alt="icon" />
              </Link>
              <span style={{fontSize:'30px'}}>The OrenPizza
              </span>
            </div>
            <div className={styles.number}>
              <span style={{color:"orange"}}>Звоните по номеру</span>
              <span>(3532) 31-41-64</span>
              <span>(3532) 21-48-84</span>
              <span onClick={openModalCall} style={{textDecoration:'underline',cursor:'pointer'}}>Перезвоните мне</span>
              { modalCall && 
              <form>
                <div className={styles.modalCall}> 
                  <span onClick={() => setModalCall(false)}><IoMdCloseCircleOutline className={styles.modalClose_icon}/></span>
                  <h3>Закажите звонок</h3>
                  <input type="number" ref={textInput} placeholder='...telephone...'/>
                  <button onClick={sendTelephone} className={styles.modalCall_button}>Заказать звонок</button>
                </div>
              </form>}
            </div>
          <div className={styles.time}>
            <span style={{color:"red"}}>Прием заказов</span>
            <span> <span style={{fontWeight:'bold'}}>Вс-Чт</span>: с 10.00 до 23.45</span>
            <span><span style={{fontWeight:'bold'}}>Пт-Сб</span>: с 10.00 до 00.00</span>
          </div>
          <div className={styles.cart}>
            <span> <FaShoppingCart size={'28px'}/> </span>
            <span>Корзина - {count}</span>
            <span>Сумма - {amount}  ₽ </span>
            <Link to={Routes.cart} className={styles.button_cart}>Перейти в корзину</Link>
            </div>
        </div>
      <ul className={styles.navbar}>
        <Link className={styles.link} to={Routes.main}>Главная</Link>
        <Link className={styles.link}  to={Routes.catalog}>Каталог товаров</Link>
        <Link className={styles.link}  to={Routes.feedback}>Отзывы</Link>
        <Link className={styles.link}  to={Routes.about}> О нас</Link>
        <div onClick={openModal} className={styles.modal} >Написать директору</div>
      </ul>
      { modalShow && <WindowWrite setmodalShow={setModalShow} />}
    </div>
  )
}
export default Header
