const express=require('express');
const conn = require('../models/database');
const router = express.Router();

router.get('/budget',(req,res,next)=>{
    let sql = "SELECT * FROM budgets where userId=?;";
    let query = conn.query(sql,[req.body.userid], (err, results) => {
        if (err) throw err;
        if(results.length>0){
            return res.status(200).send({statusCode:200,message:'Success',data:results});
        }else{
            return res.status(400).send({statusCode:400,message:'No Record Found',data:[]});
        }
    });
});

router.post('/budgetFilter',(req,res,next)=>{
    let sql = "SELECT * FROM budgets where userId=? and year=? and month=?;";
    let query = conn.query(sql,[req.body.userid,req.body.year,req.body.month], (err, results) => {
        if (err) throw err;
        if(results.length>0){
            return res.status(200).send({statusCode:200,message:'Success',data:results});
        }else{
            return res.status(400).send({statusCode:400,message:'No Record Found',data:[]});
        }
    });
});

router.post('/budget',(req,res,next)=>{
    let sql = "insert into budgets(type,allocation,spent,month,year,userId) values(?,?,?,?,?,?)";
    let query = conn.query(sql,[req.body.type,req.body.allocation,req.body.spent,req.body.month,req.body.year,req.body.userid], (err, results) => {
        if (err) throw err;
        if(results.insertId>0){
            res.status(200).send({statusCode:200,message:'Success',data:[]});
        }
        else{
            res.status(400).send({statusCode:400,message:'Something went wrong.',data:[]});
        }
    });
});

router.put('/budget/:bid',(req,res,next)=>{
    let sql = "update budgets set (type=?,allocation=?,spent=?,month=?,year=? where userId=? and budgetId=?";
    let query = conn.query(sql,[req.body.type,
        req.body.allocation,
        req.body.spent,
        req.body.month,
        req.body.year,
        req.body.userid,
        req.params.bid], (err, results) => {
        if (err) throw err;
        if(results.length>0){
            return res.status(200).send({statusCode:200,message:'Success',data:results});
        }else{
            return res.status(400).send({statusCode:400,message:'No Record Found',data:[]});
        }
    });
});
exports.router = router;