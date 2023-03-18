
function Logout() 
{
    const sessionStorage = window.sessionStorage;

    sessionStorage.clear();
    //세션 삭제
    window.location.href="/";
}

export default Logout;