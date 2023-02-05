import React,{useState} from "react";
import styled from "styled-components";
import Menu from "../component/Menu.jsx";
import Input from "../component/Input.jsx";
import Button from "../component/Button.jsx";
import axios from "axios";
import crypto from 'crypto-js';
import { useNavigate } from "react-router-dom"; //react-router-dom은 특정 행동을 했을 때 해당 주소로 이동

function Login()
{
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const secret_key = "Qsj23missdaxX2BjyskV6bs&adada6ds";

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
                navigate("/");
            }
        }
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
export default Login;