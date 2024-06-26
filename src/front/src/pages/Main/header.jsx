function Header(){

    // -----------------------------
    // logout
    // -----------------------------
    const handleLogout = () => {
        alert("are you sure?");
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