import React, { useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

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
            <div className='main-container'>
                <div className='main-card d-flex justify-content-center'>
                    <div className='form-container col-xl-6 p-2 '>
                        <div className='inner-container m-2 my-5'>
                        <h1 className='m-2'>Logo</h1>
                        <h5 className='m-2'>Create Acoount</h5>
                        <form onSubmit={handleSubmit}>
                            <div className='col-xl-12'>
                                <input type='email' className='form-control m-2' placeholder="User Id" value={data.email} onChange={(e)=>{setData({...data, email:e.target.value})}}/>
                            </div>
                            <div className='col-xl-12'>
                            <input type='password' className='form-control m-2' placeholder="Password" value={data.password} onChange={(e)=>{setData({...data, password:e.target.value})}}/>
                            </div>
                            <div className='col-xl-12'>
                            <input type='password' className='form-control m-2' placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                            </div>
                            <div className='col-xl-12'>
                                <button className='form-control m-2'>Sign Up</button>
                            </div>
                        </form>
                        <div className='col-xl-12'>
                            <Link to={'/'}> <button className='form-control m-2'>Sign In</button></Link>
                        </div>
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