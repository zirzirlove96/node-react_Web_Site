import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() 
{
    const sessionStorage = window.sessionStorage;
    const navigation = useNavigate();

    console.log(sessionStorage.getItem('access_token'));
    sessionStorage.clear();
    //세션 삭제
    navigation("/");
}

export default Logout;