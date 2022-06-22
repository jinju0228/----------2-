const express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');

const router = require('./routes/route');

const app = express()

var expressLayouts = require('express-ejs-layouts');


const port = 3000



app.use(expressLayouts);



app.set('views',path.join(__dirname + "/views"));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'public')));




app.set('layout', "layout")

app.engine('html', require('ejs').renderFile)
//views 폴더안에 있는걸 읽기위한 장치



//css랑 img, js의 파일 사용을 위한 경로 설정
app.use(express.static(__dirname + '/public'))

app.use('/', router) //미들웨어 등록
module.exports = app


