import React, {Component} from 'react';
import Header from './header/header'
import DocViewer from './docviewer/viewer'
import Navigator from './left_navigator/navigator'
import './style.css'

class Main extends Component{
    state = {
        sideClose:false
    }

    sideChange = ()=>{
        this.setState({sideClose:!this.state.sideClose})
    }

    render(){
        let { sideClose } = this.state;
        let toggle = sideClose?'toggle-layout':''
        let toggle2 = sideClose?'grid--full':''
        console.log(toggle)
        return (
            <div className = {`outest-layout-open ${toggle}`}> 
                <div className = "leftSide">
                    <Navigator sideClose = {sideClose}/>
                </div>
                <div className = "main-layout">
                    <Header sideChange = {this.sideChange} sideClose = {sideClose}/>
                    <div className = {!sideClose?"main-content-open":"main-content-close"}>
                        <div className = "left-content">left side</div>
                        <div className = "right-content">
                        <div className = {`grid ${toggle2}`}>
  <article class="item">
    <h2>Element 1</h2>
  </article>
  <article class="item">
    <h2>Element 2</h2>
  </article>
  <article class="item">
    <h2>Element 3</h2>
  </article>
  <article class="item">
    <h2>Element 4</h2>
  </article>
  <article class="item">
    <h2>Element 5</h2>
  </article>
  <article class="item">
    <h2>Element 6</h2>
  </article>  
  <article class="item">
    <h2>Element 7</h2>
  </article>
  <article class="item">
    <h2>Element 8</h2>
  </article>
  <article class="item">
    <h2>Element 9</h2>
  </article>  
  <article class="item">
    <h2>Element 10</h2>
  </article>
  <article class="item">
    <h2>Element 11</h2>
  </article>
  <article class="item">
    <h2>Element 12</h2>
  </article>
</div>
                            <DocViewer/>
                        </div>
                    </div>
                </div>
                
                
            </div>
        );
    }
}

export default Main;