import Calendar from './calendar'; // Calendar 컴포넌트 import
import React from "react";
import Currency from "../../components/Currency/Currency";
import Map from "../Main/map";
import Weather from "../../components/weather/Weather";

/********************************
 MainPage after success login
 ********************************/
function MainPage() {


    return (
        <div style={{display: 'flex', height: '100%'}}>
            <div className="calendarCp" style={{width: '50%'}}>
                <div className="inner_calendarCp">
                    <Calendar/>
                </div>
            </div>
            <div className="mapCp" style={{width: '50%'}}>
                <Map/>
            </div>
            <div className="exRateCp" style={{width: '28%'}}>
                <Currency/>
            </div>
            <div className="exRateCp" style={{width: '28%'}}>
                <Weather/>
            </div>
        </div>
    );
}

export default MainPage