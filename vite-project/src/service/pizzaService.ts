import axios from 'axios';
 const PizzaURL = "http://localhost:8000/pizza"

export async function  getPizza (){
    try{
        const response = await axios.get(PizzaURL);
        console.log(response.data)
        return response.data
        
    }   
    
    catch(error){
        alert('Не удалось получить данные!')
    }
}
