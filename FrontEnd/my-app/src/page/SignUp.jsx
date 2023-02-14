import React,{useState} from "react";
import axios from "axios";
import styled from "styled-components";
import Menu from "../component/Menu.jsx";
import Button from "../component/Button.jsx";
import Input from "../component/Input";
import crypto from 'crypto-js';
import { useNavigate, useLocation } from "react-router-dom";

function SignUp()
{
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [securityNum, setsecurityNum] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const secret_key = "Qsj23missdaxX2BjyskV6bs&adada6ds";
    const navigation = useNavigate();
    const location = useLocation();
    
    //useLocation을 통해 Kakao_Map에서 전달해준 값을 노출해주자!
    //*기존 페이지에서 useNavigate로 값을 전달하고 새로운 페이지에서 useLocation에서 값을 받아온다.
    //location.state.value
    console.log(location.state.value);

    let page = false;

    const textHandler = (e) => {
        if(e.target.classList.value.includes("id"))
        {
            setId(e.target.value);
        }
        else if(e.target.classList.value.includes("pw"))
        {
            const encrypted_pw = crypto.AES.encrypt(e.target.value, secret_key).toString();
            setPw(encrypted_pw);            
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

    const addressFind = (e) => {
        //카카오 지도 찾기로 가기
        navigation("/Kakao_Map");
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
                    <span id="title2">주소 : </span><INPUT_STYLED3 type="text" className="address" onChange={textHandler} placeholder="주소를 입력하세요." value={location.state.value}></INPUT_STYLED3><BUTTON_STYLED2 name='address_find' onClick={ addressFind } value="address">주소찾기</BUTTON_STYLED2><br/><br/>
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

const BUTTON_STYLED2 = styled(Button)`
    width: 100px;
    margin-left: 500px;
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