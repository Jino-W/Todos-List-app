const mongoose = require('mongoose')

const connectToDb =()=>{
    mongoose.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false  })      
        .then(()=>{ 
            console.log('connected to db')
        })
        .catch((err, client)=>{
            if(err) return console.log(err)
            db = cli
            
        })
}

module.exports = connectToDb