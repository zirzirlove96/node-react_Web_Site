const express = require('express')
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
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
       // console.log(topics[0].password);
        /*const key2 = crypto.scryptSync(key, 'salt', 24);
        const iv = crypto.randomBytes();
        var cipher = crypto.createCipheriv('aes-192-cbc', key2, iv);
        //aes-192-cbc 알고리즘 형식 , key는 공개키
        //공개키로 암호화 및 복호화 가능
        cipher.update(topics[0].password, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
        cipher += cipher.final('base64');        // 암호화된 결과 값*/

        const algorithm = 'aes-256-cbc';
        const key = 'abcdefghijklmnopqrstuvwxyz123456';
        const iv = '1234567890123456';
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let result = cipher.update(req.body.pw, 'utf8', 'base64');
        result += cipher.final('base64');
        console.log('암호화 결과: ', result);

        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let result2 = decipher.update(result, 'base64', 'utf8');
        result2 += decipher.final('utf8');
        console.log('복호화 결과: ', result2);
        
        const result_pw = bcrypt.compareSync(result2, topics[0].password);
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
