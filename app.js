const express=require('express');
const app=express();
const studentRoute=require('./api/routes/student');
const facultyRoute=require('./api/routes/faculty');
const userRoute=require('./api/routes/user');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

mongoose.connect('mongodb+srv://tobi:hello1990@cluster0.kcsiwae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
mongoose.connection.on('error',err=>{
    console.log('connect fail');
})
mongoose.connection.on('connected',connected=>{
    console.log('mongo connected');
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student',studentRoute)
app.use('/faculty',facultyRoute)
app.use('/user',userRoute)
app.use((req,res,next)=>{
    res.status(404).json({
        msg:'bad request'
    })
})
module.exports=app;