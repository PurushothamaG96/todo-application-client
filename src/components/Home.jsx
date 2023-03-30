import React from 'react';
import Header from './Header';
import Todo from './Todo';
function Home(props) {
    return (
        <div>
            <Header/>
            <Todo/>
        </div>
    );
}

export default Home;