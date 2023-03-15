import axios from 'axios';
import React from 'react';
import { createRoot } from 'react-dom/client';
const {useState, useEffect} = React;

const App = () => {
    const [item, setItem] = useState([]);
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    useEffect(()=>{
        const fetchItem = async() =>{
            const response = await axios.get('/api/testing');
            setItem(response.data);
        }
        fetchItem();
    },[]);


    const create = async(ev) => {
        try{
            ev.preventDefault();
            const newItem = {name};
            const response = await axios.post('/api/testing', newItem);
            setItem(...item, response.data);
            setName('');
            setError('');
        }
        catch(er){
            setError(er.response.error.errors[0].message);
        }
    }

    return (
        <div>
            <h1>Test</h1>
            <ul>
                {
                    item.map(i => {
                        return (
                            <li key={i.id}>
                                {i.name}
                            </li>
                        );
                    })
                }
            </ul>
            <form onSubmit = { create }>
                <input value = {name} onChange={ ev => setName(ev.target.value) } />
                <button disabled={!name}>Submit</button>
                {error}
            </form>
        </div>
    )
}

const root = createRoot(document.querySelector('#app'));
root.render(<App />);