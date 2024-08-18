/**
 * Axios 인스턴스를 생성하여 모든 요청에 토큰을 자동으로 포함시키도록 설정
 */

import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api', // API 서버의 기본 URL
    // timeout: 1000, // 요청이 timeout보다 오래 걸리면 요청이 중단.
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
    (config)=> {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers["Content-Type"] = 'application/json';
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);


// 응답 인터셉터: 응답을 받은 후 실행
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 403 Forbidden 에러 처리
        if (error.response && error.response.status === 403) {
            // 토큰이 유효하지 않으므로 사용자에게 재로그인을 요청하거나 로그인 페이지로 리다이렉트
            alert('Session/Token expired. Please log in again.');
            localStorage.removeItem('accessToken'); // 잘못된 토큰 제거
            window.location.href = '/'; // 로그인 페이지로 리다이렉트
        }
        return Promise.reject(error);
    }
);


export default instance;