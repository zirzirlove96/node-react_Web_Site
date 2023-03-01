import React from "react";
import axios from "axios";

function Kakao_Login()
{
    const current = window.location.href;
    //카카오 redirect_uri 코드
    let kakao_code = current.match('code=(.*)')[1];

    const LoginProcess = async() => {
        
        //인증토큰 발급 받고, 사용자를 확인하기 위해 서버로 이동
        const res = await axios.post('httpS://localhost:5050/api/kauth', {
            client_id : process.env.REACT_APP_REST_AUTHAPI,
            redirect_uri : process.env.REACT_APP_REDIRECT_URI,
            code : kakao_code,
            client_secret : process.env.REACT_APP_CLIENT_SECRETKEY
        });
    }

    LoginProcess();

}

export default Kakao_Login;