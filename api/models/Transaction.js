const mongoose = require("mongoose"); // Import Mongoose
const { Schema ,model} = mongoose;

// Define Schema
const TransactionSchema = new Schema({
    name: { type: String, required: true },
    price:{type :Number,required:true},
    description: { type: String, required: true },
    datetime: { type: Date, required: true },
});

// Create Model
const TransactionModel = mongoose.model("Transaction", TransactionSchema);

module.exports = TransactionModel;
