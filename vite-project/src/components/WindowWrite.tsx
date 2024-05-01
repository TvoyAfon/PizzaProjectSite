import React from 'react'
import styles from './WindowWrite.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'


interface IWindowWriteProps{
  setmodalShow:Function
}

interface MyForm{
  name:string,
  surname:string,
  telephone:number,
  description:string
}

const WindowWrite:React.FC<IWindowWriteProps> = ({setmodalShow}) => {
 const {register,handleSubmit} = useForm<MyForm>({
  defaultValues :{}
 })

 const submit:SubmitHandler<MyForm> = data =>{
   console.log(data);
   alert('Заявка успешно отправлена')
 }

  return (
    <div className={styles.modal_container}>
        <span onClick={()=>setmodalShow(false)} className={styles.modal_close}>X</span>
        <h1 className={styles.modal_header}>Сообщите о проблеме</h1>
        <form >
          <div className={styles.modal_name}>Введите ваше имя
            <input type="text" placeholder='' {...register('name')}/>
          </div>
          <div className={styles.modal_surname}>Введите вашу фамилию
            <input type="text" placeholder='' {...register('surname')}/>
          </div>
          <div className={styles.modal_number}>Введите ваш номер телефона
            <input type="number" placeholder='' {...register('telephone')}/>
          </div>
          <div className={styles.modal_description}>Опишите проблему
            <input type="text" placeholder='' {...register('description')}/>
          </div>
          <button type='submit' onClick={handleSubmit(submit)} className={styles.modal_button}>Отправить заявку</button>
       </form>
    </div>
  )
}

export default WindowWrite
