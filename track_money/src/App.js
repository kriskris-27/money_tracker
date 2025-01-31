import './App.css';

function App() {
  return (
    <main>
        <h1>$400<span>.00</span></h1>
        <form>
           <div className='basic'>
            <input type="text" placeholder='+200 for nirmala akka shop'/>
           <input type="datetime-local"/>
           </div>
           <div>
           <input type='text'/>
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
