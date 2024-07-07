import React, {useState} from "react";

import { formatDate, getCustomStyles } from '../common/common1'
import Modal from 'react-modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

/**********************************
 Calender Component for MainPage.js
 **********************************/
function Calendar({ scheduleData, fetchScheduleData }) {
    // -----------------------------
    // manage state
    // -----------------------------
    // const [value, onChange] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [title, setTitle] = useState('');
    const [memo, setMemo] = useState('');



    // -----------------------------
    // dateClick 함수를 선언
    // -----------------------------
    const dateClick = (info) => {
        setStartDate(info.dateStr);
        setModalIsOpen(true);
    };



    // -----------------------------
    // common1.jsx : 공통 모달창 스타일 호출
    // ----------------------------
    const customStyles = getCustomStyles('calendar');



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
                fetchScheduleData(); // 새로고침 없이 새로운 데이터로 캘린더 업데이트
            }else{
                alert("failed");
            }

        } catch(error) {
            console.error("오류 발생:", error);
        }
    }



    // -----------------------------
    // 스케줄 데이터 삭제
    // -----------------------------
    const deleteSchedule = async (item) =>{
        try{
            if(window.confirm("are you going to delete?")){
                const response = await axios.post("/api/schedule/delete", {
                    id: item.id,
                    userId: item.userId,
                });

                const result = response.data;

                if(result === 1) {
                    fetchScheduleData(); // 새로고침 없이 새로운 데이터로 캘린더 업데이트
                }else{
                    alert("failed");
                }
            }
        }catch (e) {
            console.error("삭제 중 오류 발생:", e);
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



    // -----------------------------
    // 클릭시 달력 내 해당일정 깜빡임
    // -----------------------------
    const blinkSchedule = (event) => {
        alert("blink");
        // const memo = event.target.value;
    };

    return (
        <div className="calendar">
            <div className="calendarCp1">
                <h1>Schedule</h1>&nbsp;&nbsp;<h3><u>about schedule?</u></h3>
                <p className="arrow_box">manage and update your schedule here!</p>{/* 말풍선 태그 */}
            </div>
            <div className="calendarCp2">
                <div className="calendar_zone">
                    <FullCalendar
                        // 날짜 클릭 시 이벤트 발생
                        dateClick={dateClick}
                        defaultView="dayGridMonth"
                        plugins={[dayGridPlugin, interactionPlugin]}
                        events={scheduleData}
                        displayEventTime={false} // 12a 앞에 안나오게.
                        headerToolbar={{
                            left: 'prev',
                            center: 'title',
                            right: 'next'
                        }}
                    />
                </div>
                <div className="todoList">
                    <table className="todoList_table">
                        <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Plan</th>
                            <th scope="col">Memo</th>
                            <th scope="col">Date</th>
                            <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scheduleData.map((item, index) => (
                            <tr onClick={() => blinkSchedule()}>
                                <td className="noBorder">{index + 1}</td>
                                <td className="noBorder">{item.title}</td>
                                <td className="noBorder">{item.memo}</td>
                                <td className="noBorder">{formatDate(item.start)} ~ {formatDate(item.end)}</td>
                                <td style={{textAlign:"center"}} className="noBorder" onClick={() => deleteSchedule(item)}><span id="trash_bin"></span></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="calendarCp3">
                <div className="routine_title" style={{display: "flex"}}>
                    <h2>routine</h2><span>add</span>
                </div>
                <div className="routine_list">
                    <table className="routine_table">
                        <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Routine</th>
                            <th scope="col">Memo</th>
                            <th scope="col">Date</th>
                            <th scope="col">Repeat day</th>
                            <th scope="col">Cron tab</th>
                            <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="noBorder">1</td>
                                <td className="noBorder">반복 업무 1</td>
                                <td className="noBorder">반복해야되요.</td>
                                <td className="noBorder">반복 시작일 ~ 반복 종료일</td>
                                <td slassName="noBorder">반복 일정</td>
                                <td slassName="noBorder">반복 일정</td>
                                <td slassName="noBorder"><span id="trash_bin"></span></td>
                            </tr>
                            <tr>
                                <td className="noBorder">2</td>
                                <td className="noBorder">반복 업무 2</td>
                                <td className="noBorder">반복해야되요.</td>
                                <td className="noBorder">반복 시작일 ~ 반복 종료일</td>
                                <td slassName="noBorder">반복 일정</td>
                                <td slassName="noBorder">반복 일정</td>
                                <td slassName="noBorder"><span id="trash_bin"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>



            <Modal isOpen={modalIsOpen} style={customStyles}>
                <div style={{flex:'1'}}>{/* 부모div에 자식div가 딱 맞게 */}
                    <div className="modal_head">
                        <h1>
                            <span className="date">{startDate}</span>
                            <span onClick={()=> setModalIsOpen(false)} className="modal_close_btn" ></span>
                        </h1>
                    </div>
                    <div className="modal_body">
                        <div>
                            <label>Title </label>
                            <input className="_input" id="title" type="text" onChange={handleTitleChange} />
                        </div>
                        <div className="divDt">
                            <label>Start Date </label>
                            <input className="_input" id="startDt" type="date" value={startDate} readOnly />
                        </div>
                        <div className="divDt">
                            <label>End Date </label>
                            <input className="_input" id="endDt" type="date" value={endDate} onChange={handleDateChange} />
                        </div>
                        <div className="memo" style={{display:'flex'}}>
                            <label>Memo </label>
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