import React, { useState } from 'react';
import "./LoginPage.css";
import axios from 'axios';

function LoginPage() {

    // 변수 지정
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function signUp(){
        alert("login start");

        try {
            const data = await axios.get("/api/login", { email, password });
        } catch {
            // 오류 발생시 실행
        }
    }

    return (
        <div className="form signup">
            <div className="form-header">
                <div className="show-signup">Sign Up</div>
                <div className="show-signin">Sign In</div>
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
                    <button id="submit-btn" onClick={signUp}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage
