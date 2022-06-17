const express = require ('express');
const app = express();
const PORT = 8000;
const cors = require ('cors');

app.use(cors())

//json object
const philoList = {
    'nietzsche':{
        'Full Name': 'Friedrich Nietzsche',
        'Nationality': 'German',
        'Born': new Date('October 15, 1844'),
        'Died': new Date('August 25 1900'),
        'Main Interests': 'Aesthetics, philology, ethics, metaphysics, ontology, philosophy of history, poetry, religion, tragedy, truth, theory, value theory'
    },
    'hegel':{
        'Full Name': 'Georg Wilhelm Friedrich Hegel',
        'Nationality': 'German',
        'Born': new Date('August 27 1770'),
        'Died': new Date('November 14 1831'),
        'Main Interests': 'Metaphysics, Epistemology, Naturphilosophie, Theology, Philosophy of history, Ethics, Political philosophy, Logic, Aesthetics'
    },
    'unknown': {
    'age': 'UNKNOWN',
    'birthName': 'UNKNOWN',
    'birthLocation': 'UNKNOWN',
    }
}

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html') 
    //__dirname means file is in the same directory
})

//send json back; /api:queryParameter
app.get ('/api/:philoName', (req, res)=>{ //get url and query param
    const philoName = req.params.philoName.toLowerCase() //assign query param to variable
    if(philoList[philoName]){ //if List contains query param variable (philosopher last name)
        res.json(philoList[philoName])    //respond with corresponding object
    }else{ //if List contains no such name, res with unknown object.
        res.json(philoList['unknown'])
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${PORT}`) //backticks to make ${} work
})