const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = 3001;

app.get("/",async function (req,res){
    
try {
    const connection = await mysql.createConnection(config.db)
    // res.status(200).send('Database connection was made')
    const [result,] = await connection.execute('select * from task')
   
    if(!result) result=[] //return emty array if there is no data
    res.status(200).json(result)

} catch(err) {
    // res.status(500).send(err.message)
    res.status(500).json({error: err.message})
}
})
app.listen(port)
