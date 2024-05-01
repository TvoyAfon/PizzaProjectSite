
export interface IPizzaData  {
    
    id:number,
    title:string,
    img:string,
    description:string,
    price:number,
    structure:string,
}

export interface IPizzaCartItem {
    data: Omit<IPizzaData, 'description'|'structure'>;
    count: number;
}