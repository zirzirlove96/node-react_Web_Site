const express = require('express')
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const port = "5050";
const cors = require('cors');

let corsOption = {
    origin: "http://localhost:3000",
    Credential: true
}

app.use(cors(corsOption));    //필수!!!! 
app.use(express.json())
app.use(express.urlencoded({extended : true})) //body-parser 역할

const DBConnection = 
{
    host: "127.0.0.1",
    port: "3307",
    user: "root",
    password : "1234",
    database: "mysql"
};

var connection = mysql.createConnection(DBConnection);

app.post('/api/SignUp', async (req, res)=>{
    console.log(req.body);
    if(req.body.id == "" || req.body.pw == "" || req.body.identity == "" || req.body.name == "" || req.body.address == "" || req.body.phoneNumber == "")
    {
       res.send('빈칸이 있습니다. 다시 입력해주세요.');
    }
    const query1 = `select * from mysql.account where id='${req.body.id}'`;
    await connection.query(query1, function(err, topics) {
        if(topics.length != 0)
        {
            res.send('아이디가 동일한 회원정보가 있습니다. 다른 아이디로 설정해주세요.');
        }
    });
    const encryptedPassword = bcrypt.hashSync(req.body.pw, 10);
    const query = `insert into account (id, password, name, identity, address, phoneNumber) values ('${req.body.id}', '${encryptedPassword}', '${req.body.name}', '${req.body.identity}', '${req.body.address}', '${req.body.phoneNumber}')`;
    await connection.query(query, function(err, topics) { 
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

    const query = `select pw from account where id='${req.body.id}'`;
    await connection.query(queyr, function(err, topics) {

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
