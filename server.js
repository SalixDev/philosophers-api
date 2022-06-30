const express = require ('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;
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

//routes

app.get('/', (req, res) => {
    db.collection('Philosophers').find().toArray()
    .then(data => {
        console.log('DB data received')
        res.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addPhilos', (req, res) => {
    console.log(req)
    db.collection('Philosophers').insertOne({
    fullName: req.body.fullName, born: req.body.born, died: req.body.died,
    mainInterests: req.body.mainInterests, wiki: req.body.wiki, likes: 0})
    .then(result => {
        console.log('Philo added. Thank you.') //may want to set alert() after redirect
        res.redirect('/')
        alert('Philosopher added, thank you.')
    })
    .catch(error => console.error(error))
})

app.delete('/deletePhilo', (req, res) => {
    db.collection('Philosophers').deleteOne({_id: new ObjectId(`${req.body.objectIdReq}`)})
    .then(result => {
        console.log('Philo Deleted')
        res.json('Philo Deleted')
    })
    .catch(error => console.error(error))

})

app.put('/addOneLike', (req, res) => {
    db.collection('Philosophers').updateOne({_id: new ObjectId(`${req.body.objectIdReq}`)},{
        $set: {
            likes: req.body.likesReq + 1
          }
    })
    .then(result => {
        console.log('Added One Like')
        res.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`) //back ticks to make ${} work
})