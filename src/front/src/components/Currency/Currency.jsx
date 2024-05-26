import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Currency() {

    // -----------------------------
    // 변수 지정
    // -----------------------------
    const [data, setData] = useState([]);
    const [KOR, setKor] = useState([]);
    const [EUR, setEur] = useState([]);

    // -----------------------------
    // 환율 데이터 가져오기 api
    // -----------------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/currency'); // Java 백엔드의 API URL
                const result = await response.json();
                setData(result);

                result.forEach(item =>{
                    // alert(item.dealBasR);
                    // (item.curUnit == "KOR")? setKor(item.dealBasR):setEur(item.dealBasR);
                    if(item.curUnit == "EUR"){
                        setEur(item.dealBasR);
                    }else{
                        setKor(item.dealBasR);
                    }
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // -----------------------------
    // 환율 계산 로직
    // -----------------------------
    const curCal = () =>{
        alert("here");
    }

    return (
        <div>
            <div>
                <div><h1>Currency Comparison</h1></div>
            </div>
            <div>
                <div class="excr_box" style={{display: "inline-block"}}>
                    <div class="slc_box _select_wrap">
                        <span class="flag _flag krw"></span>
                        <span class="nt_eng _code">KRW</span></div>
                    <div class="num">
                        <input  id="num" type="text" maxLength="" value={KOR} className="_input" />
                    </div>
                </div>
                <div class="excr_eq" style={{display: "inline-block"}}><span>=</span></div>
                <div class="excr_box" style={{display: "inline-block"}}>
                    <div class="slc_box _select_wrap">
                        <span class="flag _flag krw"></span>
                        <span class="nt_eng _code">EUR</span></div>
                    <div class="num">
                        <input onChange="curCal(this, '');" id="num" type="text" maxLength="" value={EUR} className="_input" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Currency
