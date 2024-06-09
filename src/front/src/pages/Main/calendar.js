import React, { useState } from "react";

import Modal from 'react-modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

/**********************************
 Calender Component for MainPage.js
 **********************************/
function Calendar() {
    // -----------------------------
    // manage state
    // -----------------------------
    const [value, onChange] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    // -----------------------------
    // dateClick 함수를 선언
    // -----------------------------
    const dateClick = (info) => {
        // alert(info.dateStr);
        setSelectedDate(info.dateStr);
        setModalIsOpen(true);
    };

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

    // -----------------------------
    // 날짜별 데이터 등록
    // -----------------------------
    const saveSchedule = async () => {
        try {
            const saveSchedule = await axios.get("/api/schedule/save", {params: {selectedDate}});
        } catch(error) {
            console.error("오류 발생:", error);
        }
    }

    return (
        <div className="calendar">
            <div className="calendarTittle">
                <h1>Schedule</h1>
            </div>
            {/*<h2>Porca Eva! Basta!!! Sono stufo delle tue scuse</h2>
                <h3>Danm! Enough! I'm tired of your excuses</h3>*/}
            <FullCalendar
                // 날짜 클릭 시 이벤트 발생
                dateClick={dateClick}
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin, interactionPlugin]}
                events={[
                    { title: 'event1' ,start:'2024-06-09', end:'2024-06-11'},
                    { title: 'hihih', date: '2024-06-20', color: 'green',  editable: true,  droppable: true }
                ]}
            />
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <div style={{flex:'1'}}>{/* 부모div에 자식div가 딱 맞게 */}
                    <div className="modal_head">
                        <h1><span className="date">{selectedDate}</span><a onClick={()=> setModalIsOpen(false)} style={{float:"right"}}>X</a></h1>
                    </div>
                    <div className="modal_body">
                        <div className="divDt">
                            <input className="_input" id="startDt" type="date" />
                        </div>
                        <div className="divDt">
                            <input className="_input" id="endDt" type="date" />
                        </div>
                        <div className="memo" style={{display:'flex'}}>
                            <textarea className="_textArea" style={{flex:'1'}}></textarea>
                        </div>
                    </div>
                    <div className="modal_foot">
                        <div className="form-elements">
                            <div className="form-element">
                                <button onClick={saveSchedule}>save</button>
                                <button onClick={()=> setModalIsOpen(false)}>close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

// App.js
Modal.setAppElement('#root')

export default Calendar;