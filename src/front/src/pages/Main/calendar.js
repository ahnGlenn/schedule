import React, { useState } from "react";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

/**********************************
 Calender Component for MainPage.js
 **********************************/
function Calendar() {

    const [value, onChange] = useState(new Date());

    // dateClick 함수를 선언
    const dateClick = (info) => {
        alert(info.dateStr);
    };

    return (

        <div>
            <h1>Our Schedule</h1>
            {/*<h2>Porca Eva! Basta!!! Sono stufo delle tue scuse</h2>
                <h3>Danm! Enough! I'm tired of your excuses</h3>*/}
            <FullCalendar
                // 날짜 클릭 시 이벤트 발생
                dateClick={dateClick}
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin, interactionPlugin]}
                events={[
                    { title: 'event 1', date: '2023-12-17' },
                    { title: 'event 2', date: '2023-12-18' }
                ]}
            />
        </div>
    );
}

export default Calendar;