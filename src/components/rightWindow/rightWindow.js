import React, {Component} from 'react'
import './style.css'
import { Icon, Button } from 'antd';
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'

export default class RightWindow extends Component{

    state = {
        login: true,
        signUp: false
    }

    windowStateChange = (e, action) => {
        if (action === 'signUp'){
            this.setState({
                login:false,
                signUp: true
            })
        }
        else if (action === 'login'){
            this.setState({
                login:true,
                signUp: false
            })
        }
    }   

    closeButtonClick = () => {
        this.props.rightWindowClose()
    }

    render(){
        const { login } = this.state
        return(
            <div className = "mainRightWindow">
                <div className = "topWindow">
                    <div className = "closeWindow">
                            <Button type="primary" style={{}} size = "small" onClick = {this.closeButtonClick}>
                                <Icon type="close" />
                                Close
                            </Button>
                    </div>
                    <div className = "windowTitle">
                        {login?'Login':'Sign Up'}
                    </div>
                </div>
                <div className = "centerWindow">
                    
                        {login?<Login windowStateChange = {this.windowStateChange}/>:<SignUp windowStateChange = {this.windowStateChange}/>}
                    
                </div>
                <div className = "bottomWindow">
                    <Button type = "primary" onClick = {this.closeButtonClick}>
                        Cancel
                    </Button>
                </div>
            </div>
        )
    }

}