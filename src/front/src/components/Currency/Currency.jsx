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
    const [calEUR, setCalEur] = useState(1);
    const [calKOR, setCalKor] = useState(1);


    // -----------------------------
    // 환율 데이터 가져오기 api
    // -----------------------------
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/currency'); // Java 백엔드의 API URL
            const result = await response.json();

            result.forEach(item =>{
                if(item.curUnit == "KRW"){
                    setEur(parseInt(item.dealBasR.replace(/,/g, '')));
                    setCalEur(parseInt(item.dealBasR.replace(/,/g, '')));
                }else{
                    setKor(parseInt(item.dealBasR.replace(/,/g, '')));
                    setCalKor(parseInt(item.dealBasR.replace(/,/g, '')));
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // 컴포넌트가 마운트될 때 fetchData 호출
    }, []);

    // -----------------------------
    // 환율 계산 로직
    // -----------------------------
    const curCal = (e, msg) =>{
        if(msg == "KRW"){
            alert("kor :" + e.target.value );
            const numVal1 = parseInt(e.target.value);
            const numVal2 = EUR;
            alert("numVal1 :" + numVal1 + "/numVal2: " + numVal2);
            setCalKor(numVal1);
            setCalEur( numVal1 / numVal2);
        }else{
            alert("eur :" + e.target.value );
            const numVal1 = parseInt(e.target.value);
            // 여기서 numVal2 초기화 해줘야해
            const numVal2 = KOR;
            alert("numVal1 :" + numVal1 + "/numVal2: " + numVal2);
            setCalEur(numVal1);
            setCalKor( numVal1 * numVal2);
        }
    }

    return (
        <div>
            <div className="currencyTittle">
                <div><h1>Exchange Rate</h1></div>
            </div>
            <div>
                <div className="excr_box" style={{display: "inline-block"}}>
                    <div className="slc_box _select_wrap">
                        <span className="flag _flag krw"></span>
                    </div>
                    <div className="num">
                        <input onChange={(e) => curCal(e, 'EUR')} id="num" type="text" maxLength="" value={calEUR} className="_input"/>
                        <span className="codeNm"> EUR</span>
                    </div>
                </div>
                <div className="excr_eq"><span>=</span></div>
                <div className="excr_box" style={{display: "inline-block"}}>
                    <div className="slc_box _select_wrap">
                        <span className="flag _flag krw"></span>
                    </div>
                    <div className="num">
                        <input onChange={(e) => curCal(e, 'KRW')}
                               id="num"
                               type="text"
                               maxLength=""
                               value={calKOR}
                               className="_input"/>
                        <span className="codeNm"> KRW</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Currency
