const express = require('express');
const cors = require('cors');
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

const Transaction =require('./models/Transaction.js');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 4000;


app.use(cors());
app.use(express.json())

app.get('/api/test', (req, res) => {
    res.json({ body: 'test ok2' });
});

app.post('/api/transaction',(req, res) => {
    const { name,description,datetime } = req.body;
    console.log(MONGO_URL)
// mongoose.connect('')
    
    res.json({
        message: 'Transaction received successfully!',
        transaction: { name,description,datetime }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
