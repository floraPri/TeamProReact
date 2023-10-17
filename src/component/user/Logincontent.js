import React from 'react';
import LoginForm from './login/login';
import { request, setAuthToken } from './axios_helper';
import { useState } from 'react';

const Logincontent = () => {

    const [componentToShow, setComponentToShow] = useState("login");

    const login = () => {
        setComponentToShow("login");
    }

    const logout = () => {
        setComponentToShow("main");
    }

    const onLogin = (email, password) => {
        // e.preventDefault();
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
                window.localStorage.setItem("email", response.data.email);
                window.localStorage.setItem("name", response.data.name);
                window.localStorage.setItem("userno", response.data.userno);
            }) 
            .catch((error) => {
                setComponentToShow("main");
                setAuthToken(null);
            }
        );
    }
    

        return (  
            <div> 
                {componentToShow === "login" && <LoginForm onLogin={onLogin} />}
            </div>
        );
}

export default Logincontent; 