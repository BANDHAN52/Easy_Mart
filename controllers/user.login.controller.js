const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const transactionModel = require('../models/transaction.model');

let errorMessage = '';
let usersName = '';
let products = null;
exports.userLoginPage = (req,res)=>{
    res.render('user.login.ejs',{errorMessage: errorMessage});
 };

 exports.userRegistrationPage = (req,res)=>{
    res.render('user.register.ejs',{errorMessage: errorMessage});
 };

 exports.bankDetailsPage = (req,res)=>{
    res.render('user.bank.details.ejs',{});
 };


 exports.userOrdersPage = async(req,res)=>{
  
  const userId = req.session.userId;

  
    const user = await userModel.findOne({ _id : userId });
    usersName = user.name;

  const transactions = await transactionModel
  .find({ userId: userId })
  .sort({ createdOn: -1 });

  const products =  await productModel.find();

    res.render('user.orders.ejs',{orders : transactions,products : products, usersName: usersName});
 };

 exports.cartPage = async (req,res)=>{
    try {
        const quantity1 = req.query.quantity1;
    const quantity2 = req.query.quantity2;
    const quantity3 = req.query.quantity3;

    products = await productModel.find().limit(3);

    const userId = req.session.userId;
    const user = await userModel.findOne({ _id : userId });
    usersName = user.name;
   
    res.render('user.cart.ejs', {
      products: products,
      quantity1: quantity1,
      quantity2: quantity2,
      quantity3: quantity3,
      usersName : usersName
    });
    } catch (error) {
        res.send({message: error.message});
    }
 };

 exports.homePage = async (req,res)=>{
    try {
        const userId = req.session.userId;
    const user = await userModel.findOne({ _id : userId });
    usersName = user.name;

    products = await productModel.find().limit(3);

    res.render('user.home.ejs',{usersName: usersName,products : products});
    } catch (error) {
        res.send({message: error.message});
    }
 };
 exports.logout = (req,res)=>{
    req.session.userId = '';
    console.log('logged out userId: '+req.session.userId);
    errorMessage = '.';
    res.redirect('/api/user');
 };

 exports.bankDetails = async(req,res)=>{
    try {
        const userId = req.session.userId;
        const user = await userModel.findOne({ _id : userId });

        
    
        
        // Update the user's bank ID and password
        user.bankAccountNumber = req.body.accountNumber;
        user.bankAccountPassword = req.body.bankPassword;
       
        await user.save();
    
        // Login successful, redirect to a page
        res.redirect('/api/user/home');
    
      } catch (error) {
        res.send('error: '+error.message);
      }
 };


 exports.userRegistration = async (req, res) => {
   
    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email : email});
    
        if (user) {
          errorMessage = 'user already exists';
          res.redirect('/api/user/register');
        }
        else
        {
            const newUser = new userModel({
                name: req.body.name,
                email : req.body.email,
                password : req.body.password,
                bankAccountNumber : 0,
                bankAccountPassword : ''
            });
            
            const insertedUser = await newUser.save();  // we will wait for database insert process to finish

            req.session.userId = newUser._id;
            errorMessage = '.';
            res.redirect('/api/user/bank_details');
    
            //res.send(insertedUser); // showing the inserted data in json format
        }
        

    } catch (error) {
        res.send('message: '+error.message); // if any error , print the error message
    }
  };

 exports.userLogin = async (req, res) => {
   
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email : email});
    
        if (!user) {
          errorMessage = 'user not found';
          res.redirect('/api/user');
        }
    
       else if (user.password !== password) {
          
        errorMessage = 'incorrect password';
        res.redirect('/api/user');
    
        
      }
      else
      {
        errorMessage = 'login success';
        req.session.userId = user._id;
        console.log('logged in userId: '+ req.session.userId);
        errorMessage = '.';
          res.redirect('/api/user/home');
      }
     } catch (error) {
        res.status(500).json(error.message);
      }
  };

