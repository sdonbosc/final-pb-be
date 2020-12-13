const express=require('express');
const session = require('express-session');
var cors = require("cors");
const {sign,verify,refresh}=require('./lib/auth');
const login = require('./routes/authentication');
const budget = require('./routes/budget');
const body=require('body-parser');
const helmet = require("helmet");

const app = express(); 

app.use(express.static('/budget' + '/static'));

app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
    referrerPolicy: { policy: "no-referrer" }
  }));
app.use(session({secret:'!@#$%^&*',resave:false ,saveUninitialized:false}))
app.use(body.urlencoded({extended:false}));
app.use(body.json());

app.use('/api',login.router);
app.use('/api',verify,budget.router);

app.use('/',(req,res,next)=>{
    res.statusCode= 404;
    res.send();
});

app.listen(3000);