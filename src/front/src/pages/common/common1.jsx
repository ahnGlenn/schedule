/**
 * 날짜 포맷 변경
 * 2025.05.11 HH:mm:ss > 2025.05.11
 * @param dateString
 * @returns {string}
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월을 두 자리로 만들기
    const day = ('0' + date.getDate()).slice(-2); // 일을 두 자리로 만들기

    return `${month}-${day}`;
}



/**
 * 페이지별 모달창 스타일 양식 구현
 * @param page
 * @returns {{overlay: {backgroundColor: string, zIndex: number}, content: {border: string, color: string, bottom: string, display: string, right: string, marginRight: string, transform: string, fontFamily: string, borderRadius: string, top: string, left: string, background: string, width: string, fontWeight: string, height: string}}}
 */
export const getCustomStyles = (page) => {
    const customStyles = {
        content: {
            display:'flex', color:'#f1575b', background:'#272829', borderRadius: '20px',
            width: '500px', height: '350px', top: '50%', left: '50%', right: 'auto',
            bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', border:'0', fontWeight: 'bolder', fontFamily:'',
        },
        overlay: {
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.75)'}
    };

    // Customize styles based on the page
    if (page === 'calendar') {
        customStyles.content.height = '350px';
    } else if (page === 'map') {
        customStyles.content.background = '#abcdef';
    }

    return customStyles;
};



/**
 *  map.js에 지도 dark mode CSS (공통은 아님)
 */
export  var nightModeStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
    { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
    { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
    { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
    { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
    { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
    { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] }
];