import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import MainPage from "./page/MainPage";
import Kakao_Login from "./page/Kakao_Login"

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
            </Routes>
        </BrowserRouter>
        </>
    );

}

export default Router;