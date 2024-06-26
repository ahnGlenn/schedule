import { Link, useNavigate } from 'react-router-dom';

function LeftMenu(){

    const navigate = useNavigate(); // useNavigate 훅 사용

    // -----------------------------
    // logout
    // -----------------------------
    const handleLogout = () => {
        alert("are you sure?");
    }
    
    return(
        <div className="main_leftMenu">
            <nav className="nav-menu">
                <ul>
                    <li>Calendar</li>
                    <li>Wish list</li>
                    <li>Utils</li>
                    <li>Photo</li>
                    <li>Video</li>
                </ul>
            </nav>
            <div className="logout">
                <Link to="/LoginPage">Logout-in</Link>
            </div>
        </div>
    )
}

export default LeftMenu;