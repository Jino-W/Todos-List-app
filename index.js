const express = require('express') 
const router = require('./config/routes')
const connectToDb = require('./config/database')
const multer = require('multer')
const bodyParser = require('body-parser');
const path = require('path')
const app = express()
const cors = require('cors')
const port = 3015

app.use(express.json()) 
connectToDb()

app.use(bodyParser.urlencoded({extended:true}))


//storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage }).single('profileImage');


app.use(cors())

app.use('/', router)

app.listen(port,()=>{
    console.log('listening to port', port)
})