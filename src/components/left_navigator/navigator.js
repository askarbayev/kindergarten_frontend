import React, {Component} from 'react';
import {Icon} from 'antd';
import './style.css'

export default class Navigator extends Component{
    
    render(){
        let { sideClose } = this.props;
        return(
            <div className = "lef-nav">
                <div className = "nav-item">
                    <Icon className = "icon-item" type="user"/>
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