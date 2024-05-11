import React, { useEffect } from 'react';
import "./LoginPage.css";
function LoginPage() {

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
                    <input type="text" placeholder="Username" />
                </div>
                <div className="form-element">
                    <input type="password" placeholder ="Password" />
                </div>
                <div className="form-element">
                    <input type="password" placeholder="Confirm password" />
                </div>
                <div className="form-element">
                    <button id="submit-btn">Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage
