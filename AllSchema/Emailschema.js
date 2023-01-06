const mongoose = require('mongoose');

// moongose Schema defined for email
const emailSchema = new mongoose.Schema({
    email: String,
})

// Model defined for Email.
const UserEmail = new mongoose.model("UserEmail", emailSchema)

module.exports={UserEmail}