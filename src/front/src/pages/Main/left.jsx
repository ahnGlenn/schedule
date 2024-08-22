import { Link, useNavigate } from 'react-router-dom';

function LeftMenu() {
    const handleLogout = () => {
        alert("Are you sure?");
    }

    const navigate = useNavigate();
    const handleRefreshPage = (event) => {
    // 아래 새로고침 안하고 일반 링크태그로 이동시 map api중복호출이므로 새로고침 안할 시 지도안보임.
        event.preventDefault(); // 링크의 기본 동작(페이지 이동)을 막습니다.
        navigate('/main/map', { replace: true }); // '/main/map' 경로로 이동합니다.
        window.location.reload(); // 페이지를 새로고침합니다.
    };

    return (
        <div className="main_leftMenu">
            <nav className="nav-menu">
                <ul>
                    <li><Link to="/main/calendar">Calendar</Link></li>
                    <li><Link to="/main/map" onClick={handleRefreshPage}>Wish list</Link></li>
                    <li><Link to="/main/">History</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default LeftMenu;