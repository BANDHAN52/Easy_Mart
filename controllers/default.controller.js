
const productModel = require('../models/product.model');


exports.defaultHomePage = async(req,res)=>{
    try {
        

    const products = await productModel.find().limit(3);

    res.render('default.home.ejs',{products : products});
    } catch (error) {
        res.send({message: error.message});
    }
 };