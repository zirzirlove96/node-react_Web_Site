import React,{useState} from "react";
import styled from "styled-components";
import Menu from "../component/Menu.jsx";
import Input from "../component/Input.jsx";
import Button from "../component/Button.jsx";
import axios from "axios";
import crypto from 'crypto-js';
import { useNavigate } from "react-router-dom"; //react-router-dom은 특정 행동을 했을 때 해당 주소로 이동
import kakao_login from "../style/kakao_login_large_narrow.png";
import naver_login from "../style/naver_login_Icon.png";
import google_login from "../style/btn_google_signin_dark_pressed_web.png";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

function Login()
{
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const secret_key = process.env.REACT_APP_SECRETKEY;
    var session = window.sessionStorage;

    if(session.account_token !== ""){
        session.clear();
    }

    const textHandler = (e) => {
        if(e.target.classList.value.includes("id"))
        {
            setId(e.target.value);
        }
        else if(e.target.classList.value.includes("pw"))
        {
            setPw(e.target.value);            
        }
    }

    const LoginProcess = async(e) => {
        e.preventDefault();
        
        const encrypt_pw = crypto.AES.encrypt(pw, secret_key).toString();
        const res = await axios.post("http://localhost:5050/api/Login", {
            id : id,
            pw : encrypt_pw
        });
        if(res.status === 200)
        {
            if(res.data.includes("실패"))
            {
                alert("아이디 비밀번호를 다시 한번 확인해주세요.");
            }
            else
            {
                
                alert("로그인 완료");
                const Loginsession = window.sessionStorage;
                Loginsession.setItem('account_token', res.data); //인증키
                navigate("/");
            }
        }
    }

    //카카오로그인
    const Kakao_LoginProcess = async(e) => {

        const url = 'https://kauth.kakao.com/oauth/authorize?client_id='+
                    process.env.REACT_APP_REST_AUTHAPI +
                    '&redirect_uri='+
                    process.env.REACT_APP_REDIRECT_URI+
                    '&response_type=code&'+
                    'scope=account_email,birthday,gender&'+
                    'prompt=login';
        
        //페이지로 이동
        window.location.href = url;        
    }

    //네이버로그인
    const Naver_LoginProcess = async(e) => {

        const url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code'+
                    '&client_id='+
                    process.env.REACT_APP_NAVER_CLIENT_ID+
                    '&redirect_uri='+
                    process.env.REACT_APP_NAVER_REDIRECT_URI+
                    '&state=jiyoung123';
        
        //페이지로 이동
        window.location.href = url;
    }

    //네이버로그인
    const Google_LoginProcess = async(e) => {
        const url = 'https://accounts.google.com/o/oauth2/v2/auth?'+
                    '&scope=https://www.googleapis.com/auth/userinfo.email'+
                    '&response_type=code'+
                    '&client_id='+
                    process.env.REACT_APP_GOOGLE_CLIENT_ID+
                    '&redirect_uri='+
                    process.env.REACT_APP_GOOGLE_REDIRECT_URI+
                    '&state=jiyoung123';
        
        //페이지로 이동
        window.location.href = url;
    }

    return (
        <>
            <Menu></Menu>
            <div class="outer-div2">
                <div class="inner-div2"> 
                    <form>
                        <span id="title">로그인</span><br/><br/>
                        <span id="title2">아이디 : </span><Input type="text" className="id" onChange={textHandler} placeholder="ID를 입력해주세요."></Input><br/><br/>
                        <span id="title2">비밀번호 : </span><Input type="password" className="pw" onChange={textHandler} placeholder="PASSWORD를 입력해주세요."></Input><br/><br/>
                        <br/>
                        <BUTTON_STYLED name="Login" onClick={LoginProcess} value="Login"></BUTTON_STYLED>
                        <IMG_STYLED src={kakao_login} onClick={Kakao_LoginProcess}></IMG_STYLED>
                        <IMG_STYLED2 src={naver_login} onClick={Naver_LoginProcess}></IMG_STYLED2>
                        {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                            <GoogleLogin onSuccess={(res)=>{console.log(res);}}></GoogleLogin>
                        </GoogleOAuthProvider>             */}
                        <IMG_STYLED3 src={google_login} onClick={Google_LoginProcess}></IMG_STYLED3>
                    </form>
                </div>
            </div>
        </>
    )

}

const BUTTON_STYLED = styled(Button)`
    width: 150px;
    margin-left: 250px;
    position: absolute;
`;

const IMG_STYLED = styled.img`
    width: 200px;
    margin-left: 230px;
    margin-top: 80px;
    position: absolute;
`;

const IMG_STYLED2 = styled.img`
    width: 80px;
    margin-left: 140px;
    margin-top: 70px;
    position: absolute;
`;

const IMG_STYLED3 = styled.img`
    width: 100px;
    margin-left: 450px;
    margin-top: 100px;
    position: absolute;
`;
export default Login;