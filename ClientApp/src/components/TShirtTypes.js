import React, { Component } from 'react';

export default class TShirtType extends Component {

    static props = null;

    constructor(props) {
        super(props);
        this.props = props;
    }
    
    render() {
        return (
            <div id="parentContainer" style={{color: '-webkit-link', cursor: 'pointer'}}>
                <div className="parent" id={this.props.projectId}>
                    <div className="project">
                        <a class="infoIcon" id="i" >
                            <img id="infoIconChild" src="https://img.icons8.com/ios-glyphs/35/000000/info.png"/>
                        </a>
                        <div onClick={this.props.path} className="cover" id={this.props.coverId}></div>
                    </div>
                </div>
                <div className="projectName">
                    <h1 className="name">{this.props.name} <a className="price">{this.props.price}</a></h1>
                    {this.props.colors.map((color) => 
                        <div className="palette" style={{background: `${color}`, cursor: 'pointer'}}></div>
                    )}
                </div>
            </div>
        );
    }
}