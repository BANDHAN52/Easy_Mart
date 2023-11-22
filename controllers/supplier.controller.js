const transactionModel = require('../models/transaction.model');
const userModel = require('../models/user.model');
const bankModel = require('../models/bank.account.model');


let transactions = [];
let userIds = [];
let usersNames = [];
let errorMessage = '';
exports.supplierLoginPage = (req,res)=>{
    res.render('supplier.login.ejs',{errorMessage: errorMessage});
 };

 exports.supplierOrdersPage = async (req, res) => {
  const transactions = await transactionModel.find().sort({ createdOn: -1 });
  const userIds = transactions.map(transaction => transaction.userId);
  const users = await userModel.find({ _id: { $in: userIds } });
  const userNames = users.map(user => user.name);
  console.log(userNames);
  res.render('supplier.orders.ejs', { orders: transactions, names: userNames });
};



 exports.supplierLogin = async (req, res) => {
   
    try {
        const { email, password } = req.body;
        
    
        if (email != 'supplier@gmail.com') {
          errorMessage = 'incorrect email';
          res.redirect('/api/supplier/login');
        }
    
       else if (password !== 'supplier') {
          
        errorMessage = 'incorrect password';
        res.redirect('/api/supplier/login');
    
        
      }
      else
      {
        
        errorMessage = '.';
          
          res.redirect('/api/supplier/orders');
          
      }
     } catch (error) {
        res.status(500).json(error.message);
      }
  };


  exports.orderAccept = async (req,res)=>{
    const orderId = req.body.orderId;
    transactions = await transactionModel.findOne({_id: orderId});

    const customerBankAccountNumber = transactions.userBankAccountNumber;
    const ecommerceBankAccount = await bankModel.findOne({bankAccountNumber : 111111});
    const customerBankAccount = await bankModel.findOne({bankAccountNumber : customerBankAccountNumber});
    const supplierBankAccount = await bankModel.findOne({bankAccountNumber : 222222});
    console.log(customerBankAccount);

    transactions.status = 'accepted';
    await transactions.save();


    let ecommerceBalance = Number(ecommerceBankAccount.bankAccountBalance);
      let customerBalance = Number(customerBankAccount.bankAccountBalance);
      let supplierBalance = Number(supplierBankAccount.bankAccountBalance);

      let paymentValue = Number(transactions.amount);

      ecommerceBalance -= Number(paymentValue);
      supplierBalance += Number(paymentValue);
   
    supplierBankAccount.bankAccountBalance = supplierBalance;
    ecommerceBankAccount.bankAccountBalance = ecommerceBalance;
    

    await supplierBankAccount.save();
    await ecommerceBankAccount.save();


    res.redirect('/api/supplier/orders');

  };

  exports.orderReject = async (req,res)=>{
    const orderId = req.body.orderId;
    transactions = await transactionModel.findOne({_id: orderId});
    


    const customerBankAccountNumber = transactions.userBankAccountNumber;
    const ecommerceBankAccount = await bankModel.findOne({bankAccountNumber : 111111});
    const customerBankAccount = await bankModel.findOne({bankAccountNumber : customerBankAccountNumber});
    const supplierBankAccount = await bankModel.findOne({bankAccountNumber : 222222});

    transactions.status = 'rejected';
    await transactions.save();

    let ecommerceBalance = Number(ecommerceBankAccount.bankAccountBalance);
      let customerBalance = Number(customerBankAccount.bankAccountBalance);
      let supplierBalance = Number(supplierBankAccount.bankAccountBalance);

      let paymentValue = Number(transactions.amount);

      ecommerceBalance -= Number(paymentValue);
      customerBalance += Number(paymentValue);
   
    customerBankAccount.bankAccountBalance = customerBalance;
    ecommerceBankAccount.bankAccountBalance = ecommerceBalance;
    

    await customerBankAccount.save();
    await ecommerceBankAccount.save();

    res.redirect('/api/supplier/orders');
  };

  exports.orderSupplied = async (req,res)=>{
    const orderId = req.body.orderId;
    transactions = await transactionModel.findOne({_id: orderId});
    console.log(transactions);

    transactions.status = 'supplied';
    await transactions.save();

    

    res.redirect('/api/supplier/orders');
  };