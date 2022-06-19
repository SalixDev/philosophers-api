const express = require ('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 8000; //use default environment port or 8000
require('dotenv').config();
const cors = require ('cors');


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'myFirstDatabase'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })


app.set('view engine', 'ejs')
app.use(cors()) //use cors
app.use(express.static('public')) //tells express to load files from 'public' folder
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    db.collection('Philosophers').find().toArray()
    .then(data => {
        console.log('DB data recieved')
        res.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

// app.get('/', (req, res)=>{
//     db.collection('Philosophers').find().toArray()
//     .then(data => {
//         console.log(data)
//         // response.json('index.ejs', { info: data })
//     })
//     .catch(error => console.error(error))
// })

//send json back; /api:queryParameter

app.get ('/api/:philoName', (req, res)=>{ //get url and query param
    const philoName = req.params.philoName.toLowerCase() //assign query param to variable
    if(philoList[philoName]){ //if List contains query param variable (philosopher last name)
        res.json(philoList[philoName])    //respond with corresponding object
    }else{ //if List contains no such name, res with unknown object.
        res.json(philoList['unknown'])
    }
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`) //backticks to make ${} work
})