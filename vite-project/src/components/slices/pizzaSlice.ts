import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IPizzaCartItem, IPizzaData } from '../interface/pizzaInterface'

export type PizzaCart = Omit<IPizzaData, 'description'>;

export interface IState {
  count:number,
  amount:number,
  items:IPizzaCartItem[],
  catalog:IPizzaData[]
}

const initialState:IState = {
    items:[],
   count:0,
   amount:0,
   catalog:[]
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
        counter(state) {
            state.count +=1        
        },
        addAmount(state,action:PayloadAction<number>){;
           state.amount+=action.payload;
        },
        addItem(state,action:PayloadAction<IPizzaCartItem[]>){
            state.items = action.payload;
        },
        clearData(state){
            state.amount = 0;
            state.count = 0;
        },
        updateDataAmount(state,action:PayloadAction<number>){
            state.amount = action.payload
           
        },
        updateDataCount(state,action:PayloadAction<number>){
            state.count = action.payload
           
        },
        addCatalog(state,action:PayloadAction<IPizzaData[]>){
            state.catalog = action.payload
        }
    }
})

export const { counter,addAmount,addItem,clearData,updateDataAmount,updateDataCount,addCatalog } = counterSlice.actions
export default counterSlice.reducer