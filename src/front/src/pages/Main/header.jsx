function Header(){

    // -----------------------------
    // logout
    // -----------------------------
    const handleLogout = () => {
        alert("are you sure?");
        localStorage.removeItem('accessToken'); // localStorage에서 토큰 삭제
        window.location.href = '/'; // 로그인 페이지로 리다이렉트
    }
    
    return(
        <div className="main_header">
            <div>Ours Desktop</div>
            <div className="logout">
                <span onClick={handleLogout}>Logout</span>
            </div>
        </div>
    )
}

export default Header;