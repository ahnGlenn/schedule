import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Currency() {

    // -----------------------------
    // 페이지 이동을 위한 useNavigate 사용
    // -----------------------------
    const navigate = useNavigate(); // useNavigate 훅 사용


    // -----------------------------
    // 변수 지정
    // -----------------------------
    const [data, setData] = useState([]);

    // -----------------------------
    // 환율 데이터 가져오기 api
    // -----------------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/currency'); // Java 백엔드의 API URL
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div>
                <div><h1>Currency Comparison</h1></div>
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>
                            <strong>{item.curNm}:</strong> {item.dealBasR}
                        </li>
                    ))}
                </ul>
            </div>


            {/*<div>*/}
            {/*        <div class="excr_box" style={{display: "flex"}}>*/}
            {/*            <div class="slc_box _select_wrap">*/}
            {/*                <span class="flag _flag krw"></span>*/}
            {/*                <select onMouseDown="goOtherTCR(this, 'a=nco_x5m*a.caldn1&amp;r=1&amp;i=0800042F_00000028AC42');" className="nt_slc _select">*/}
            {/*                    <option data-param="u4=KRW" selected="">대한민국</option>*/}
            {/*                    <option data-param="u4=ZAR">남아프리카 공화국</option>*/}
            {/*                </select>*/}
            {/*                <span class="nt_eng _code">KRW</span></div>*/}
            {/*            <div class="num">*/}
            {/*                <input onMouseDown="goOtherTCR(this, '');" id="num" type="text" maxLength="" value="1,370.20"*/}
            {/*                       className="_input" data-key="u2" data-sub-key="u8" data-value="up"/>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div class="excr_eq"><span>=</span></div>*/}

            {/*        <div class="excr_box" style={{display: "flex"}}>*/}
            {/*            <div class="slc_box _select_wrap">*/}
            {/*                <span class="flag _flag krw"></span>*/}
            {/*                <select onMouseDown="goOtherTCR(this, 'a=nco_x5m*a.caldn1&amp;r=1&amp;i=0800042F_00000028AC42');"*/}
            {/*                        className="nt_slc _select">*/}
            {/*                    <option data-param="u4=KRW" selected="">대한민국</option>*/}
            {/*                    <option data-param="u4=ZAR">남아프리카 공화국</option>*/}
            {/*                </select>*/}
            {/*                <span class="nt_eng _code">EUR</span></div>*/}
            {/*            <div class="num">*/}
            {/*                <input onMouseDown="goOtherTCR(this, '');" id="num" type="text" maxLength="" value="1,370.20"*/}
            {/*                       className="_input" data-key="u2" data-sub-key="u8" data-value="up"/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*</div>*/}
        </div>
    );
}

export default Currency
