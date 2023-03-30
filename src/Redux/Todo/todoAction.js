import { GET_TODO_DATA } from "./types";


 export const get_todo_data = (data)=>{
    return {
        type:GET_TODO_DATA,
        payload:data
    }
}