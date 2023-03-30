import React, { useEffect } from 'react';
import axios from "axios"
import {useSelector, useDispatch} from "react-redux"
import { get_todo_data } from '../Redux/Todo/todoAction';
import "./todo.css"
function Todo(props) {
    //redux
    const todoselector = useSelector((state)=>state)
    const dispacth=useDispatch()
    let month = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"]

    //useeffect
    useEffect(()=>{
        handleDataUpdate()
    }, [])
    function handleDataUpdate(){
        axios("http://localhost:5000/app/v1/todoposts", {
            headers:{
                "Authorization":JSON.parse(localStorage.getItem("token"))
            }
        })
        .then(res=>{
            dispacth(get_todo_data(res.data))
        }).catch(e=>{
            console.log(e)
        })
    }
    const handleStarred = (e)=>{
        let val;
        
        if(todoselector[e.target.id].starred==="on") val = "false"
        else val = "on"

        fetch(`http://localhost:5000/app/v1/todoposts/${todoselector[e.target.id]._id}`, {
            method:"put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":JSON.parse(localStorage.getItem("token"))
                },
            body:JSON.stringify({starred:val})
        })
        .then((response)=>response.json())
        .then((res)=>{
            handleDataUpdate()
        }).catch(e=>{
            console.log({"err":e})
        })
    }
    return (
        <div className='container'>
            <div className='todo-container'>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Todo Items
                            </th>
                            <th>
                                Priority Level
                            </th>
                            <th>
                                Created Date
                            </th>
                            <th>
                                Due Date
                            </th>
                            <th>
                                Starred
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                {todoselector.map((val, i)=>{
                    let t = val.createdAt.split("T")
                    let m = parseInt(t[0].split("-")[1])
                    
                    return(
                        <tr>
                            <td>{val.item}</td>
                            <td>{val.priority_level}</td>
                            <td>{t[0]}</td>
                            <td>{val.due_date}</td>
                            <td >{(val.starred==="on")?<i id={i} onClick={handleStarred} className='fa fa-star text-primary star-icon'></i>:<i id={i} onClick={handleStarred} className='fa fa-star text-inform star-icon'></i>}</td>
                        </tr>
                    )
                })}
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default Todo;