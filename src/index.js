import axios from 'axios';
import React from 'react';
import { createRoot } from 'react-dom/client';
const {useState, useEffect} = React;

const App = () => {
    const [name, setName] = useState([]);

    useEffect(()=>{
        const fetchName = async() =>{
            const response = await axios.get('/api/testing');
            setName(response.data);
        }
        fetchName();
    },[]);

    return (
        <div>
            <h1>Test</h1>
        </div>
    )
}

const root = createRoot(document.querySelector('#app'));
root.render(<App />);