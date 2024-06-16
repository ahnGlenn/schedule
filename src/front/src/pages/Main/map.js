import React, { useCallback, useEffect, useRef, useState } from "react";

function Map() {
    const mapRef = useRef(null);
    const inputRef = useRef(null);
    const [map, setMap] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);

    // latitude & longitude
    //----------------------------
    var nightModeStyle = [
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

    // const initMap = useCallback(()   => {
    //     const map = new window.google.maps.Map(mapRef.current, {
    //         center: { lat: 37.5665, lng: 126.9780 },
    //         zoom: 11,
    //         styles: nightModeStyle,
    //         mapTypeControl: false
    //     });
    //
    //     setMap(map);
    // }, [mapRef]);

    const initMap = useCallback(() => {
        const googleMap = new window.google.maps.Map(mapRef.current, {
            center: { lat: 37.5665, lng: 126.9780 },
            zoom: 11,
            styles: nightModeStyle,
            mapTypeControl: false  // 지도, 위성 버튼 제거
        });
    }, [mapRef]);

    const initAutocomplete = useCallback(() => {
        if (!map) return; // map 객체가 설정되지 않은 경우 종료

        const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current);
        autocompleteInstance.bindTo('bounds', map);
        autocompleteInstance.setFields(['address_components', 'geometry', 'icon', 'name']);
        autocompleteInstance.addListener('place_changed', () => {
            const place = autocompleteInstance.getPlace();

            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
        });

        setAutocomplete(autocompleteInstance);
    }, [map, inputRef]);

    const handleSearch = () => {
        // if (!autocomplete || !map) return; // autocomplete 또는 map 객체가 설정되지 않은 경우 종료

        const place = autocomplete.getPlace();
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
    };

    useEffect(() => {
        if (!window.google) {
            console.error("Google Maps JavaScript API is not loaded.");
            return;
        }

        initMap();
    }, [initMap]);

    // useEffect(() => {
    //     if (!window.google) {
    //         console.error("Google Maps JavaScript API is not loaded.");
    //         return;
    //     }
    //
    //     initAutocomplete();
    // }, [map, initAutocomplete]);

    return (
        <div className="mapCp2">
            <div className="mapTittle">
                <span>Wish List</span>
            </div>
            <div style={{width:'480px'}}>
                <input
                    type="text"
                    placeholder="Search places..."
                    ref={inputRef}
                    style={{
                        boxSizing: 'border-box',
                        border: '1px solid transparent',
                        width: 'calc(100% - 40px)', // Adjust width to fit button
                        height: '32px',
                        padding: '0 12px',
                        borderRadius: '3px 0 0 3px', // Round left side only
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        fontSize: '14px',
                        outline: 'none',
                        textOverflow: 'ellipsis',
                        position: 'relative',
                        marginBottom: '12px'
                    }}
                />
                <button onClick={handleSearch} style={{
                    width: '40px',
                    height: '32px',
                    borderRadius: '0 3px 3px 0', // Round right side only
                    border: '1px solid transparent',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: '#fff',
                    cursor: 'pointer'
                }}>Go</button>
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