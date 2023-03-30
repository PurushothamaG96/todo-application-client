import {createStore} from "redux"
import todoReducer from "./Todo/todoReducer"

const store = createStore(todoReducer)

export default store