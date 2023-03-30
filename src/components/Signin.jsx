import React, { useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import "./sign.css"
const Signin=()=> {
    const navigate = useNavigate()
    const [data, setData] = useState({ email: "", password: "" })
    const [valid, setValid] = useState(false)
    const [message, setMessage] = useState({status:"", message:""})
    const handleSubmit = (e) => {
        e.preventDefault(e)
        if(data.password.length>5){
            axios.post("http://localhost:5000/app/v1/login", data)
            .then(result => {
                localStorage.setItem('token',JSON.stringify(result.data.message.token))
                localStorage.setItem('userdetails',JSON.stringify(result.data.message.userdetails))
                setData({email:"", password:""})
                navigate('/home')
            }).catch((e) => {
                setMessage(e?.response?.data)
                setValid(true)
            })
            
        }
        else{
            setMessage({status:"Note!",message:"Password length should be minimum 6 charecters and above "})
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
                                <input type='email' className='form-control' placeholder="User Id" value={data.email} onChange={(e)=>{setData({...data, email:e.target.value})}} required/>
                            </div>
                            <div className='form-fields'>
                            <input type='password' className='form-control' placeholder="Password" value={data.password} onChange={(e)=>{setData({...data, password:e.target.value})}} required/>
                            </div>
                            <div className='form-fields'>
                                <button className='form-control btn btn-primary'>Sign In</button>
                            </div>
                        </form>
                        <div className='form-fields'>
                            <Link to={'/signup'} className="text-decoration-none"> <button className='form-control nav-btn'>Sign Up</button></Link>
                        </div>
                        </div>
                    </div>
                    <Validation trigger={valid}>
                    <div className='card-message'>
                    <h3 className='text-danger'>{message.status}</h3>
                    <p className='text-danger'>{message.message}</p>
                    <button className='btn btn-primary' onClick={()=>setValid(false)}>ok</button> 
                </div>
                </Validation>
                </div>
                
            
        </>
    );
}

export default Signin;
const Validation=(props)=>{
    return(props.trigger)?(
        <div className='popupCard'>
            {props.children}
        </div>
    ):""
}