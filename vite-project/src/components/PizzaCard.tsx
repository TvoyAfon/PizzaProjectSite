import React, { useState } from 'react'
import { IPizzaData } from './interface/pizzaInterface'
import styles from '../components/PizzaCard.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { addAmount, addItem, counter } from './slices/pizzaSlice';
import { RootState } from './store/store';

interface IPizzaProps extends IPizzaData{}

const PizzaCard:React.FC<IPizzaProps> = ({id, img,title,description,price,structure}) => {
   const [hideBut,setHideBut] = useState<boolean>(false)
   const [des,setDes] = useState(false);
   const [changeDes,setChangeDes] = useState<boolean> (false)
   
   const items = useSelector((state: RootState) => state.counter.items);
   const dispatch = useDispatch()
   const addCart = () =>{
         dispatch(counter())
         dispatch(addAmount(Number(price)));
        const isItemExists = Boolean(items.find(i => i.data.id === id));
        
      if (!isItemExists) {
        dispatch(addItem([{
          data: {
            id,title,img,price,
          },
          count: 1
      }, ...items]));
      }
      else {
        const result = items.map(item => {
          const itemCopy = {...item};

          if (itemCopy.data.id === id) {
            itemCopy.count += 1;
          }
          return itemCopy;
        })
        dispatch(addItem(
          result
        ))
      }
    }

   const clickDes = () => {
      setDes(!des)
      setHideBut(!hideBut)
      setChangeDes(!changeDes)
   }

  return (
    <div  className={styles.pizzaList}>
        <span className={styles.title}>{title}</span>
        {!changeDes ? <button  onClick={clickDes} className={styles.showDes}>Показать описание</button>:
          <button  onClick={clickDes} className={styles.showDes}>Скрыть описание</button>                                                                                            }
        <img className={styles.img} src={img} alt="img" />
       { hideBut ? null: <div>{structure}</div>}
        { des && <div className={styles.description}>{description}</div>}  
        <span className={styles.price}><p>{price}₽</p></span>  
        { hideBut ? null : <button onClick={addCart} className={styles.cartButton}>Добавить в корзину</button>}   
    </div>
  )
}

export default PizzaCard
