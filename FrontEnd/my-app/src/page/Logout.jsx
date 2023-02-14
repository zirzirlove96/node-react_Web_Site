import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() 
{
    const sessionStorage = window.sessionStorage;
    const navigation = useNavigate();

    sessionStorage.clear();
    if(sessionStorage.getItem("access_token") === ""){
        //세션 삭제
        navigation("/");
    }
}

export default Logout;