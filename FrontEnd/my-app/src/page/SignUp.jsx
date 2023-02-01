import React,{useState} from "react";
import axios from "axios";
import styled from "styled-components";
import Menu from "../component/Menu.jsx";
import Button from "../component/Button.jsx";
import Input from "../component/Input";

function SignUp()
{
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [securityNum, setsecurityNum] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    let page = false;

    const textHandler = (e) => {
        console.log(e.target);
        if(e.target.classList.value.includes("id"))
        {
            setId(e.target.value);
        }
        else if(e.target.classList.value.includes("pw"))
        {
            setPw(e.target.value);            
        }
        else if(e.target.classList.value.includes("name"))
        {
            setName(e.target.value);            
        }
        else if(e.target.classList.value.includes("securityNum"))
        {
            setsecurityNum(e.target.value);            
        }
        else if(e.target.classList.value.includes("address"))
        {
            setAddress(e.target.value);            
        }
        else if(e.target.classList.value.includes("phoneNumber"))
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
            identity: securityNum,
            address: address,
            phoneNumber: phoneNumber
        });

        console.log(res);
        if(res.status === "200"){
            page = true;
        }
        else{
            alert(res.data);
        }
    }

    return(
        <>
        <Menu></Menu>
        {page === false ? (
        <div class="outer-div">
            <div class="inner-div">                
                <form>
                <span id="title">회원가입</span>
                    <br/><br/><br/>
                    <span id="title2">이름 : </span><INPUT_STYLED type="text" className="name" onChange={textHandler} placeholder="이름를 입력하세요."></INPUT_STYLED><br/><br/>
                    <span id="title2">주민번호 : </span><INPUT_STYLED2 type="text" className="securityNum" onChange={textHandler} placeholder="주민번호를 입력하세요."></INPUT_STYLED2><br/><br/>
                    <span id="title2">아이디 : </span><INPUT_STYLED type="text" className="id" onChange={textHandler} placeholder="아이디를 입력하세요."></INPUT_STYLED><br/><br/>
                    <span id="title2">비밀번호 : </span><INPUT_STYLED type="password" className="pw" onChange={textHandler} placeholder="비밀번호를 입력하세요."></INPUT_STYLED><br/><br/>
                    <span id="title2">주소 : </span><INPUT_STYLED3 type="text" className="address" onChange={textHandler} placeholder="주소를 입력하세요."></INPUT_STYLED3><br/><br/>
                    <span id="title2">핸드폰 번호 : </span><INPUT_STYLED type="text" className="phoneNumber" onChange={textHandler} placeholder="핸드폰 번호를 입력하세요."></INPUT_STYLED><br/><br/>
                    <br/>
                    <BUTTON_STYLED name="SignUp" onClick={signUpProcess} value="SingUp">회원가입하기</BUTTON_STYLED>
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

const BUTTON_STYLED = styled(Button)`
    width: 150px;
    margin-left: 290px;
    position: absolute;
`;

const INPUT_STYLED = styled(Input)`
    width: 200px;
    position: absolute;
    margin-left: 20px;
`;

const INPUT_STYLED2 = styled(Input)`
    width: 250px;
    position: absolute;
    margin-left: 20px;
`;

const INPUT_STYLED3 = styled(Input)`
    width: 450px;
    position: absolute;
    margin-left: 20px;
`;

export default SignUp;