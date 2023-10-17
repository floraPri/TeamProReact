import React, {Component} from 'react';
import JoinForm from './join/join';
import { request } from './axios_helper';

class AppContent extends Component {
    
    onRegister = (event, email, password, phone, name, ) => {
        event.preventDefault();
        request(
            "POST",
            "/register",
            {
                email: email,
                password: password,
                phone: phone,
                name: name,
               
            })
            .then((response) => {                
                window.location.href = '/';
            })
            .catch((error) => {
                console.log(error.response.data.message);
                alert(error.response.data.message);
                window.location.reload();          
            }
        );
    };

    render() {
        return (  
            <div> 
                <JoinForm onRegister={this.onRegister} />
            </div>
        );
    };
}

export default AppContent;