const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");    // 리소스 공유  
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const users = require('./db/user');
const articles = require('./db/articles');
const { Http2ServerRequest } = require('http2');

const app = express();
const port = 8081;

app.use(express.json());
app.use(cookieParser());
let corsOptions = {
    origin: "http://localhost:8080",
    credentials: true
  }
  app.use(cors(corsOptions))
console.log(users);
console.log(articles);

const jwtconfig = {
    secretkey : "내가 원하는 키",
    options : {
        algorithm : "HS256",
        expiresin : "60m",
        issuer : "kjw"
    }
};


app.get('/', (req, res) => {
    res.send("게시글 리스트 페이지")
});


app.get('/my_cookie', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    
    res.cookie("id", "1234");  //쿠키 이름
    res.cookie("name", "재원"); // 쿠키 값
    res.send("쿠키 굽기")
});

app.get("/be_cookie", (req, res) => {
    res.send("쿠키있음");
    const id = req.body.id;
    const name = req.body.name;
    console.log(res.cookie);
});

app.get('/articles/add', (req, res) => {
    res.send("게시글 작성 페이지")
});

app.get('/articles/detail', (req, res) => {
    res.send("게시글 상세 페이지")
});

app.post('/login', (req, res) => {  
     const {email,password} = req.body
     const user = users.find(user => user.email === email && user.password === password); // user.email과 같은 email  user password와 같은 password를 user에 저장
        
     if (!user){     //! <-없다      // user 값과 같지 않다면 누구세요
            return res.send("누구세요?");
        }

    if (user.password !== password) {
        return res.send("비밀번호가 틀립니다")
    }

     const token = jwt.sign({name : user.name, id : user.id}, jwt)   
     res.cookie('jwt, token');   //id(쿠키 이름) user.email(쿠키값)
     res.send(login);

});


app.post('/articles/action/add', (req, res) => {
    res.send("게시글 작성 동작")
});


app.post('/articles/action/change', (req, res) => {
    res.send("게시글 수정 동작")
});

app.post('/articles/action/delete', (req, res) => {
    res.send("게시글 삭세 동작")
});

app.listen(port, () => {
    console.log(port, "서버가 열렸습니다");
});
