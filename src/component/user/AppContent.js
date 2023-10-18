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
<<<<<<< HEAD
                this.setState({componentToShow: "main"});
=======
>>>>>>> 1e07264d6b9c68b0508c0579e8156727e4125afb
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
<<<<<<< HEAD
                {this.state.componentToShow === "join" && <JoinForm onRegister={this.onRegister} />}
=======
                <JoinForm onRegister={this.onRegister} />
>>>>>>> 1e07264d6b9c68b0508c0579e8156727e4125afb
            </div>
        );
    };
}

export default AppContent;