var express = require('express');
const app = express();
const port = 8210;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
//const mongourl = "mongodb://localhost:27017"
const mongourl = "mongodb+srv://local:test1234@cluster0.f8vmc.mongodb.net/eduaug?retryWrites=true&w=majority"
var db;
//get
app.get('/',(req,res) => {
    res.send("Welcome to Node Api2")
})

//List All cities
app.get('/location',(req,res) =>{
    db.collection('location').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//List all restaurants
app.get('/restaurants',(req,res) =>{
    db.collection('restaurents').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//List restaurants wrt to city
// params example
/*app.get('/restaurant/:cityId',(req,res) =>{
    var cityId = req.params.cityId;
    db.collection('restaurents').find({city:cityId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})*/
// query example
app.get('/restaurant',(req,res) =>{
    var cityId = req.query.cityId?req.query.cityId:"2";
    db.collection('restaurents').find({city:cityId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})


//List all QuickSearches
app.get('/quicksearch',(req,res) =>{
    db.collection('mealType').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

MongoClient.connect(mongourl, (err,client) => {
    if(err) console.log("Error While Connecting");
    db = client.db('eduaug');
    app.listen(port,()=>{
        console.log(`listening on port no ${port}`)
    });
})