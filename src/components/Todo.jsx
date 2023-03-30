import React, { useEffect, useState } from 'react';
import axios from "axios"
import {useSelector, useDispatch} from "react-redux"
import { get_todo_data } from '../Redux/Todo/todoAction';
import { Link } from 'react-router-dom';
import "./todo.css"
function Todo(props) {
    const [dueDates, setDueDate] = useState("All")
    const [statusCompleted, setStatus] = useState("All")
    const [nearDate, setNearDate] = useState(1)
    //redux
    const todoselector = useSelector((state)=>state)
    const dispacth=useDispatch()
    

    //useeffect
    useEffect(()=>{
        handleDataUpdate()
    }, [dueDates, statusCompleted, nearDate])

    function handleDataUpdate(){
        const url = `https://purushothama-todo-server.onrender.com/app/v1/todoposts?dueDate=${dueDates}&iscompleted=${statusCompleted}&nearDate=${nearDate}`
        axios(url, {
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

        fetch(`https://purushothama-todo-server.onrender.com/app/v1/todoposts/${todoselector[e.target.id]._id}`, {
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
            console.log(todoselector)
        }).catch(e=>{
            console.log({"err":e})
        })
    }
    return (
        <div className='todo-main'>
            <div className='todo-container'>
                <div className='filter-container'>
                    <label htmlFor="dueDate">Filter By Due Date :</label>
                    <select id='dueDate' onChange={(e)=>setDueDate(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Today">Today</option>
                        <option value="Upcomings">Up Comings due</option>
                        <option value="Expired">Expired Due Date</option>
                    </select>
                    <label htmlFor="status">Filter By status :</label>
                    <select id="status" onChange={(e)=>setStatus(e.target.value)}>
                        <option value="All">All</option>
                        <option value="false">Pending</option>
                        <option value="true">Completed</option>
                    </select>
                    <label htmlFor="near">Sort By Dates :</label>
                    <select id='near' onChange={(e)=>setNearDate(e.target.value)}>
                        <option value="1">From Nearest Dates to Last Date</option>
                        <option value="-1">From Last Dates to Nearest Dates</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Created Date
                            </th>
                            <th>
                                Updated date
                            </th>
                            <th>
                                Todo Items
                            </th>
                            <th>
                                Priority Level
                            </th>
                            
                            <th>
                                Due Dates
                            </th>
                            <th>
                                Starred
                            </th>
                            <th>
                                Update
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                {todoselector.map((val, i)=>{
                    let creat = val.createdAt.split("T")
                    let update = val.updatedAt.split("T")
                    let due = val.due_date.split("T")
                    return(
                        <tr>
                            <td>{creat[0]}</td>
                            <td>{update[0]}</td>
                            <td>{val.item}</td>
                            <td>{val.priority_level}</td>
                            <td>{due[0]}</td>
                            <td>{(val.starred==="on")?<i id={i} onClick={handleStarred} className='fa fa-star text-primary star-icon'></i>:<i id={i} onClick={handleStarred} className='fa fa-star text-inform star-icon'></i>}</td>
                            <td><Link className="text-decoration-none btn btn-primary" to="/updatetodo" state={val}>Update</Link></td>
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