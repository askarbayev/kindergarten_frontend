import React, {Component} from 'react';
import './style.css'

export default class DocContent extends Component{
    render(){
        return(
            <div>
                <svg height="1000" width="1000">
                    <circle cx="50" cy="50" r="8" stroke="black" stroke-width="1" fill="lightgreen" />
                    Sorry, your browser does not support inline SVG.  
                    <line x1="50" y1="58" x2="50" y2="200" style={{stroke:'lightgreen', strokeWidth:2}} />
                    <text x="100" y="50" fill="lightgreen">I love</text>
                </svg>   
            </div>
        )
    }
}