import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode"; //다음 카카오에서 제공하는 우편번호 api
import {Modal} from "antd";

const Kakao_Map = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    
    //닫기 역할
    const onToggleModal = () => {
        setIsOpen((prev) => !prev);
    };

    const onCompletePost = (data) => {
        let fullAddr = data.address;
        let extraAddr = '';
    
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
        }
        
        // 상위 컴포넌트로 값 전달
        props.propFunc(fullAddr);
        onToggleModal();
    };


    return (
        <>
        {isOpen && (<Modal open={isOpen} onOk={onToggleModal} onCancel={onToggleModal}>
            <DaumPostcode autoClose onComplete={onCompletePost}/>
        </Modal>)}
        </>
    );
}

export default Kakao_Map;