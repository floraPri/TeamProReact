import React, {Component} from 'react';
import LoginForm from './login/login';
import { request, setAuthToken } from './axios_helper';
import MainPages from '@/pages/main/main';

class Logincontent extends Component {

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
    

    render() {
        return (  
            <div> 
                {this.state.componentToShow === "main" && <MainPages /> }
                {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} />}
            </div>
        );
    };
}

export default Logincontent;