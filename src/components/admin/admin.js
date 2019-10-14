import React, {Component} from 'react'
import './style.css'
import { Input } from 'antd';

const { TextArea } = Input;

export default class Admin extends Component{

    state = {
        title: null,
        summary: null,
        sections: []
    }

    titleFinishEnter = (e)=>{
        let title = e.target.value
        this.setState({title})
    }



    render(){
        const {title} = this.state
        return(
            <div className = "admin-page">
                <div className = "doc-list">
                    Lists
                </div>
                <div className = "doc-layout">
                    <div className = "doc-title">
                        {title?<h2>Title: {title}</h2>:null}
                    </div>
                    
                    <Input placeholder="Title" onPressEnter = {this.titleFinishEnter} />
                </div>
            </div>
        )
    }
}