import React, { useEffect,  useState } from 'react'
import styles from '../components/Catalog.module.scss'
import {IPizzaData} from '../components/interface/pizzaInterface'
import teleImg from '../assets/Remove-bg.ai_1714479051020.png'
import { CiSearch } from "react-icons/ci";
import PizzaCard from './PizzaCard'
import axios from 'axios'
import { addCatalog } from './slices/pizzaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';

const URL = 'http://localhost:4000/pizza'

const Catalog:React.FC = () => {
  const dispatch = useDispatch(     )
  const [searchQuery,setSearchQuery] = useState<string>('') 
  const { catalog } = useSelector((state:RootState) => state.counter)
  const [foundItems,setFoundItems] = useState<IPizzaData[]>([])
  const [loading,setLoading] = useState(false)
   
  useEffect(() => {
    try {
      setLoading(true)
      axios.get(URL).then(res => { 
        dispatch(addCatalog(res.data))
        setLoading(false)
      })  

    } catch (error) {
      console.log('Ошибка получения данных',error)
    }
  },[]) 
  
  useEffect(()=>{
    setFoundItems(catalog.filter(i => {
      return i.title.toLowerCase().includes(searchQuery.toLowerCase())
    }))
  },[searchQuery])
     
  return ( 
   <>
      <div className={styles.search_items}>
          <CiSearch style={{fontSize:'34px',color:'brown',marginRight:'345px'}} />
          <input 
          onChange={(event) => setSearchQuery(event.target.value)}
          value={searchQuery} 
          className={styles.catalog_search} 
          type="text" 
          placeholder='Введите название продукта...' />
      </div>
      <h1 className={styles.catalog_header}>Пицца</h1>
      { loading ? <span className={styles.catalog_loading}>ИДЕТ ЗАГРУЗКА...</span> : <div className={styles.catalog}>
        {(!foundItems.length ? catalog : foundItems).map(el => {
          return  (<PizzaCard 
            key={el.id}
            title={el.title}
            img={el.img}
            price={el.price}
            structure={el.structure}
            description={el.description} id={el.id} />)
        })}
        <a href="tel:89538368403"><img className={styles.teleImg} src={teleImg} alt="telephone" /></a>
      </div>}
   </>
  )
}

export default Catalog
