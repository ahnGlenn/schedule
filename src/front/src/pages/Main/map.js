import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import Modal from "react-modal";
import axios from "axios";

function Map() {
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);  // for marker on the map
    const searchBoxRef = useRef(null); // for searchBox on the map
    const [selectedPlace, setSelectedPlace] = useState(null); // information about selected place
    const [center, setCenter] = useState({ // latitude & longitude for Center(seoul)
        lat: 37.5665,
        lng: 126.9780,
    });

    // 지도 save모달
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);

    // -----------------------------
    // map size(mapContainerStyle을 이용해 GoogleMap 컨테이너 스타일링:)
    // -----------------------------
    const mapContainerStyle = {
        height: "370px",
        width: "150%",
    };


    // -----------------------------
    // CSS for nightModeStyle
    // -----------------------------
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


    // -----------------------------
    // useEffect에서 직접적으로 지도를 초기화하는 부분을 제거하고,
    // GoogleMap 컴포넌트의 onLoad를 이용해 초기화.
    // -----------------------------
    const onLoadMap = useCallback((map) => {
        mapRef.current = map;
    }, []);


    const onLoadSearchBox = useCallback((ref) => {
        searchBoxRef.current = ref;
    }, []);


    const onPlacesChanged = useCallback(() => {

        if (!searchBoxRef.current || !searchBoxRef.current.getPlaces) {
            return;
        }

        const places = searchBoxRef.current.getPlaces();
        if (!places || places.length === 0) { // places가 undefined 또는 null인 경우 처리
            return;
        }

        const bounds = new window.google.maps.LatLngBounds();

        const newMarkers = places.map((place) => {
            if (!place.geometry || !place.geometry.location) return null;

            const position = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };

            bounds.extend(position);

            return {
                position,
                title: place.name,
            };
        }).filter(marker => marker !== null);

        setMarkers(newMarkers);

        if (newMarkers.length > 0) {
            const { lat, lng } = newMarkers[0].position;
            setCenter({ lat, lng });
            if (mapRef.current) {
                mapRef.current.setZoom(15);
            }
        } else if (mapRef.current) {
            mapRef.current.fitBounds(bounds);
        }

        // Set selected place to the first result for simplicity
        setSelectedPlace(places[0]);
    }, []);


    // -----------------------------
    // 선택한 장소의 정보 상세정보 가져오기(별점, 리뷰, 번호 등)
    // Fetch additional details for selected place
    // -----------------------------
    const fetchPlaceDetails = useCallback(() => {
        if (!selectedPlace || !selectedPlace.place_id) {
            return;
        }

        const service = new window.google.maps.places.PlacesService(mapRef.current);

        console.log("selectedPlace : " + selectedPlace);

        service.getDetails({
            placeId: selectedPlace.place_id,
        }, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                // 여기서 place 객체에 선택한 장소의 세부 정보가 포함됩니다.
                // place 객체에서 필요한 데이터 (리뷰, 별점, 가격 등)를 가져와 활용할 수 있습니다.
                console.log('Place details:', JSON.stringify(place));
                // console.log('Place name:', place.name , '\n', );


                // 모달창에 정보 출력
                setModalIsOpen(true); // 모달 on
                setName(place.name); // 장소명
                setAddress(place.formatted_address); // 장소 주소

            } else {
                console.error('Error fetching place details:', status);
            }
        });
    }, [selectedPlace]);


    // -----------------------------
    // 예시 데이터: 각 장소의 위치(위도, 경도)를 배열로 저장
    // -----------------------------
    const locations = [
        { id: 1, lat: 37.5665, lng: 126.9780, name: 'Seoul' },
        { id: 2, lat: 40.7128, lng: -74.0060, name: 'New York' },
        { id: 3, lat: 51.5074, lng: -0.1278, name: 'London' },
        // 원하는 만큼 추가할 수 있습니다......
    ];


    // -----------------------------
    // map에서 wishList를 저장하는 작업
    // -----------------------------
    const saveWishList = async () => {
        // try {
        //     const response = await axios.post("/api/schedule/save", {
        //         startDate: startDate,
        //         endDate: endDate,
        //         title: title,
        //         memo: memo
        //     });
        //     const result = response.data;
        //     if(result === 1) {
        //         setModalIsOpen(false);
        //         fetchScheduleData(); // 새로고침 없이 새로운 데이터로 캘린더 업데이트
        //     }else{
        //         alert("failed");
        //     }
        //
        // } catch(error) {
        //     console.error("오류 발생:", error);
        // }
    }
    
    // -----------------------------
    // modal style setting
    // -----------------------------
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

    return (
        <LoadScript googleMapsApiKey="AIzaSyBtTC0UAZQ7v34JpqiG63iYRVgCS1UpfUg" libraries={["places"]}>
            <div className="mapCp2">
                <div className="mapTittle">
                    <span>Wish List</span>
                </div>
                <div className="map-container">
                    <StandaloneSearchBox onLoad={onLoadSearchBox} onPlacesChanged={onPlacesChanged} >
                        <input className="search-box" type="text" placeholder="Search place...." />
                    </StandaloneSearchBox>
                    <GoogleMap
                        mapContainerClassName="map-container"
                        zoom={11}
                        center={center}
                        onLoad={onLoadMap}
                        options={{
                            styles: nightModeStyle,
                            mapTypeControl: false,
                        }}
                    >
                        {markers.map((marker, index) => (
                            <Marker key={index} position={marker.position} title={marker.title}
                                    onClick={fetchPlaceDetails}
                                    icon={{
                                        url: '/images/map_marker_star.png', // 사용자 정의 마커 이미지 경로 설정
                                        scaledSize: new window.google.maps.Size(40, 40), // 이미지 크기 조정
                                        origin: new window.google.maps.Point(0, 0), // 이미지의 원점 설정
                                        anchor: new window.google.maps.Point(20, 40), // 마커의 기준점(정중앙 아래) 설정
                                    }}
                            />
                        ))}

                        {/*{locations.map((location) => (
                            <Marker
                                key={location.id}
                                position={{ lat: location.lat, lng: location.lng }}
                                title={location.name} // 마커에 툴팁으로 표시될 이름 설정
                                icon={{
                                    url: customMarkerImage, // 사용자 정의 마커 이미지 경로 설정
                                    scaledSize: new window.google.maps.Size(40, 40), // 이미지 크기 조정
                                    origin: new window.google.maps.Point(0, 0), // 이미지의 원점 설정
                                    anchor: new window.google.maps.Point(20, 40), // 마커의 기준점(정중앙 아래) 설정
                                }}
                            />
                        ))}*/}
                    </GoogleMap>
                </div>
                <div className="mapList">
                    <table className="mapList_contents">
                        <tbody>
                        <tr>
                            <th rowSpan="2" style={{fontSize: '30px', padding: '15px'}}>1</th>
                            <td style={{fontSize: '20px', textAlign: "left", fontWeight: "bolder"}}>
                                백종원의 골목식당
                                <span className="goDate">[12/22]</span>
                            </td>
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


            <Modal isOpen={modalIsOpen} style={customStyles}>
                <div style={{flex:'1'}}>{/* 부모div에 자식div가 딱 맞게 */}
                    <div className="modal_head">
                        <h1><span className="date">{name}</span></h1>
                    </div>
                    <div className="modal_body">
                        <div>
                            <label>Name </label>
                            <input className="_input" id="name" type="text" value={name}/>
                        </div>
                        <div>
                            <label>Address </label>
                            <input className="_input" id="address" type="text" value={address}/>
                        </div>
                    </div>
                    <div className="modal_foot">
                        <div className="form-elements">
                            <div className="form-element">
                            <button onClick={saveWishList}>save</button>
                                <button onClick={()=> setModalIsOpen(false)}>close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </LoadScript>
    );
};

export default Map;