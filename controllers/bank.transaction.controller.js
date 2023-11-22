const BankAccount = require('../models/bank.account.model');
const transactionModel = require('../models/transaction.model');


let quantity1 = 0;
let quantity2 = 0;
let quantity3 = 0;
let quantityTotal = 0;
let errorMessage = ' ';

exports.bankTransactionPage = (req,res)=>{

    quantity1 = req.query.quantity1 ;
    quantity2 = req.query.quantity2 ;
    quantity3 = req.query.quantity3 ;
    quantityTotal = req.query.quantityTotal;

    req.session.paymentAmount = quantityTotal;
    req.session.quantity1 = quantity1;
    req.session.quantity2 = quantity2;
    req.session.quantity3 = quantity3;

    res.render('user.bank.payment.confirm.ejs',{
        quantity1 : quantity1,
        quantity2 : quantity2,
        quantity3 : quantity3,
        quantityTotal : quantityTotal,
        errorMessage : errorMessage
    });

};




exports.bankPaymentTransaction = async (req, res) => {

  const bankAccountNumber = req.body.accountNumber;
  const bankAccountPassword = req.body.password;

  const paymentValue = req.session.paymentAmount;

  quantity1 = req.session.quantity1;
  quantity2 = req.session.quantity2;
  quantity3 = req.session.quantity3;

  
  
  
  try {
    // Check if the bank account exists and the password matches
    const customerBankAccount = await BankAccount.findOne({ bankAccountNumber : bankAccountNumber});
    const ecommerceBankAccount = await BankAccount.findOne({bankAccountNumber : 111111});
    

    if (!customerBankAccount) {
     
      const script = `
    <script>
      alert('Invalid bank account number');
      history.back();
    </script>
  `;
  
  res.send(script);
      }
  
     else if (customerBankAccount.bankAccountPassword !== bankAccountPassword) {
        
      const script = `
    <script>
      alert('Incorrect password');
      history.back();
    </script>
  `;
  
  res.send(script);
  
      
    }
    else if(customerBankAccount.bankAccountBalance < paymentValue)
    {
    
      const script = `
    <script>
      alert('Insufficient balance');
      history.back();
    </script>
  `;
  
  res.send(script);
    }
    

    else
    {
  //       // Update the bank account balance

      let ecommerceBalance = Number(ecommerceBankAccount.bankAccountBalance);
      let customerBalance = Number(customerBankAccount.bankAccountBalance);

      ecommerceBalance += Number(paymentValue);
      customerBalance -= Number(paymentValue);
   
    customerBankAccount.bankAccountBalance = customerBalance;
    ecommerceBankAccount.bankAccountBalance = ecommerceBalance;
    

    await customerBankAccount.save();
    await ecommerceBankAccount.save();


  const newTransaction = new transactionModel({
    userId : req.session.userId,
    userBankAccountNumber : bankAccountNumber,
    quantity1 : quantity1,
    quantity2 : quantity2,
    quantity3 : quantity3,
    amount : paymentValue,
    status : 'pending',
    info: 'Customer paid'
  });

  const insertedTransaction = await newTransaction.save();

  

    // Redirect to the purchase history page or send a success response
    const script = `
    <script>
      alert('Payment Successful');
      window.location.href = '/api/user/orders';
    </script>
  `;
  
  res.send(script);
    }

  } catch (error) {
    console.error(error);
    res.send({message: error.message});
  }

};


exports.bankLoginPage = (req,res)=>{

  res.render('bank.login.ejs',{errorMessage : errorMessage});
};

exports.bankLogin =  async(req,res)=>{
  const bankAccountNumber = req.body.accountNumber;
  const bankAccountPassword = req.body.password;

  const userBankAccount = await BankAccount.findOne({ bankAccountNumber : bankAccountNumber});
    

    if (!userBankAccount) {
      errorMessage = 'invalid bank account number';
      res.redirect('/api/bank/login');
      }
  
     else if (userBankAccount.bankAccountPassword !== bankAccountPassword) {
        
      errorMessage = 'incorrect password';
      res.redirect('/api/bank/login');
      
    }
    else
    {
      req.session.bankAccountNumber = bankAccountNumber;
      errorMessage = ' ';
      res.redirect('/api/bank/home');
    }

};

exports.bankHomePage = async(req,res)=>{

  const bankAccountNumber = req.session.bankAccountNumber;

  const userBankAccount = await BankAccount.findOne({ bankAccountNumber : bankAccountNumber});
  res.render('bank.home.ejs',{bankAccount: userBankAccount});
};

exports.bankLogout = async(req,res)=>{

  req.session.bankAccountNumber = 0;
  res.redirect('/api/bank/login');
};



