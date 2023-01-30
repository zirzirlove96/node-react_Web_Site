import styled from "styled-components";


const Input = (props) => {

    return (
        <Input_Styled {...props}></Input_Styled>
    );
}

const Input_Styled = styled.input`
    height: 40px;
`;

export default Input;