import React, {useEffect, useState} from 'react';
import Header from './Header';
import { useLocation, useNavigate } from 'react-router-dom';
import "./addtodo.css"
function UpdateTod(props) {
    const location = useLocation()
    const [rem, setRem] = useState({item:"",priority_level:"Low", due_date:"", starred:false, isCompleted:false})
    const navigate = useNavigate()
    const token  = JSON.parse(localStorage.getItem("token"))
    useEffect(()=>{
        isTokenPresent()
        setRem({item:location.state.item,priority_level:location.state.priority_level, due_date:location.state.due_date.split("T")[0], starred:location.state.starred, isCompleted:location.state.isCompleted})
        
    }, []) 
    

    function isTokenPresent(){
        if(!token) navigate("/")
    }
    

    const handleForm = async(e)=>{
        e.preventDefault()
        const {item, priority_level, due_date} = rem
        if(item && priority_level && due_date){
            fetch(`https://purushothama-todo-server.onrender.com/app/v1/todoposts/updates/${location.state._id}`, {
                method:"put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization":JSON.parse(localStorage.getItem("token"))
                    },
                body:JSON.stringify(rem)
            })
            .then((response)=>response.json())
            .then((res)=>{
                setRem({item:"",priority_level:"Low", due_date:"", starred:false})
                navigate("/home")
            }).catch(e=>{
                console.log({"err":e})
            })
        }
    }

    const handleCancel = (e)=>{
        e.preventDefault()
        setRem({item:"",priority_level:"Low", due_date:"", starred:false})
        navigate("/home")
    }
    return (
        <>
            <Header/>
            <div className='container add-todo'>
                <form onSubmit={handleForm} className="addtodo-container">
                    <div className='fields-container'>
                        <h1 className='text-warning'>Update Todo</h1>
                    </div>
                    <div className='fields-container'>
                        <label htmlFor="item">Enter Reminder</label>
                        <input type="text" id='item' onChange={(e)=>setRem({...rem, item:e.target.value})} value={rem.item} required />
                    </div>
                    <div className='fields-container'>
                        <label htmlFor="item">Enter Description</label>
                        <select onChange={(e)=>setRem({...rem, priority_level:e.target.value})} value={rem.priority_level}>
                            <option value ="Low">Low</option>
                            <option value ="Medium">Medium</option>
                            <option value ="High">High</option>
                        </select>
                    </div>
                    <div className='fields-container'>
                        <label htmlFor="due">Enter Date</label>
                        <input type="date" id='date' onChange={(e)=>setRem({...rem, due_date:e.target.value})} value={rem.due_date} required/>
                    </div>
                    <div className='check-box-container'>
                        <input type="checkbox"  onClick={(e)=>setRem({...rem, starred:e.target.value})}/>
                        <label htmlFor="stared">Is important<i className='fa fa-star'></i></label>
                    </div>
                    <div className='check-box-container'>
                        <select onChange={(e)=>setRem({...rem, isCompleted:e.target.value})}>
                            <option value="false">Pending</option>
                            <option value="true">Completed</option>
                        </select>
                        <label htmlFor="isCompleted">Status<i className='fa fa-star'></i></label>
                    </div>
                    
                    <div className='btn-container'>
                        <button className='btn btn-primary me-2'>upadete ToDo</button>
                        <button className='btn btn-warning text-white' onClick={handleCancel} >Cancel</button>
                    </div>
                </form> 
            </div>
        </>
        
    );
}

export default UpdateTod;