import React, {Component} from 'react';
import LoginForm from './join/join';
import { request, setAuthToken } from './axios_helper';
import MainPages from '@/pages/main/main';

class AppContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "login"
        }
    }

    login = () => {
        this.setState({componentToShow: "login"})
    }

    logout = () => {
        this.setState({componentToShow: "main"})
    }
    onLogin = (e, email, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            {
                email: email,
                password: password
            })
            .then((response) => {
                this.setState({componentToShow: "main"});
                setAuthToken(response.data.token);
            }) 
            .catch((error) => {
                this.setState({componentToShow: "main"});
                setAuthToken(null);
            }
        );
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
                this.setState({componentToShow: "login"});
                setAuthToken(response.data.token);
            })
            .catch((error) => {                
                this.setState({componentToShow: "main"});
               setAuthToken(null);
            }
        );
    };

    render() {
        return (  
            <div> 
                {this.state.componentToShow === "main" && <MainPages /> }
                {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
            </div>
        );
    };
}

export default AppContent;