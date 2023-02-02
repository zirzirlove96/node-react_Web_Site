const express = require('express')
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const port = "5050";
const cors = require('cors');
require('dotent').config();

let corsOption = {
    origin: "http://localhost:3000",
    Credential: true
}

app.use(cors(corsOption));    //필수!!!! 
app.use(express.json())
app.use(express.urlencoded({extended : true})) //body-parser 역할

const DBConnection = 
{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

var connection = mysql.createConnection(DBConnection);
const key = "password";

app.post('/api/SignUp', async (req, res)=>{
    console.log(req.body);
    if(req.body.id == "" || req.body.pw == "" || req.body.securityNum == "" || req.body.name == "" || req.body.address == "" || req.body.phoneNumber == "")
    {
       res.send('빈칸이 있습니다. 다시 입력해주세요.');
       return;
    }
    const query1 = `select * from mysql.account where id='${req.body.id}'`;
    await connection.query(query1, function(err, topics) {
        if(topics.length != 0)
        {
            res.send('아이디가 동일한 회원정보가 있습니다. 다른 아이디로 설정해주세요.');
        }
    });
    //단방향 암호화 bcrypt
    //bcrypt 같은 경우 SHA 에 비해 공격에 강한 암호화 방식이다. hash()=> 동기 hashSync()=> 비동기
    //hash(password, salt) => salt 암호화하는데 몇번 할 것 인지
    const encryptedPassword = await bcrypt.hashSync(req.body.pw, 10);
    const query = `insert into account (id, password, name, securityNum, address, phoneNumber) values ('${req.body.id}', '${encryptedPassword}', '${req.body.name}', '${req.body.securityNum}', '${req.body.address}', '${req.body.phoneNumber}')`;
    await connection.query(query, function(err, topics) { 
        console.log(err);
        if(topics === undefined)
        {
            res.send("회원가입에 실패하였습니다.");
        }else
        {
            res.send("회원가입에 성공하였습니다.");
        }
    });
});

app.post('/api/Login', async (req, res)=>{
    if(req.body.id == "" || req.body.pw == "")
    {
       res.send('아이디 또는 비밀번호가 빈칸입니다. 확인해주세요.');
    }

    const query = `select password from account where id='${req.body.id}'`;
    await connection.query(query, function(err, topics) {
        console.log(topics[0].password);
        console.log(req.body.pw);
        const result_pw = bcrypt.compareSync(req.body.pw, topics[0].password);
        console.log(result_pw);
        if(result_pw){
            res.send("로그인 성공!");
        }
        else
        {
            res.send("로그인 실패!");   
        }
    });
    
});

//DB 연동 확인
connection.connect(function(err) {
    if(err) {
        console.log(err);
    }
   console.log("connection success");
});

app.listen(port);
