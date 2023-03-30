import { GET_TODO_DATA } from "./types"
const initialState = []

const todoReducer = (state=initialState, action)=>{
    switch(action.type){
        case GET_TODO_DATA: return action.payload
        default : return state
    }
}
export default todoReducer