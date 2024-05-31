import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Currency() {

    // -----------------------------
    // 변수 지정
    // -----------------------------
    const [data, setData] = useState([]);
    const [KOR, setKor] = useState(1);
    const [EUR, setEur] = useState(1);

    // -----------------------------
    // 환율 데이터 가져오기 api
    // -----------------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/currency'); // Java 백엔드의 API URL
                const result = await response.json();

                result.forEach(item =>{
                    if(item.curUnit == "EUR"){
                        setEur(parseInt(item.dealBasR.replace(/,/g, '')));
                    }else{
                        setKor(parseInt(item.dealBasR.replace(/,/g, '')));
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
    const curCal = (e, msg) =>{
        if(msg == "KRW"){
            const numVal1 = parseInt(e.target.value);
            const numVal2 = EUR;
            setKor(numVal1);
            setEur( numVal1 / numVal2);
        }else{
            const numVal1 = parseInt(e.target.value);
            const numVal2 = KOR;
            setEur(numVal1);
            setKor( numVal1 * numVal2);
        }

       /* // 기준 환율
        const dealBasR = EUR;

        // 원화를 유로로 변환하는 함수
        function krwToEur(krw) {
            return krw / dealBasR;
        }

        // 유로를 원화로 변환하는 함수
        function eurToKrw(eur) {
            return eur * dealBasR;
        }

        // 예제: 1원일 때 유로로 변환
        const krwAmount = 1;
        const eurAmount = krwToEur(krwAmount);
        console.log(`${krwAmount} 원은 약 ${eurAmount.toFixed(5)} 유로입니다.`);

// 예제: 1유로일 때 원화로 변환
        const eurAmountExample = 1;
        const krwAmountExample = eurToKrw(eurAmountExample);
        console.log(`${eurAmountExample} 유로는 약 ${krwAmountExample.toFixed(2)} 원입니다.`);*/

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
                        <input onChange={(e) => curCal(e, 'EUR')} id="num" type="text" maxLength="" value={EUR} className="_input"/>
                        <span className="codeNm">EUR</span>
                    </div>
                </div>
                <div className="excr_eq"><span>=</span></div>
                <div className="excr_box" style={{display: "inline-block"}}>
                    <div className="slc_box _select_wrap">
                        <span className="flag _flag krw"></span>
                    </div>
                    <div className="num">
                        <input onChange={(e) => curCal(e, 'KRW')} id="num" type="text" maxLength="" value={KOR} className="_input"/>
                        <span className="codeNm">KRW</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Currency
