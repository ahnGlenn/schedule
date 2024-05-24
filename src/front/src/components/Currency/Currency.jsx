import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Currency() {

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
            </div>
            <div>
                    <div class="excr_box" style={{display: "flex"}}>
                        <div class="slc_box _select_wrap">
                            <span class="flag _flag krw"></span>
                            <select className="nt_slc _select">
                                {data.map((item, index) => (
                                    <option data-param="u4=KRW" selected="">{item.curNm}</option>
                                ))}
                            </select>
                            <span class="nt_eng _code">KRW</span></div>
                        <div class="num">
                            <input  id="num" type="text" maxLength="" value="1,370.20" className="_input" data-key="u2" data-sub-key="u8" data-value="up"/>
                        </div>
                    </div>
                    <div class="excr_eq"><span>=</span></div>
                    <div class="excr_box" style={{display: "flex"}}>
                        <div class="slc_box _select_wrap">
                            <span class="flag _flag krw"></span>
                            <select className="nt_slc _select">
                                {data.map((item, index) => (
                                    <option data-param="u4=KRW" selected="">{item.curNm}</option>
                                ))}
                            </select>
                            <span class="nt_eng _code">EUR</span></div>
                        <div class="num">
                            <input onMouseDown="goOtherTCR(this, '');" id="num" type="text" maxLength="" value="1,370.20"
                                   className="_input" data-key="u2" data-sub-key="u8" data-value="up"/>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Currency
