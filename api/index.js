require('dotenv').config(); // ✅ Load .env at the very top
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Transaction = require("./models/Transaction");

const app = express();
const PORT = 4000;

// ✅ Validate that MONGO_URL is loaded
if (!process.env.MONGO_URL) {
    console.error("❌ MONGO_URL is missing! Check your .env file.");
    process.exit(1);
}

// ✅ MongoDB Connection (Connect Once)
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Connection Error ❌", err));

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ body: "test ok2" });
});

// ✅ Save Transaction
app.post("/api/transaction", async (req, res) => {
    try {
        const { price,name, description, datetime } = req.body;

        if (!price || !name || !description || !datetime) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const transaction = await Transaction.create({ price,name, description, datetime });
        res.status(201).json(transaction);
    } catch (error) {
        console.error("Error saving transaction:", error);
        res.status(500).json({ error: "Error saving transaction" });
    }
});
app.get('/api/transaction' ,async (req,res)=>{
    await mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const transactions=await Transaction.find();
    res.json(transactions)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
