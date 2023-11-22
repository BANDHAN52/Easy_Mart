const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({
  
  bankAccountNumber : Number,
  bankAccountPassword : String,
  bankAccountBalance : Number,
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const bankAccountModel = mongoose.model('bank_accounts',bankSchema); 

module.exports = bankAccountModel;