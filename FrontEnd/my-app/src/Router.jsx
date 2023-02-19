import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import MainPage from "./page/MainPage";
import Kakao_Login from "./page/Kakao_Login";
import Logout from "./page/Logout";

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
            </Routes>
        </BrowserRouter>
        </>
    );

}

export default Router;