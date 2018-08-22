var express = require ('express');
var app = express();
var configFile= require('../../config');
const port=process.env.PORT ||configFile.port;
const bodyParser = require('body-parser');
var router=express.Router();
var fashionRouter=require('../routes/fashionData/fashion');
var electronicsRouter=require('../routes/electronicsData/electronics');
var watchesData=require('../routes/watchesData/watches');
var booksData=require('../routes/booksData/books');
var uploadData=require('../routes/dataUpload/dataUpload');
var mainPageData=require('../routes/mainPageData/mainPageData');
var authentication = require('../routes/auth/authSellor');
var sellorProfile = require('../routes/sellorProfile/dashboard')
var cors = require('cors');
var path = require('path');
var url = require('url');
const mongoose = require('mongoose');
//mongoose.connect('mongodb://perokartDB:pero9pero@ds253891.mlab.com:53891/perokart')
mongoose.connect('mongodb://localhost/myEkartApp');

// console.log("Path : ", __dirname + '/../public');


var finalPath = path.join(__dirname + './../public');

app.use(express.static(finalPath)); //Serves resources from public folder

//cors
app.use(cors());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/api/uploadData',uploadData);
app.use('/api/electronics',electronicsRouter);
app.use('/api/fashion',fashionRouter);
app.use('/api/books',booksData);
app.use('/api/watches',watchesData);
app.use('/api/auth',authentication);
app.use('/api/mainPageData',mainPageData);
app.use('/api/auth/profile',sellorProfile);
console.log("The path will be:",finalPath);
app.get('/', function (req,res) {
    console.log(finalPath);
    res.sendFile(finalPath + '/index.html');

})
app.listen(port,function () {
    console.log(`listening server at port ${port}`);
})


