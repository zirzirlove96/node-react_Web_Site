import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Kakao_Login()
{
    const current = window.location.href;
    //카카오 redirect_uri 코드
    let kakao_code = current.match('code=(.*)')[1];

    const LoginProcess = async() => {
        const headers = {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    
        const host = 'https://kauth.kakao.com';
        const res = await axios.post(`${host}/oauth/token?`+
            `grant_type=authorization_code&`+
            `client_id=${process.env.REACT_APP_REST_AUTHAPI}&`+
            `redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&`+
            `code=${kakao_code}&`+
            `client_secret=${process.env.REACT_APP_CLIENT_SECRETKEY}`
            , headers)
            .then(async function(res) {
            
                if(res.status === 200)
                {
                    const sessionStorage = window.sessionStorage;
                    sessionStorage.setItem('account_token', res.data.access_token); //인증키
                    sessionStorage.setItem('refresh_token', res.data.refresh_token);    //리프레시토큰
                    window.location.href = 'http://localhost:3000';
                }
            });
    }

    LoginProcess();

}

export default Kakao_Login;