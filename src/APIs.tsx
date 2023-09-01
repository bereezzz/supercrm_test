import axios from 'axios';

// Получение списка Зон
export interface CardInterface {
    userId: number,
    id: number,
    title: string,
    completed: boolean
  }
  
  export async function GetCard(page:number, limit:number) {
    const { data } = await axios.get<CardInterface[]>(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`);
    return data;
  }