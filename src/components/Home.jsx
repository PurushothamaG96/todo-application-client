import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Todo from './Todo';
function Home(props) {
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem("token"))
    useEffect(()=>{
        isTokenPresent()
    })
    function isTokenPresent(){
        if(!token) navigate("/")
    }
    return (
        <div>
            <Header/>
            <Todo/>
        </div>
    );
}

export default Home;