import React, {Component} from 'react';
import {Icon} from 'antd';
import './style.css'

export default class Navigator extends Component{

    userIconClick = ()=>{
        this.props.rightWindowOpen()
    }
    
    render(){
        let { sideClose } = this.props;
        return(
            <div className = "lef-nav">
                <div className = "nav-item">
                    <Icon className = "icon-item" type="user" onClick = {this.userIconClick}/>
                </div>
                <div className = "nav-item">
                    <Icon className = "icon-item" type="question-circle"/>
                </div>
                <div className = "nav-item">
                    <Icon className = "icon-item" type="notification"/>
                </div>
            </div>
        )
    }
}