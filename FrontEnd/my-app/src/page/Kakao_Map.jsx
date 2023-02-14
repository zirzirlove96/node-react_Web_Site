import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const {kakao} = window;
function Kakao_Map() {

    const [address, setAddress] = useState('');
    const [place, setPlace] = useState('');
    const [place2, setPlace2] = useState('');
    const navigation = useNavigate();

    const textHandler = (e) => 
    {
        if(e.target.classList.value === "address_name2")
        {
            setPlace2(e.target.value);
        }
        else if(e.target.classList.value === "address")
        {
            setAddress(e.target.value);
        }
    }

    // 주소 저장하여 회원가입 페이지로 이동
    const SaveBtn = (e) => {
        e.preventDefault();
        //주소 + 상세주소 저장
        if(e.target.classList.value.includes("address_save")){
            let address_total = place + " " + place2;
            
            navigation("/SignUp", {state: {value:address_total}})
        }
    }

    useEffect(()=>{
        // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
        var infowindow = new kakao.maps.InfoWindow({zIndex:1});
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };  

        // 지도를 생성합니다    
        var map = new kakao.maps.Map(mapContainer, mapOption); 

        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places(); 

        // 키워드로 장소를 검색합니다
        ps.keywordSearch(address, placesSearchCB); 

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();

            for (var i=0; i<data.length; i++) {
                displayMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }          

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
            } 
        }

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
    
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            //LatLng는 카카오에서 제공하는 메소드
            position: new kakao.maps.LatLng(place.y, place.x) 
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            console.log(place.address_name);
            //찾은 주소 useState
            setPlace(place.address_name);
            infowindow.open(map, marker);
        });
        }
    }, [address]);

    return (
        <>  
            <OUTER_DIV>
                <INNER_DIV>
                    <FORM_STYLED>
                        <div><span>주소 찾기</span></div>
                        <input className="address" onChange={textHandler} style={{width: "300px"}}></input><br/><br/>
                        <div id="map" style={{width:"680px",height:"400px"}}></div><br/>
                        주소 : <input type="text" className="address_name1" value={place} style={{width: "300px;"}}></input><br/>
                        상세주소 : <input className="address_name2" onChange={textHandler} style={{width: "300px;"}}></input> &nbsp; 
                        <button className="address_save" onClick={SaveBtn} >저장</button>
                    </FORM_STYLED>
                </INNER_DIV>
            </OUTER_DIV>
        </>
    )
}

const OUTER_DIV = styled.div`
    display: flex;
    justify-content: center;
    height: 550px;
` ;

const INNER_DIV = styled.div`
    border: 2px solid Lightgray;
    background-color: white;
    border-radius: 10px;
    padding: 0px;
    width: 800px;
    height: 600px;
    margin: auto;
`;

const FORM_STYLED = styled.form`
    margin-left: 60px;
    margin-right: 60px;
    margin-top: 30px;
    margin-bottom: 50px;
    height: 400px;
`;

export default Kakao_Map;