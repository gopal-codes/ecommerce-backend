const mongoose = require('mongoose');


// moongose schema defined for signup user.
// ALWAYS SPECIFY ID FOR SCHEMA BECAUSE IT IS NEEDED FOR 
// REACT-USE-CART ...OTHERWISE IT WONT WORK ...
const productSchema = new mongoose.Schema({
    catogories:String,
    title:String,
    description:String,
    price:Number,
    product:String,
    id:String,
})
// Modal for User
const Products = new mongoose.model("Products",productSchema);

module.exports={Products}