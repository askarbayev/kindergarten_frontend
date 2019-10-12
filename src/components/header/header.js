import React, {Component} from 'react';
import './style.css'
import {Icon} from 'antd';

class Header extends Component{

    state={
        menuListState: true
    }

    iconClick = (e)=>{
        console.log('icon click')
        this.props.sideChange()
        
    }

    render(){


        let { sideClose } = this.props
        let toggle_icon = sideClose?'header-item-toggle':''
        console.log('SIDE CLOSE', sideClose)
        return(
            <div className = "header">
                <div className = {`header-item ${toggle_icon}`} onClick = {this.iconClick}>
                {<Icon className = "header-icon-item" type="double-left"/>}
        
                </div>
            </div>
        );
    }
}

export default Header