import React from 'react';
import { Link } from 'react-router-dom';
import "./Headers.css"
function Header(props) {
    return (
        <>
            <nav>
                <div className='container nav-container'>
                    <div>
                        <h1 className='text-danger'>TO<span className='text-warning'>DO</span></h1>
                    </div>
                    <div>
                        <ul>
                            <li><Link to={"/home"} className="text-decoration-none text-white">Home</Link></li>
                            <li> <Link to={"/addtodo"} className="text-decoration-none text-white">Add ToDo</Link></li>
                            <li onClick={() => {
                                localStorage.removeItem("token")
                            }}> <Link to={"/"} className="text-decoration-none text-white">Log Out</Link></li>
                        </ul>

                    </div>
                    
                </div>
                


            </nav>
        </>
    );
}

export default Header;