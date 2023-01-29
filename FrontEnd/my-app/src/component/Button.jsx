import styled from "styled-components";

styled.Button`

`;

const Button = ({props}) => {
    return (
        <>
            <button name={props.name}>{props.value}</button>
        </>
    )
}

export default Button;