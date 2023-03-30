import React, { useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
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
            <div className='container'>
                <div className='main-card d-flex justify-content-center'>
                    <div className='form-container col-12 p-2 '>
                        <div className='inner-container m-2 my-5'>
                        <h1 className='m-2'>Logo</h1>
                        <h5 className='m-2'>Create Acoount</h5>
                        <form onSubmit={handleSubmit}>
                            <div className='col-xl-12'>
                                <input type='email' className='form-control m-2' placeholder="User Id" value={data.email} onChange={(e)=>{setData({...data, email:e.target.value})}} required/>
                            </div>
                            <div className='col-xl-12'>
                            <input type='password' className='form-control m-2' placeholder="Password" value={data.password} onChange={(e)=>{setData({...data, password:e.target.value})}} required/>
                            </div>
                            <div className='col-xl-12'>
                                <button className='form-control m-2 btn btn-primary'>Sign In</button>
                            </div>
                        </form>
                        <div className='col-xl-12'>
                            <Link to={'/signup'} className="text-decoration-none"> <button className='form-control  m-2'>Sign Up</button></Link>
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

export default Signin;
const Validation=(props)=>{
    return(props.trigger)?(
        <div className='popupCard'>
            {props.children}
        </div>
    ):""
}