import {Link} from "react-router-dom";  //Link는 특정 주소로 이동해주는 태그
import styled from "styled-components";
import React from "react";

const MenuStyled = styled.div`
outline: 1px;
background: #f9f9f9;

> ul {
    height: 100px;

    >li
    {
        list-style:none;
        line-height:90px;
        float:left;
        text-align: center;
        font-size: 24px;
        font-weigth: 1000;
        font-family: "Montserrat", sans-serif;

        >.link
        {
            text-decoration: none;
            color: #8f8f8f;
            display: block;
            font-family: "Montserrat", sans-serif;
            &:hover
            {
                text-decoration: none;
                color: black;        
            }
        }

    }

    >.li1
    {
        width: 50%;
    }
    >.li2 
    {
        width: 30%;
        margin-left: 20px;
    }
}
`;

const Menu = () => {
    const sessionStorage = window.sessionStorage;
    return (
        <>
        {   sessionStorage.getItem('account_token') !== null ? (
            <MenuStyled>
                <ul>
                    <li class="li1">
                        <Link to="/Login" className="link">로그인</Link>
                    </li>
                    <li class="li1">
                        <Link to="/" className="link">홈화면</Link>
                    </li>
                </ul>
            </MenuStyled> ) : (
                        <MenuStyled>
                            <ul>
                                <li class="li2">
                                    <Link to="/SignUp" className="link">회원가입</Link>
                                </li>
                                <li class="li2">
                                    <Link to="/Login" className="link">로그인</Link>
                                </li>
                                <li class="li2">
                                    <Link to="/" className="link">홈화면</Link>
                                </li>
                            </ul>
                        </MenuStyled>
            )
        }
        </>
    )
}

export default Menu;