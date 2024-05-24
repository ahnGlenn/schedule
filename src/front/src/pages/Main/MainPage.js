import Calendar from './calendar'; // Calendar 컴포넌트 import
import React from "react";
import Currency from "../../components/Currency/Currency";

/********************************
 MainPage after success login
 ********************************/
function MainPage() {


    return (
        <div style={{display: 'flex', height: '100%'}}>
            <div style={{width: '50%'}}>
                <h1>Glenn With Evaffanculo</h1>
                <h2>Porca Eva! Basta!!! Sono stufo delle tue scuse</h2>
                <h3>Danm! Enough! I'm tired of your excuses</h3>

                <Calendar/>

            </div>
            <div style={{width: '50%'}}>
                <Currency/>
            </div>
        </div>
    );
}

export default MainPage