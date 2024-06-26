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
            <div class="logout">
                <nav class="nav-menu">
                    <ul>
                        <li>&lt;</li>
                        <li>&gt;</li>
                    </ul>
                </nav>
                <span onClick={handleLogout}>Logout</span>
            </div>
        </div>
    )
}

export default Header;