import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [name, setName] = useState('');
    const [datetime, setDatetime] = useState('');
    const [description, setDescription] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0); // ✅ Store balance

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const data = await getTransaction();
                setTransactions(data);
                calculateBalance(data); // ✅ Update balance after fetching transactions
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        }

        fetchTransactions();
    }, []); // ✅ Runs once on mount

    async function getTransaction() {
        const url = process.env.REACT_APP_API_URL + "/api/transaction";
        const response = await fetch(url);
        return response.json();
    }

    function addNewTransaction(ev) {
        ev.preventDefault();
        const url = process.env.REACT_APP_API_URL + "/api/transaction";
        console.log(url);

        // ✅ Extract and parse price correctly
        const priceMatch = name.match(/^([+-]?\d+(\.\d{1,2})?)/); // Supports decimal values
        const price = priceMatch ? parseFloat(priceMatch[0]) : 0; 

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                price,
                name: name.substring(price.length + 1).trim(), // ✅ Remove price from name
                description,
                datetime,
            }),
        })
        .then(response => response.json())
        .then(json => {
            const updatedTransactions = [...transactions, json]; 
            setTransactions(updatedTransactions);
            calculateBalance(updatedTransactions); // ✅ Update balance after adding transaction

            setName('');
            setDatetime('');
            setDescription('');
        })
        .catch(error => console.error("Fetch error:", error));
    }

    // ✅ Update balance when transactions change
    function calculateBalance(transactionsList) {
        const total = transactionsList.reduce((sum, transaction) => sum + parseFloat(transaction.price), 0);
        setBalance(total);
    }

    // ✅ Format balance with two decimal places
    const formattedBalance = balance.toFixed(2);
    const [whole, fraction] = formattedBalance.split('.');

    return (
        <main>
            <h1>${whole}<span>.{fraction}</span></h1> {/* ✅ Correct balance display */}
            <form onSubmit={addNewTransaction}>
                <div className='basic'>
                    <input 
                        type="text" 
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        placeholder='+200.50 for shopping'
                    />
                    <input 
                        value={datetime} 
                        onChange={ev => setDatetime(ev.target.value)}
                        type="datetime-local"
                    />
                </div>
                <div className='description'>
                    <input 
                        type='text' 
                        value={description} 
                        onChange={ev => setDescription(ev.target.value)}
                        placeholder='description'
                    />
                </div>
                <button type='submit'>Add new transaction</button>
            </form>

            <div className='transactions'> 
                {transactions.length > 0 && transactions.map(transaction => (
                    <div className='transaction' key={transaction._id}> {/* ✅ Unique key */}
                        <div className='left'>
                            <div className='name'>{transaction.name}</div>
                            <div className='description'>{transaction.description}</div>
                        </div>
                        <div className='right'>
                            <div className={'price ' + (transaction.price < 0 ? 'red' : 'green')}>
                                {transaction.price}
                            </div>
                            <div className='datetime'>{new Date(transaction.datetime).toLocaleString()}</div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default App;
