require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose =require('mongoose')
const router = require('./routing/routes')
const rout = require('./routing/striperoute');
const path = require('path');

const port =process.env.PORT|| 9002;

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://gopalraut:idonthaveone@firstherokuupload.l3aog.mongodb.net/firstherokuupload?retryWrites=true&w=majority" , {
                useNewUrlParser:true,
                useUnifiedTopology:true
} ,()=>{
    console.log("DB connected");
})

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/api",router);
app.use("/stripe",rout);
// use express.static as it help to set path of image for  opening our image on browser
app.use('/public',express.static('public'));

// use frontend as static file
app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});

app.listen(port,()=>{
    console.log("Backend started at port "+port);
})