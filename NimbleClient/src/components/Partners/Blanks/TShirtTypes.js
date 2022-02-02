import React, { Component } from 'react';

export default class TShirtType extends Component {

    static props = null;

    constructor(props) {
        super(props);
        this.props = props;
    }
    
    render() {
        return (
            <div id="parentContainer" style={{color: '-webkit-link', cursor: 'pointer'}} onClick={this.search.bind(this)}>
                <div className="parent" style={{backgroundImage: `url(${this.props.image})`, objectFit: "contain", backgroundSize: "cover"}}>
                    <div className="project">
                        <a class="infoIcon" id="i" >
                            <img id="infoIconChild" src="https://img.icons8.com/ios-glyphs/35/000000/info.png"/>
                        </a>
                        <div onClick={this.search.bind(this)} className="cover" id={this.props.coverId}></div>
                    </div>
                </div>
                <div className="projectName">
                    <h1 className="name">{this.props.name} <a className="price">${this.props.price} / {this.props.type}</a></h1>
                    {this.props.colors.map((color) => 
                        <div className="palette" style={{background: `${color}`, cursor: 'pointer'}}></div>
                    )}
                </div>
            </div>
        );
    }

    search(e){
        var newPath = this.props.path[0] + "-" + this.props.path[1] + "-" + this.props.url;
        this.props.history.push('/production-merch?path=' + newPath);
    }
}