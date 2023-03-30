import React from "react"
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import AddTodo from "./components/AddTodo";
import UpdateTod from "./components/UpdateTod";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Signin/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/addtodo" element={<AddTodo/>}/>
        <Route path="/updatetodo" element={<UpdateTod/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
