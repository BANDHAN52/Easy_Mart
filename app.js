    const express = require('express');
    const session = require('express-session');
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended : true}));

    const userRouter = require('./routes/user.route');
    const bankRouter = require('./routes/bank.route');
    const defaultRouter = require('./routes/default.route');
    const supplierRouter = require('./routes/supplier.route');
    const userModel = require('./models/user.model');
    const bankAccountModel = require('./models/bank.account.model');
    const transactionModel = require('./models/transaction.model');
    const { connect_database } = require('./config/database');
    app.set('view engine', 'ejs');

    app.use(session({
        secret: '123456',
        resave: false,
        saveUninitialized: false
    }));
    

    app.use(express.static('public')); 
    

    connect_database();

    app.use('/api/user',userRouter);
    app.use(defaultRouter);
    app.use('/api/bank',bankRouter);
    app.use('/api/supplier',supplierRouter);

    // Import the productModel
    const productModel = require('./models/product.model');

    // Define an async function to call the initDefaultProducts method
    async function initializeDefaultProducts() {
    try {
        await productModel.initDefaultProducts();
        console.log('Default products inserted successfully.');
    } catch (error) {
        console.error('Error inserting default products:', error);
    }
    }

    // Call the initializeDefaultProducts function
    initializeDefaultProducts();


    app.use((err,req,res,next)=>{

        res.send('something  broke : ' + err.message);
        
    });

        app.use((req,res,next)=>{

            res.send('invalid url');
            
        });
    module.exports = app;