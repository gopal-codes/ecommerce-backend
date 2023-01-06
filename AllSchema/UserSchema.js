const mongoose = require('mongoose');


// moongose schema defined for signup user.
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    profile:String
})
// Modal for User
const User = new mongoose.model("User",userSchema);

module.exports={User}