import React,{useState} from "react";
import axios from "axios";
import Menu from "../component/Menu.jsx";

function SignUp()
{
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [identity, setIdentity] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    let page = false;

    const textHandler = (e) => {
        if(e.target.classList.value === "id")
        {
            setId(e.target.value);
        }
        else if(e.target.classList.value === "pw")
        {
            setPw(e.target.value);            
        }
        else if(e.target.classList.value === "name")
        {
            setName(e.target.value);            
        }
        else if(e.target.classList.value === "identity")
        {
            setIdentity(e.target.value);            
        }
        else if(e.target.classList.value === "address")
        {
            setAddress(e.target.value);            
        }
        else if(e.target.classList.value === "phoneNumber")
        {
            setPhoneNumber(e.target.value);            
        }
    }

    /*const signUpProcess = async(e) => {
        const res = fetch('http://localhost:5050/api/SignUp', {
            method: "POST",
            body: JSON.stringify({
                id: id,
                pw: pw,
                name: name,
                identity: identity,
                address: address,
                phoneNumber: phoneNumber
            })
            .then(response => response.json()) 
        });

        console.log(res);
    }*/

    const signUpProcess = async(event) => {
        event.preventDefault();
        const res = await axios.post('http://localhost:5050/api/SignUp', {
            id : id,
            pw : pw,
            name : name,
            identity: identity,
            address: address,
            phoneNumber: phoneNumber
        });

        console.log(res);
        if(res.status === "200"){
            page = true;
        }
    }

    return(
        <>
        <Menu></Menu>
        {page === false ? (
        <div class="outer-div">
            <div class="inner-div">                
                <form id="form">
                <span>회원가입</span>
                    <br/><br/><br/>
                    이름 : <input type="text" class="name" onChange={textHandler} placeholder="이름를 입력하세요."></input><br/>
                    주민번호 : <input type="text" class="identity" onChange={textHandler} placeholder="주민번호를 입력하세요."></input><br/>
                    아이디 : <input type="text" class="id" onChange={textHandler} placeholder="아이디를 입력하세요."></input><br/>
                    비밀번호 : <input type="password" class="pw" onChange={textHandler} placeholder="비밀번호를 입력하세요."></input><br/>
                    주소 : <input type="text" class="address" onChange={textHandler} placeholder="주소를 입력하세요."></input><br/>
                    핸드폰 번호 : <input type="text" class="phoneNumber" onChange={textHandler} placeholder="핸드폰 번호를 입력하세요."></input><br/>
                    <button name="SignUp" onClick={signUpProcess} value="SingUp">회원가입하기</button>
                </form>
            </div>
        </div>
        ) : (
            <div>
                <div>
                    <span>회원가입이 완료되었습니다.</span>
                    <p>{id}</p>
                </div>
            </div>
        )}   
        </>
    );

}

export default SignUp;