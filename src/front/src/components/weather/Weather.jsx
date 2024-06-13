import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Weather() {
    // -----------------------------
    // 변수 지정
    // -----------------------------
    // const [data, setData] = useState([]);

    useEffect(() => {

    }, []);

    return (
        <div className="weatherCp">
            <div className="weatherTittle">
                <div><h1>Weather</h1></div>
            </div>
        </div>
    );
}

export default Weather
