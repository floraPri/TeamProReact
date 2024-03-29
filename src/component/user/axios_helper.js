import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.headers.post["Content-type"] = 'application/json'

// 로그인이 완료시 JWT를 저장한다.

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
}

export const setAuthToken = (token) => {
   window.localStorage.setItem("auth_token", token);
}

export const request = (method, url, data) => {     

    let headers = {};

    if(getAuthToken() !== null && getAuthToken !=="null") {
        headers = {"Authorization": `Bearer ${getAuthToken()}`};
        console.log('headers : ', headers);
    }
    
    console.log('axios~!');
    console.log('method : ', method );
    console.log('headers : ', headers );
    console.log('url : ', url );
    console.log('data : ', data );

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    });
};