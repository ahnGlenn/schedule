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
            const {accessToken} = loginApi.data.token;
            alert(loginApi.data.token);

            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                navigate('/main/calendar');
            }else {
                console.error('Login failed:');
            }
        } catch(error) {
            console.error('Error:', error);
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
