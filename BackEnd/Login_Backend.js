const express = require('express')
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
const port = "5050";
const cors = require('cors');
require('dotenv').config();
const storage = require('node-sessionstorage')

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

app.post('/api/SignUp', async (req, res)=>{
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
    const secret_key = process.env.SECRET_KEY;
    const decode = crypto.AES.decrypt(req.body.pw, secret_key);   
    const decrypted = decode.toString(crypto.enc.Utf8);
    
    //단방향 암호화 bcrypt
    //bcrypt 같은 경우 SHA 에 비해 공격에 강한 암호화 방식이다. hash()=> 동기 hashSync()=> 비동기
    //hash(password, salt) => salt 암호화하는데 몇번 할 것 인지
    const encryptedPassword = await bcrypt.hashSync(decrypted, 10);
    const query = `insert into account (id, password, name, securityNum, address, phoneNumber) values ('${req.body.id}', '${encryptedPassword}', '${req.body.name}', '${req.body.identity}', '${req.body.address}', '${req.body.phoneNumber}')`;
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

    const pw = req.body.pw;
    const secret_key = process.env.SECRET_KEY;
    //crypto 복호화
    const decode = crypto.AES.decrypt(pw, secret_key);  
    const decrypted = decode.toString(crypto.enc.Utf8);
    const query = `select password from account where id='${req.body.id}'`;
    await connection.query(query, function(err, topics) {
        try{
            const result_pw = bcrypt.compareSync( decrypted, topics[0].password);
            
            if(result_pw){
                const encryptedPassword = bcrypt.hashSync(decrypted, 11);
                //console.log(encryptedPassword);
                //storage.setItem('access_token', encryptedPassword);
                res.send(encryptedPassword);
            }
            else
            {
                res.send("로그인 실패!");   
            }
        }catch(e)
        {
            console.log(e);
            res.send("로그인 실패!")
        }
    });
    
});

//카카오 로그인 통신 
app.post('/api/kauth', async (req, res)=>{
    const client_id = req.body.client_id;
    const redirect_uri = req.body.redirect_uri;
    const kakao_code = req.body.code;
    const client_secret = req.body.client_secret;
    //const header = {"application/x-www-form-urlencoded;charset=utf-8"};

    const options = {
        uri:'https://kauth.kakao.com/oauth/token', 
        method: 'POST',
        header: 'application/x-www-form-urlencoded;charset=utf-8',
        body: {
            grant_type:'authorization_code',
            client_id: client_id,
            redirect_uri: redirect_uri,
            code: kakao_code,
            client_secret: client_secret
        },
        json:true
    }
    
    request.post(options, function(err,httpResponse,body){ console.log(err); console.log(httpResponse);});

    //로그인을 이미 했을 경우
    /*if(storage.getItem('access_token') !== undefined)
    {
        console.log(storage.getItem('access_token'));
        
    }
    else
    {
        storage.setItem('access_token', access_token);
        storage.setItem('refresh_token', refresh_token);
        res.send('로그인 성공');
    }*/
  
});


//DB 연동 확인
connection.connect(function(err) {
    if(err) {
        console.log(err);
    }
   console.log("connection success");
});

app.listen(port);
