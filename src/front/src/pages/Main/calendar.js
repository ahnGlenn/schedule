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
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [title, setTitle] = useState('');
    const [memo, setMemo] = useState('');

    // -----------------------------
    // dateClick 함수를 선언
    // -----------------------------
    const dateClick = (info) => {
        // alert(info.dateStr);
        setStartDate(info.dateStr);
        setStartDate(info.dateStr);
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
            const response = await axios.post("/api/schedule/save", {
                startDate: startDate,
                endDate: endDate,
                title: title,
                memo: memo
            });
            const result = response.data;
            if(result === 1) {
                setModalIsOpen(false);
            }else{
                alert("failed");
            }

        } catch(error) {
            console.error("오류 발생:", error);
        }
    }


    // -----------------------------
    // endDate 날짜 데이터 등록
    // -----------------------------
    const handleDateChange = (event) => {
        const endDate = event.target.value;
        setEndDate(endDate);
    };

    // -----------------------------
    // title 데이터 등록
    // -----------------------------
    const handleTitleChange = (event) => {
        const title = event.target.value;
        setTitle(title);
    };

    // -----------------------------
    // memo 데이터 등록
    // -----------------------------
    const handleMemoChange = (event) => {
        const memo = event.target.value;
        setMemo(memo);
    };

    return (
        <div className="calendar">
            {/*
            <div className="calendarTittle">
                <h1>Schedule</h1>
            </div>
            */}
            <FullCalendar
                // 날짜 클릭 시 이벤트 발생
                dateClick={dateClick}
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin, interactionPlugin]}
                events={[
                    { title: 'event1' ,start:'2024-06-09', end:'2024-06-11', color: '#FF7676'},
                    { title: 'hihih', date: '2024-06-20', color: '#EFB495',  editable: true,  droppable: true }
                ]}
                headerToolbar={{
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                }}
            />
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <div style={{flex:'1'}}>{/* 부모div에 자식div가 딱 맞게 */}
                    <div className="modal_head">
                        <h1><span className="date">{startDate}</span><a onClick={()=> setModalIsOpen(false)} style={{float:"right"}}>X</a></h1>
                    </div>
                    <div className="modal_body">
                        <div>
                            <input className="_input" id="title" type="text" onChange={handleTitleChange} />
                        </div>
                        <div className="divDt">
                            <input className="_input" id="startDt" type="date" value={startDate} readOnly />
                        </div>
                        <div className="divDt">
                            <input className="_input" id="endDt" type="date" value={endDate} onChange={handleDateChange} />
                        </div>
                        <div className="memo" style={{display:'flex'}}>
                            <textarea className="_textArea" id="memo" onChange={handleMemoChange} style={{flex:'1'}}></textarea>
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