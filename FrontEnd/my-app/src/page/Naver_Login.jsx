import axios from "axios";

function Naver_Login()
{
    const current = window.location.href;
    //카카오 redirect_uri 코드
    let naver_code = current.match('code=(.*)')[1];
    console.log(naver_code);

    const LoginProcess2 = async() => {
        //인증토큰 발급 받고, 사용자를 확인하기 위해 서버로 이동
        const res = await axios.post('http://localhost:5050/api/Nauth', {
            client_id : process.env.REACT_APP_NAVER_CLIENT_ID,
            redirect_uri : process.env.REACT_APP_NAVER_REDIRECT_URI,
            code : naver_code,
            client_secret : process.env.REACT_APP_NAVER_CLIENT_SECRET
        });

        if(res.status === 200)
        {
            const sessionStorage = window.sessionStorage;
            sessionStorage.setItem('account_token', res.data); //session 저장
            window.location.href = 'http://localhost:3000';
        }
    }

    LoginProcess2();

}

export default Naver_Login;