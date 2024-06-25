import Calendar from './calendar';
import React, {useEffect, useState} from "react";
import Currency from "../../components/Currency/Currency";
import Map from "../Main/map";

/********************************
 MainPage after success login
 ********************************/
function MainPage() {

    // -----------------------------
    // 풀캘린더 데이터에 일정 추가하기
    // -----------------------------
    const [scheduleData, setScheduleData] = useState([]);
    const fetchScheduleData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/schedule/list');
            const result = await response.json();

            // rawData에 데이터를 변환하여 넣기
            const rawData = result.map(item => ({
                title: item.title,
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



    // -----------------------------
    // wishlist 불러오기
    // -----------------------------
    const [wishListData, setWishListData] = useState([]);
    const fetchWishListData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/wishList/list');
            const result = await response.json();

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
            <div className="calendarCp">
                <div className="inner_calendarCp">
                    <Calendar scheduleData={scheduleData} fetchScheduleData={fetchScheduleData} />
                </div>
            </div>
            <div className="mapCp">
                <Map wishListData={wishListData} fetchWishListData={fetchWishListData} />
            </div>
            <div className="exRateCp">
                <Currency/>
            </div>
        </div>
    );
}

export default MainPage