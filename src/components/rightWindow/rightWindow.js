import React, {Component} from 'react'
import './style.css'
import { Icon, Button } from 'antd';
import Login from './Login'

export default class RightWindow extends Component{

    render(){
        return(
            <div className = "mainRightWindow">
                <div className = "topWindow">
                    <div className = "closeWindow">
                            <Button type="primary" style={{}} size = "small">
                                <Icon type="double-right" />
                                Close
                            </Button>
                    </div>
                    <div className = "windowTitle">
                        Login Page
                    </div>
                </div>
                <div className = "centerWindow">
                    <div>
                        <Login/>
                    </div>
                </div>
                <div className = "bottomWindow">
                    <div>Cancel</div>
                </div>
            </div>
        )
    }

}