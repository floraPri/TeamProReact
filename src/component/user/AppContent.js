import React, {Component} from 'react';
import JoinForm from './join/join';
import { request, setAuthToken } from './axios_helper';
import MainPages from '@/pages/main/main';
import LoginPages from '@/pages/user/login/login';

class AppContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "join"
        }
    }

    login = () => {
        this.setState({componentToShow: "join"})
    }

    logout = () => {
        this.setState({componentToShow: "main"})
    }
    
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
                this.setState({componentToShow: "main"});
                window.location.href = '/';
            })
            .catch((error) => {                
                this.setState({componentToShow: "main"});
            }
        );
    };

    render() {
        return (  
            <div> 
                {this.state.componentToShow === "join" && <JoinForm onRegister={this.onRegister} />}
            </div>
        );
    };
}

export default AppContent;