import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() 
{
    const sessionStorage = window.sessionStorage;
    const navigation = useNavigate();

    sessionStorage.clear();
    //세션 삭제
    window.location.href="/";
}

export default Logout;