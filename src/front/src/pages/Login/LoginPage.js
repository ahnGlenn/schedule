import React, { useState } from 'react';
import "./LoginPage.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    /**********************************
     페이지 이동을 위한 useNavigate 사용
     **********************************/
    const navigate = useNavigate(); // useNavigate 훅 사용


    /**********************************
     변수 지정
     **********************************/
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    /**********************************
     로그인 api
     **********************************/
    async function signIn(){
        try {
            const loginApi = await axios.post("/api/login", { email: email, password: password });
            const tokenData = loginApi.data.token;

            if (tokenData) {
                localStorage.setItem('accessToken', tokenData);
                navigate('/main/calendar');
            }else {
                console.error('Login failed: No token received');
            }
        } catch(error) {
            // axios의 error.response는 서버 응답 상태와 데이터를 포함
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Incorrect email or password!");
                }
                console.error('Error:', error);
            }
        }
    }

    return (
        <div className="form signup">
            <div className="form-header">
                <div className="show-signin">Sign In</div>
                <div className="show-signup">Sign Up</div>
                <div className="show-reset">Reset</div>
            </div>
            <div className="arrow"></div>
            <div className="form-elements">
                <div className="form-element">
                    <input type="text" name="email" placeholder="Email" maxLength="30" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-element">
                    <input type="password" name="password" placeholder="Password" maxLength="30" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-element">
                    <button id="submit-btn" onClick={signIn}>Sign in</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage
