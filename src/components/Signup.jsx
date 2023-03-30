import React, { useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import "./sign.css"
const Signup=()=> {
    const navigate = useNavigate()
  const [data, setData] = useState({email:"",password:""}) 
  const [confirmPassword, setConfirmPassword] = useState("")
  const [valid, setValid] = useState(false)
  const [message, setMessage] = useState({status:"", message:""})

  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(confirmPassword=== data.password){
        if(data.password.length < 6){
            setMessage({status:"Note!",message:"Password length should be minimum 6 charecters and above "})
            setValid(true)
        }
        else{
            axios.post("http://localhost:5000/app/v1/register", data)
            .then(result=>{
                setData({email:"", password:""})
                setConfirmPassword("")
               navigate('/')
            }).catch((e)=>{
                setMessage(e?.response?.data)
                setValid(true)
            }) 
        }
       
    }
    else{
        setMessage({status:"Note!",message:"Password and Confirm Password doesn't matched"})
        setValid(true)
    }
}
    return (
        <>
           
                <div className='main-card'>
                    <div className='form-container'>
                        <div className='inner-container'>
                        <h1 className=''>Logo</h1>
                        <h5 className=''>Create Acoount</h5>
                        <form onSubmit={handleSubmit}>
                            <div className='form-fields'>
                                <input type='email' className='form-control' placeholder="User Id" value={data.email} onChange={(e)=>{setData({...data, email:e.target.value})}}/>
                            </div>
                            <div className='form-fields'>
                            <input type='password' className='form-control' placeholder="Password" value={data.password} onChange={(e)=>{setData({...data, password:e.target.value})}}/>
                            </div>
                            <div className='form-fields'>
                            <input type='password' className='form-control' placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                            </div>
                            <div className='form-fields'>
                                <button className='form-control btn btn-primary'>Sign Up</button>
                            </div>
                        </form>
                        <div className='form-fields'>
                            <Link className='text-decoration-none' to={'/'}> <button className='form-control nav-btn'>Sign In</button></Link>
                        </div>
                        </div>
                    </div>
                    <Validation trigger={valid}>
                <div className='card-message'>
                    <h3>{message.status}</h3>
                    <p>{message.message}</p>
                    <button onClick={()=>setValid(false)}>ok</button> 
                </div>
            </Validation>
                </div>
                
        </>
    );
}

export default Signup;
const Validation=(props)=>{
    return(props.trigger)?(
        <div className='popupCard'>
            {props.children}
        </div>
    ):""
}