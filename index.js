const express=require('express');
const path =require('path');
const mysql =require('mysql');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
const app=express();

const con= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'vaccine'

})

con.connect((err)=>{
    if(err){
        console.log(err);
    }
});

app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,"public")));
console.log(path.join(__dirname,"public"));



app.get("/",(req,res)=>{
    res.render('index');
})

app.get("/register",(req,res)=>{
    res.render('register');
})

app.get("/data",(req,res)=>{
    sql=`SELECT * FROM vaccine`;
    con.query(sql,(err,result)=>{
        if(err){
        console.log(err);
        }
        res.render('data',{
            data: result
        });
    });

})


app.post("/user",urlencodedParser,(req,res)=>{

    const sql=`INSERT INTO vaccine(name, aadhar, mobile, address, phc) VALUES ('${req.body.fname}','${req.body.aadhar}','${req.body.mobile}','${req.body.address}','${req.body.phc}')`;
    con.query(sql,(err)=>{
        if(err){
            console.log(err);
        }
    });
     res.render('user',{
         fname: req.body.fname,
         aadhar: req.body.aadhar,
         mobile: req.body.mobile,
        address: req.body.address,
         phc: req.body.phc
     });
})

app.listen(3000);
