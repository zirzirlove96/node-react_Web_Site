import React,{useState} from "react";
import Menu from "../component/Menu.jsx";

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
            <div>
                <div></div>
                <span>로그인</span><br/><br/>
                아이디 : <input type="text" name="id" onChange={textHandler} placeholder="ID를 입력해주세요."></input><br/>
                비밀번호 : <input type="password" name="pw" onChange={textHandler} placeholder="PASSWORD를 입력해주세요."></input><br/>
                <button>로그인</button>
            </div>
        </>
    )

}

export default Login;