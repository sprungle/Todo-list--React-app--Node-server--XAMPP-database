// this one is good to go :)
// to-do task parts 1-4 from week 6
// week 7 and parts 5 and 6 continue on a cloned repo

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = 3001;

//get-header 
app.get("/",async function (req,res){
    try {
        const connection = await mysql.createConnection(config.db)
        // res.status(200).send('Database connection was made')
        
        const [result,] = await connection.execute('select * from task')
    
        if(!result) result=[] //return empty array if there is no data
        res.status(200).json(result)

    } catch(err) {
        // res.status(500).send(err.message)
        res.status(500).json({error: err.message})
    }
})
// post-header
app.post("/new", async function(req, res){
    try{
        const connection = await mysql.createConnection(config.db)
        //execute prepared statment
        const [result,] = await connection.execute('insert into task (description) values (?) ', [req.body.description])
        res.status(200).json({id:result.insertId})
    } catch(err){
        res.status(500).json({error: err.message})
    }
})
// delete-header
app.delete("/delete/:id", async function(req, res){
    try{
        const connection = await mysql.createConnection(config.db)
        //execute prepared statment
        await connection.execute('delete from task where id = ? ', [req.params.id])
        res.status(200).json({id:req.params.id})
    } catch(err){
        res.status(500).json({error: err.message})
    }
})


app.listen(port)
