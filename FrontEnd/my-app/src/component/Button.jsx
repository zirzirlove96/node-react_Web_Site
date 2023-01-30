import styled from "styled-components";

const BUTTON_STYLED = styled.button`
    border-radius: 3px;
    border: 1px solid #f37262;
    background-color: #f37262;
    font-family: "Montserrat", sans-serif;
    width: 200px;
    height: 50px;
    font-size: 25px;
    &:hover{  
        background-color: 	#F08080;
        color : black;
    }
`;

const Button = (props) => {
    return (
        <>
            <BUTTON_STYLED {...props}>{props.value}</BUTTON_STYLED>
        </>
    )
}

export default Button;