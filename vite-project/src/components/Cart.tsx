import React from 'react'
import styles from '../components/Cart.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import { AiTwotoneDelete } from "react-icons/ai";
import { BsCartX } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { addItem ,clearData,updateDataAmount,updateDataCount} from './slices/pizzaSlice';
import { useState } from 'react';

const Cart:React.FC = () => {
    const dispatch = useDispatch()
    const [clearBut,setClearBut] = useState<boolean>(false)
    const {items,amount,count} = useSelector((state:RootState) => state.counter)
     console.log(amount)
    const deleteCartItems = () =>{
       dispatch(addItem([]))
       dispatch(clearData())
       setClearBut(true)
       
    }
    const deleteItem = (id:number) =>{
      
      const item = items.find(i => i.data.id === id)
      if (!item) return

      dispatch(updateDataAmount(amount-item.data.price))
      dispatch(updateDataCount(count - 1))
      if (item.count>1){
        dispatch(addItem(items.map(i => {
          const cpy = {...i};

          if(cpy.data.id===item.data.id){
            cpy.count-=1
            
          }
          return cpy
        })))
      }
       else dispatch(addItem(items.filter(i =>{
        return i.data.id !==item.data.id
       })))
    } 

  return (
    <div className={styles.cart_container}>
        <h1 className={styles.cart_header}>Корзина</h1>
        { clearBut ?  null: amount!== 0 &&  <button onClick={deleteCartItems} className={styles.cart_buttonClear}>Очистить корзину</button>}
        {items.map(item => {
           return (<div className={styles.cart_item}>
                <span className={styles.cart_title}>
                    {item.data.title}
                </span>
                <img src={item.data.img} alt="img" className={styles.cart_img}/>
                <div className={styles.cart_price}>
                    {item.data.price}₽
                </div>
                <div className={styles.cart_count}>{item.count}</div>
                <AiTwotoneDelete  onClick={()=>deleteItem(item.data.id)} style={{fontSize:'30px',cursor:'pointer'}}/>
           </div>)
        })}
      {  amount==0 ? 
      <div className={styles.cart_empty}>Вероятнее всего,вы ничего не положили в корзину😟 
      <Link to='/catalog' style={{padding:'6px'}}>Вернитесь</Link> в каталог пицц и попробуйте снова.
      <BsCartX  style={{fontSize:'36px'}}/>
      </div>
     : 
     <div style={{paddingBottom:'15px'}}>
       { clearBut ? null : <>
        <button className={styles.cart_button_confirm}>Оформить заказ</button>
        <span className={styles.cart_totalPrice}>Сумма: {amount}₽</span>
        </>}
      </div>
      }
    </div>
  )
}

export default Cart
