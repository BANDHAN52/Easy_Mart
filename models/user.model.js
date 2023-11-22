const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  
  name : String,
  email : String,
  password: String,
  bankAccountNumber : Number,
  bankAccountPassword : String,
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model('users',userSchema); 

module.exports = userModel;