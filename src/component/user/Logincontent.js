import React from 'react';
import LoginForm from './login/login';
import { request, setAuthToken } from './axios_helper';

const Logincontent = () => {

    const onLogin = (email, password) => {
        request(
            "POST",
            "/login",
            {
                email: email,
                password: password
            })
            .then((response) => {
                 window.location.href = '/';
                setAuthToken(response.data.token);
                window.localStorage.setItem("userno", response.data.userno);
                window.localStorage.setItem("email", response.data.email);
                window.localStorage.setItem("name", response.data.name);
                window.localStorage.setItem("phone", response.data.phone);
                window.localStorage.setItem("address", response.data.address);
                window.localStorage.setItem("joindate", response.data.joindate);
                window.localStorage.setItem("authority", response.data.authority);
            }) 
            .catch((error) => {
                alert(error.response.data.message);
                window.location.href = '/';
            }
        );
    }
    

        return (  
            <div> 
                <LoginForm onLogin={onLogin} />
            </div>
        );
}

export default Logincontent; 