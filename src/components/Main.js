import React, {Component} from 'react';
import Header from './header/header'
import DocViewer from './docviewer/viewer'
import Navigator from './left_navigator/navigator'
import DocContent from './doccontent/doccontent'
import RightWindow from './rightWindow/rightWindow'
import './style.css'

class Main extends Component{
    state = {
        sideClose:false,
        rightWindowClosed: true
    }

    sideChange = ()=>{
        this.setState({sideClose:!this.state.sideClose})
    }

    rightWindowOpen = () => {
        this.setState({rightWindowClosed:false})
    }

    rightWindowClose = () => {
        this.setState({rightWindowClosed:true})
    }

    render(){
        let { sideClose, rightWindowClosed } = this.state;
        let toggle_layout = sideClose?'toggle-layout':''
        let toggle_leftSide = sideClose?'toggle-leftSide':''
        let toggle_main = sideClose?'toggle-main':''
        let toggle_mc_left = sideClose?'toggle-mc-left':''
        let toggle_mc_right = sideClose?'toggle-mc-right':''

        let toggle_right_window = !rightWindowClosed?'toggle-rightWindow':''
        let toggle_outest_layout = !rightWindowClosed?'toggle-outest-layout':''
        return (
            <div className = "wrap-layout">
                <div className = {`outest-layout ${toggle_layout} ${toggle_outest_layout}`}> 
                    <div className = {`leftSide ${toggle_leftSide}`}>
                        {/*<Navigator sideClose = {sideClose}/>*/}
                        {<Navigator rightWindowOpen = {this.rightWindowOpen}/>}
                    </div>
                    <div className = {`main-layout ${toggle_main}`}>
                        <div>
                            <Header sideChange = {this.sideChange} sideClose = {sideClose}/>
                        </div>
                        <div className = {`main-content`}>
                            <div className = {`left-content ${toggle_mc_left}`}>
                                <DocContent/>
                            </div>
                            <div className = {`right-content ${toggle_mc_right}`}>
                                <DocViewer/>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className = {`rightWindow ${toggle_right_window}`}>
                    <RightWindow rightWindowClose = {this.rightWindowClose}/>
                </div>
            </div>

        );
    }
}

export default Main;