import { useState } from 'react';
import './App.css';


function App() {
    const [name, setName] = useState('');
    const [datetime,setDatetime] =useState('');
    const [description,setDescription] =useState('')
    function addNewTransaction(ev){
        ev.preventDefault();
        const url=process.env.REACT_APP_API_URL+'/api/transaction';
        console.log(url);
        // console.log("API URL:", process.env.REACT_APP_API_URL);
        fetch(url, {  // ✅ Fixed spacing and brackets
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, datetime })
        })
        .then(response => response.json())
        .then(json => console.log("Result:", json))
        .catch(error => console.error("Fetch error:", error));
        
        

    }

  return (
    <main>
        <h1>$400<span>.00</span></h1>
        <form onSubmit={addNewTransaction}>
           <div className='basic'>
            <input type="text" 
                    value ={name}
                    onChange={ev => setName(ev.target.value)}
                    placeholder='+200 for nirmala akka shop'/>
           <input 
                value={datetime} 
                onChange={ev=>setDatetime(ev.target.value)}
            type="datetime-local"/>
           </div>
           <div className='description'>
           <input type='text' 
           value={description} 
           onChange={ev=> setDescription(ev.target.value)}
           placeholder='description'/>
           </div>
            <button type='submit'>Add new transaction</button>
        </form>


        <div className='transactions'> 
            <div className='transaction'>
                <div className='left'>
                    <div className='name'>New samsung TV</div>
                    <div className='description'>to buy new tv</div>
                </div>
                <div className='right'>
                    <div className='price red'>-$500</div>
                    <div className='datetime'>2022-12-18 15:45</div>
                </div>
            </div>
            <div className='transaction'>
                <div className='left'>
                    <div className='name'>new website</div>
                    <div className='description'>time for me to work</div>
                </div>
                <div className='right'>
                    <div className='price green'>+$500</div>
                    <div className='datetime'>2022-12-18 15:45</div>
                </div>
            </div>
            <div className='transaction'>
                <div className='left'>
                    <div className='name'>iphone</div>
                    <div className='description'>i was to to buy iphone</div>
                </div>
                <div className='right'>
                    <div className='price red'>-$500</div>
                    <div className='datetime'>2022-12-18 15:45</div>
                </div>
            </div>
        </div>
    </main>
  );
}

export default App;
