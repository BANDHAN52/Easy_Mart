const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  
  userId : String,
  userBankAccountNumber : Number,
    quantity1 : Number,
    quantity2 : Number,
    quantity3 : Number,
    amount : Number,
    status : String,
    info: String,
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const transactionModel = mongoose.model('transactions',transactionSchema); 

module.exports = transactionModel;