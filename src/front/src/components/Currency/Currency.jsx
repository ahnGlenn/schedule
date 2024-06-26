import React, { useEffect, useState } from 'react';

function Currency() {

    // -----------------------------
    // 변수 지정
    // -----------------------------
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
                if(item.curUnit === "KRW"){
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

    // 환율 계산 로직
    const curCal = (e, msg) => {
        const inputValue = e.target.value;
        if (isNaN(inputValue) || inputValue.trim() === "") {
            setCalKor(0);
            setCalEur(0);
            return;
        }

        const numVal1 = parseFloat(inputValue);
        const numVal2 = KOR;

        if (msg === "KRW") {
            if (numVal1 === 0) {
                setCalKor(0);
                setCalEur(0);
            } else {
                setCalKor(numVal1);
                setCalEur(parseFloat((numVal1 / numVal2).toFixed(2)).toLocaleString());
            }
        } else {
            if (numVal1 === 0) {
                setCalKor(0);
                setCalEur(0);
            } else {
                setCalEur(numVal1);
                setCalKor(parseFloat((numVal1 * numVal2).toFixed(2)).toLocaleString());
            }
        }
    };

    return (
        <div className="currencyCp">
            <div className="currencyTittle">
                <div><h1>Exchange Rate</h1></div>
            </div>
            <div className="currency_box">
                <div className="excr_box">
                    <div className="slc_box _select_wrap">
                        <span className="flag _flag europe"></span>
                    </div>
                    <div className="num">
                        <input onChange={(e) => curCal(e, 'EUR')}
                               id="num"
                               type="text"
                               maxLength=""
                               value={calEUR}
                               className="_input"/>
                        <span className="codeNm"> EUR(€)</span>
                    </div>
                </div>
                {/*<div className="excr_eq"><span>=</span></div>*/}
                <div className="excr_box">
                    <div className="slc_box _select_wrap">
                        <span className="flag _flag krw"></span>
                    </div>
                    <div className="num">
                        <input onChange={(e) => curCal(e, 'KRW')}
                               id="num"
                               type="text"
                               maxLength=""
                               value={calKOR}
                               className="_input"
                        />
                        <span className="codeNm"> KRW(₩)</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Currency
