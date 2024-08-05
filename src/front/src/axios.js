/**
 * Axios 인스턴스를 생성하여 모든 요청에 토큰을 자동으로 포함시키도록 설정
 */

import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api', // API 서버의 기본 URL
});

// 요청 인터셉터 추가
instance.interceptors.request.use(config => {
        const token = localStorage.getItem('accessToken');
        alert("here")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;
