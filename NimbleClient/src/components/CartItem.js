import React, { Component } from 'react';

export default class CartItem extends Component {

    static props = null;

    constructor(props) {
        super(props);
        this.props = props;
    }
    
    render() {
        return (
            <div className="item" onClick={this.visitPage.bind(this)}>
                <div style={{paddingBottom: "0px", paddingLeft: "0px", display: "block"}}>
                    <h2 className="caption" style={{fontSize: "1rem", marginBottom: "0px", textAlign: "left", marginTop: "0px", display: "inline", float: "left", marginRight: "10px", fontWeight: "700"}} id="pCaption">{this.props.name}</h2>
                    <div className="palette" style={{background: `${this.props.color}`, cursor: 'pointer'}}></div>
                </div>
                <div className="spacer"></div>
                <h2 className="caption" style={{fontSize: "0.9rem", marginBottom: "0px", textAlign: "left", marginTop: "0px", float: "left"}} id="pCaption">{this.props.units} units</h2>
                <div className="links" style={{marginTop: "30px"}}>
                    <a className="li" style={{fontSize: "1rem", float: "right", marginRight: "5px"}}>✖ remove</a>
                </div>
            </div>
        );
    }

    visitPage(e) {
        return;
    }

    search(e){
        this.props.history.push(this.props.matchPath);
    }
}