const express=require('express');
const conn = require('../models/database');
const {sign,verify,refresh}=require('../lib/auth');
const router = express.Router();

router.post('/login',(req,res,next)=>{
    let sql = "SELECT * FROM users where userName=? and password=?;";
    let query = conn.query(sql,[req.body.username,req.body.password], (err, results) => {
        if (err) throw err;
        if(results.length>0){
            //console.log(results[0]);
            let token = sign(results[0].userName,results[0].userId);
            return res.status(200).send({statusCode:200,message:'Success',data:results[0],token:token});
        }else{
            return res.status(400).send({statusCode:400,message:'Invalid UserName And Password',data:[]});
        }
    });
});

router.post('/signup',(req,res,next)=>{
    let sql = "SELECT * FROM users where userName=?";
    let query = conn.query(sql,[req.body.username], (err, results) => {
        if (err) throw err;
        if(results.length>0){
            return res.status(400).send({statusCode:400,message:'Username Already Exists.',data:[]});
        }else{
            let sql1="insert into users(firstName,lastName,userName,password) values(?,?,?,?)";
            return conn.query(sql1,[req.body.firstname,req.body.lastname,req.body.username,req.body.password], (err, result) => {
                if (err) throw err;
                //console.log(result);
                if(result.insertId>0){
                    res.status(200).send({statusCode:200,message:'',data:[]});
                }
                else{
                    res.status(400).send({statusCode:400,message:'Something went wrong.',data:[]});
                }
            });
        }
    });
});

router.get('/refreshToken',(req,res,next)=>{
    let _token = refresh(req,res);
    return res.status(200).send({statusCode:200,message:'',data:[],token:_token});
});

router.get('/users',verify,(req,res,next)=>{
    let sql = "SELECT * FROM users ";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        if(results.length>0){
            return res.status(200).send({statusCode:200,message:'Success',data:results});
        }else{
            return res.status(400).send({statusCode:400,message:'No Record Found',data:[]});
        }
    });
});

exports.router = router;