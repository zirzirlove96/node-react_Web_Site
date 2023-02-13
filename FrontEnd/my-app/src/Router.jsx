import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import MainPage from "./page/MainPage";
import Kakao_Login from "./page/Kakao_Login";
import Logout from "./page/Logout";
import Kakao_Map from "./page/Kakao_Map";

function Router()
{
    return(
        <>
        <BrowserRouter>
            <Routes>       
                <Route path="/" element={<MainPage/>}/>     
                <Route path="/Login" element={<Login/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/Kakao_Login" element={<Kakao_Login/>}/>
                <Route path="/Logout" element={<Logout/>}/>
                <Route path="/Kakao_Map" element={<Kakao_Map/>}/>
            </Routes>
        </BrowserRouter>
        </>
    );

}

export default Router;