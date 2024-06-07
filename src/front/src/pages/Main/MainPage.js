import Calendar from './calendar'; // Calendar 컴포넌트 import
import React from "react";
import Currency from "../../components/Currency/Currency";

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
            <div className="exRateCp" style={{width: '50%'}}>
                <Currency/>
            </div>
        </div>
    );
}

export default MainPage