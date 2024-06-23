import Calendar from './calendar'; // Calendar 컴포넌트 import
import React, {useEffect, useState} from "react";
import Currency from "../../components/Currency/Currency";
import Map from "../Main/map";
import Weather from "../../components/weather/Weather";

/********************************
 MainPage after success login
 ********************************/
function MainPage() {

    // 풀캘린더 데이터에 일정 추가하기
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



    useEffect(() => {
        fetchScheduleData(); // 풀캘린더 일정 가져오기
    }, []);

    return (
        <div style={{display: 'flex', height: '100%'}}>
            <div className="calendarCp" style={{width: '50%'}}>
                <div className="inner_calendarCp">
                    <Calendar scheduleData={scheduleData} fetchScheduleData={fetchScheduleData} />
                </div>
            </div>
            <div className="mapCp" style={{width: '50%'}}>
                <Map/>
            </div>
            <div className="exRateCp" style={{width: '28%'}}>
                <Currency/>
            </div>
            {/*<div className="exRateCp" style={{width: '28%'}}>
                <Weather/>
            </div>*/}
        </div>
    );
}

export default MainPage