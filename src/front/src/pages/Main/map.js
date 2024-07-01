import React, { useCallback, useRef, useState, useEffect } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import Modal from "react-modal";
import axios from "axios";
import {nightModeStyle ,getCustomStyles} from "../common/common1";

// -----------------------------
// .env에서 GOOGLE_MAP_API_KEY 호출
// -----------------------------
const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

function Map({wishListData, fetchWishListData}) {
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);  // for marker on the map
    const searchBoxRef = useRef(null); // for searchBox on the map
    const [selectedPlace, setSelectedPlace] = useState(null); // information about selected place
    const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 }); // latitude & longitude for Center(seoul)

    // 지도 save모달
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    // const [website, setWebsite] = useState(null);
    const [rating, setRating] = useState(null);
    const [totalRating, setTotalRating] = useState(null);
    const [memo, setMemo] = useState('');
    // const [placePhoto, setPlacePhoto] = useState(null);



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
                // 대표 사진 URL 생성 및 설정
                // if (place.photos && place.photos.length > 0) {
                //     const photoReference = place.photos[0].photo_reference;
                //     const apiKey = 'xxx'; // 실제 API 키로 대체
                //     const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
                //     setPlacePhoto(photoUrl);
                // }
                setName(place.name); // 장소명
                setAddress(place.formatted_address); // 장소 주소
                setLatitude(place.geometry.location.lat()); // 위도 좌표
                setLongitude(place.geometry.location.lng()); // 경도 좌표
                setPhoneNumber(place.formatted_phone_number); // 전화번호
                setRating(place.rating); // 평균 별점임.(reviews>rating)은 개인 별점.
                setTotalRating(place.user_ratings_total); // user_ratings_total
            } else {
                console.error('Error fetching place details:', status);
            }
        });
    }, [selectedPlace]);


    // -----------------------------
    // 예시 데이터: 각 장소의 위치(위도, 경도)를 배열로 저장
    // -----------------------------
    // const locations = [
    //     { id: 1, lat: 37.5665, lng: 126.9780, name: 'Seoul' },
    //     { id: 2, lat: 40.7128, lng: -74.0060, name: 'New York' },
    //     { id: 3, lat: 51.5074, lng: -0.1278, name: 'London' },
    //     // 원하는 만큼 추가할 수 있습니다......
    // ];


    // -----------------------------
    // map에서 wishList를 저장하는 작업
    // -----------------------------
    const saveWishList = async () => {
        try {
            const response = await axios.post("/api/wishList/save", {
                name: name,
                address: address,
                latitude: latitude,
                longitude: longitude,
                phoneNumber: phoneNumber,
                rating: rating,
                totalRating: totalRating,
                memo: memo
            });
            const result = response.data;
            if(result === 1) {
                setModalIsOpen(false);
                fetchWishListData(); // 새로고침 없이 새로운 데이터로 캘린더 업데이트
            }else{
                alert("failed");
            }

        } catch(error) {
            console.error("오류 발생:", error);
        }
    }


    // -----------------------------
    // address 데이터 등록
    // -----------------------------
    const handleAddressChange = (event) => {
        const address = event.target.value;
        setAddress(address);
    };
    // -----------------------------
    // memo 데이터 등록
    // -----------------------------
    const handleMemoChange = (event) => {
        const memo = event.target.value;
        setMemo(memo);
    };
    
    // -----------------------------
    // common1.jsx : 공통 모달창 스타일 호출
    // -----------------------------
    const customStyles = getCustomStyles('map');



    return (
        <LoadScript googleMapsApiKey={googleMapApiKey} libraries={["places"]}>
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
                        {wishListData.map((item, index) => (
                            <tr key={index}>
                                <td style={{
                                    color: '#FF7676',
                                    fontSize: '18px',
                                    textAlign: "left",
                                    fontWeight: "bolder",
                                    padding: '15px'
                                }}>
                                    {index + 1}. {item.name} <span
                                    className="list_info2">{item.rating}&nbsp;({item.totalRating}) : {item.memo}</span>
                                    <hr className="splitLine" style={{color: '#c3c3c3', width: '100%'}}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <Modal isOpen={modalIsOpen} style={customStyles}>
                <div style={{flex: '1'}}>{/* 부모div에 자식div가 딱 맞게 */}
                    <div className="modal_head">
                        {/*
                        <div>
                            <img id="place-photo" src={placePhoto} alt="Place photo" />
                        </div>
                        */}
                        <h1>
                            <span className="date">{name}</span>
                        </h1>
                        <h3>
                            <span id="rating"><span id="rating_star"></span>&nbsp;{rating}</span>
                            <span id="totalRating">&nbsp;({totalRating})</span>
                            <span id="callNum">&nbsp;&nbsp;{phoneNumber}</span>
                        </h3>
                        <input type="hidden" name="address" value={name} />
                    </div>
                    <div className="modal_body">
                        <div>
                            <label>address &nbsp;&nbsp;&nbsp;</label>
                            <div>
                                <span className="_input" id="address" onChange={handleAddressChange} >{address}</span>
                                <input type="hidden" name="address" value={address} />
                            </div>
                        </div>
                        <br />
                        <div>
                            <label>memo &nbsp;&nbsp;&nbsp;</label>
                            <div>
                                <select id="categories" >
                                    <option>restaurant</option>
                                    <option>todoPlace</option>
                                    <option>just</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div>
                            <label>memo &nbsp;&nbsp;&nbsp;</label>
                            <div>
                                <textarea className="modal_textArea" id="memo" onChange={handleMemoChange} maxLength="33"></textarea>
                            </div>
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