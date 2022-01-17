import React, { Component } from 'react';

export default class CartItem extends Component {

    static props = null;

    constructor(props) {
        super(props);
        this.props = props;
    }

    removeItem() {
        window.localStorage.removeItem('checkout');
        var data = {
            cart: []
        }
        var parsedData = JSON.parse(window.localStorage.getItem('state'));
        for (var i = 0; i < parsedData.cart.length; i++) {
            if (!(parsedData.cart[i].id == this.props.id)) {
                data.cart.push(parsedData.cart[i]);
            }
        }
        window.localStorage.setItem('state', JSON.stringify(data));
    }
    
    render() {
        var price = this.props.units * this.props.price 
        return (
            <div className="item" onClick={this.visitPage.bind(this)}>
                <div style={{paddingBottom: "0px", paddingLeft: "0px", display: "block"}}>
                    <h2 className="caption" style={{fontSize: "1rem", marginBottom: "0px", textAlign: "left", marginTop: "0px", display: "inline", float: "left", marginRight: "10px", fontWeight: "700"}} id="pCaption">{this.props.name}</h2>
                    <div className="palette" style={{background: `${this.props.color}`, cursor: 'pointer'}}></div>
                </div>
                <div className="spacer"></div>
                <h2 className="caption" style={{fontSize: "0.9rem", marginBottom: "0px", textAlign: "left", marginTop: "0px", float: "left"}} id="pCaption">size: {this.props.size}</h2>
                <h2 className="caption" style={{fontSize: "0.9rem", marginBottom: "0px", textAlign: "left", marginTop: "0px", float: "left", marginLeft: "10px"}} id="pCaption">{this.props.units} units</h2>
                <h2 className="caption" style={{fontSize: "0.9rem", marginBottom: "0px", textAlign: "left", marginTop: "50px", float: "left", marginLeft: "0px", position: "absolute"}} id="pCaption"><a className="tprice">${price}</a></h2>
                <div className="links" style={{marginTop: "50px"}}>
                    <a className="li" style={{fontSize: "1rem", float: "right", marginRight: "5px"}} onClick={this.removeItem.bind(this)}>✖ remove</a>
                </div>
            </div>
        );
    }

    visitPage(e) {
        return;
    }
}