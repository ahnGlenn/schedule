import Header from './header';
import Calendar from './calendar';
import React, {useEffect, useState} from "react";
import Currency from "../../components/Currency/Currency";
import Map from "../Main/map";
import LeftMenu from "./left";
import { Routes, Route } from 'react-router-dom';
import instance from "../../axios"; // 생성한 axios interceptors의 instance를 가져와 사용하기 위함


/********************************
 *
 * MainPage after success login
 *
 ********************************/
function MainPage() {

    /**********************************
     풀캘린더 데이터에 일정 추가하기
     **********************************/
    const [scheduleData, setScheduleData] = useState([]);
    const fetchScheduleData = async () => {
        try {
            const response = await instance.get('http://localhost:8080/api/schedule/list');
            const result = response.data;

            // rawData에 데이터를 변환하여 넣기
            const rawData = result.map(item => ({
                id: item.id,
                userId: item.userId,
                title: item.title,
                memo: item.memo,
                start: item.startDate,
                end: item.endDate,
                editable: true,  droppable: true, color: '#FF7676'
            }));
            // EFB495 FF7676
            setScheduleData(rawData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };



    /**********************************
     wishlist 불러오기
     **********************************/
    const [wishListData, setWishListData] = useState([]);
    const fetchWishListData = async () => {
        try {
            const response = await instance.get('http://localhost:8080/api/wishList/list');
            const result = response.data;

            // rawData에 데이터를 변환하여 넣기
            const rawData = result.map(item => ({
                name: item.name,
                rating: item.rating,
                totalRating: item.totalRating,
                memo: item.memo
            }));

            setWishListData(rawData);

        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchScheduleData(); // 풀캘린더 일정 가져오기
        fetchWishListData(); // wish list 장소 가져오기
    }, []);

    return (
        <div className="main_container">
            <div className="headerCp">
                <Header/>
            </div>
            <div className="body_container">
                <div className="leftMenuCp">
                    <LeftMenu/>
                </div>
                <div className="contentCp">
                    <Routes>
                        <Route path="calendar" element={<Calendar scheduleData={scheduleData} fetchScheduleData={fetchScheduleData} />} />
                        <Route path="map" element={<Map wishListData={wishListData} fetchWishListData={fetchWishListData} />} />
                        <Route path="currency" element={<Currency />} />
                        {/* Add other routes here as needed */}
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default MainPage;