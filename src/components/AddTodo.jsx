import React, {useState} from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import "./addtodo.css"
function AddTodo(props) {
    const [rem, setRem] = useState({item:"",priority_level:"Low", due_date:"", starred:false})
    const navigate = useNavigate()
    const handleForm = async(e)=>{
        e.preventDefault()
        const {item, priority_level, due_date} = rem
        if(item && priority_level && due_date){
            fetch("http://localhost:5000/app/v1/todoposts", {
                method:"post",
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
                        <h1 className='text-warning'>Add Todo</h1>
                    </div>
                    <div className='fields-container'>
                        <label htmlFor="item">Enter Reminder</label>
                        <input type="text" id='item' onChange={(e)=>setRem({...rem, item:e.target.value})} required />
                    </div>
                    <div className='fields-container'>
                        <label htmlFor="item">Enter Description</label>
                        <select onChange={(e)=>setRem({...rem, priority_level:e.target.value})}>
                            <option value ="Low">Low</option>
                            <option value ="Medium">Medium</option>
                            <option value ="High">High</option>
                        </select>
                    </div>
                    <div className='fields-container'>
                        <label htmlFor="due">Enter Date</label>
                        <input type="date" id='date' onChange={(e)=>setRem({...rem, due_date:e.target.value})} required/>
                    </div>
                    <div className='check-box-container'>
                        <input type="checkbox"  onClick={(e)=>setRem({...rem, starred:e.target.value})}/>
                        <label htmlFor="stared">Is important<i className='fa fa-star'></i></label>
                    </div>
                    <div className='btn-container'>
                        <button className='btn btn-primary me-2'>Add reminder</button>
                        <button className='btn btn-warning text-white' onClick={handleCancel} >Cancel</button>
                    </div>
                </form>
                
            </div>
        </>
        
    );
}

export default AddTodo;