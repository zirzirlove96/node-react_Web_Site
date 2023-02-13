import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Kakao_Login()
{
    const navigation = useNavigate();
    const current = window.location.href;
    //카카오 redirect_uri 코드
    let kakao_code = current.match('code=(.*)')[1];
    const headers = {
        'Content-Type' : 'application/x-www-form-urlencoded'
    }
    
    const host = 'https://kauth.kakao.com';
    const res = axios.post(`${host}/oauth/token?`+
        `grant_type=authorization_code&`+
        `client_id=${process.env.REACT_APP_REST_AUTHAPI}&`+
        `redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&`+
        `code=${kakao_code}&`+
        `client_secret=${process.env.REACT_APP_CLIENT_SECRETKEY}`
    , headers)
    .then(async function(res) {
        if(res.status === 200)
        {
            const res2 = await axios.post('http://localhost:5050/api/Kakao_Login', {
                access_token: res.data.access_token,
                refresh_token: res.data.refresh_token
            });

            if(res2.data.includes('성공')){
                window.location.href = 'http://localhost:3000';
            }
        }
    })


}

export default Kakao_Login;