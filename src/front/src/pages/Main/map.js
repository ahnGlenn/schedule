import React, { useCallback, useEffect, useRef } from "react";

function Map() {
    const mapRef = useRef(null);

    //----------------------------
    var nightModeStyle = [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }]
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
        }
    ];

    const initMap = useCallback(() => {
        new window.google.maps.Map(mapRef.current, {
            center: { lat: 37.5665, lng: 126.9780 },
            zoom: 11,
            styles: nightModeStyle,
            mapTypeControl: false  // 지도, 위성 버튼 제거
        });
    }, [mapRef]);

    useEffect(() => {
        initMap();
    }, [initMap]);

    return (
        <div className="mapCp2">
            <div className="mapTittle">
                <span>Wish List</span>
            </div>
            <div style={{width:'480px'}}>
                <div className="map"
                     style={{
                                width: "100%",
                                height: "370px",
                            }}
                     ref={mapRef}>
                </div>
            </div>
            <div className="mapList">
                <table className="mapList_contents">
                    <tbody>
                        <tr>
                            <th rowSpan="2" style={{fontSize: '30px', padding: '15px'}}>1</th>
                            <td style={{fontSize: '20px', textAlign: "left", fontWeight: "bolder"}}>백종원의 골목식당<span
                                className="goDate">[12/22]</span></td>
                        </tr>
                        <tr>
                            <td style={{fontSize: '15px', textAlign: "left"}}>
                                냉동삼겹살이 맛있는 집으로 소문나있음. 꼭가봐야해서 저장
                                <hr className="splitLine" style={{color: '#c3c3c3', width: '100%'}}/>
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan="2" style={{fontSize: '30px', padding: '15px'}}>2</th>
                            <td style={{fontSize: '20px', textAlign: "left", fontWeight: "bolder"}}>백종원의 골목식당<span
                                className="goDate">[12/22]</span></td>
                        </tr>
                        <tr>
                            <td style={{fontSize: '15px', textAlign: "left"}}>
                                냉동삼겹살이 맛있는 집으로 소문나있음. 꼭가봐야해서 저장
                                <hr className="splitLine" style={{color: '#c3c3c3', width: '100%'}}/>
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan="2" style={{fontSize: '30px', padding: '15px'}}>3</th>
                            <td style={{fontSize: '20px', textAlign: "left", fontWeight: "bolder"}}>백종원의 골목식당<span
                                className="goDate">[12/22]</span></td>
                        </tr>
                        <tr>
                            <td style={{fontSize: '15px', textAlign: "left"}}>
                                냉동삼겹살이 맛있는 집으로 소문나있음. 꼭가봐야해서 저장
                                <hr className="splitLine" style={{color: '#c3c3c3', width: '100%'}}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Map;