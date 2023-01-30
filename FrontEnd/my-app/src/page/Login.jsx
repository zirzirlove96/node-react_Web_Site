import React,{useState} from "react";
import Menu from "../component/Menu.jsx";
import Input from "../component/Input.jsx";

function Login()
{
    const [login, setLogin] = useState('');
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const textHandler = (e) => {
        if(e.target.classList.value === "id")
        {
            setId(e.target.value);
        }
        else if(e.target.classList.value === "pw")
        {
            setPw(e.target.value);            
        }
    }

    return (
        <>
            <Menu></Menu>
            <div class="outer-div2">
                <div class="inner-div2"> 
                    <form>
                        <span id="title">로그인</span><br/><br/>
                        <span id="title2">아이디 : </span><input type="text" name="id" onChange={textHandler} placeholder="ID를 입력해주세요."></input><br/><br/>
                        <span id="title2">비밀번호 : </span><input type="password" name="pw" onChange={textHandler} placeholder="PASSWORD를 입력해주세요."></input><br/><br/>
                        <button>로그인</button>
                    </form>
                </div>
            </div>
        </>
    )

}

export default Login;