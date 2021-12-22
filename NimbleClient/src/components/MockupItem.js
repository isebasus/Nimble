import React, { Component } from 'react';

export default class MockupItem extends Component {

    static props = null;

    constructor(props) {
        super(props);
        this.props = props;
    }

    removeItem() {
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

        var price = this.props.units * this.props.price;

        return (
            <div className="item" style={{cursor: "default", height: '190px', position: "relative", width: "100%"}} onClick={this.visitPage.bind(this)}>
                <div style={{paddingBottom: "0px", paddingLeft: "0px", display: "block", height: "100%", position: "relative", width: "100%"}}>
                    <div className="box" style={{width: "20%", height: "100px", objectFit: "cover", borderRadius: "10px", display: "inline", textAlign: "left", marginBottom: "0px", left: "0px", marginRight: "10px", float: "left"}} id={this.props.image}></div>
                    <div style={{position: "relative", display: "inline", float: 'left', width: "300x", height: "100%"}}>
                        <div style={{paddingBottom: "0px", paddingLeft: "0px", display: "block"}}>
                            <h2 className="caption" style={{fontSize: "1rem", marginBottom: "0px", textAlign: "left", marginTop: "0px", display: "inline", float: "left", marginRight: "10px", fontWeight: "700"}} id="pCaption">{this.props.name}</h2>
                            <div className="palette" style={{background: `${this.props.color}`, cursor: 'pointer'}}></div>
                        </div>
                        <div className="spacer"></div>
                        <h2 className="caption" style={{fontSize: "0.9rem", marginBottom: "0px", textAlign: "left", marginTop: "25px", left: '0px', position: "absolute"}} id="pCaption">Size: {this.props.size}</h2>
                        <h2 className="caption" style={{fontSize: "0.9rem", marginBottom: "0px", textAlign: "left", marginTop: "45px", float: "left", marginLeft: "0px", position: "absolute"}} id="pCaption">{this.props.units} units</h2>
                        <h2 className="caption" style={{fontSize: "0.9rem", marginBottom: "0px", textAlign: "left", marginTop: "68px", float: "left", marginLeft: '0px', position: "absolute"}} id="pCaption"><a className="tprice">${price}</a></h2>
                    </div>
                    
                </div>
                <a class="button" style={{position: "absolute", top: "50px", right: "10px"}}>Add Mockup</a>
                <a class="button" style={{position: "absolute", top: "105px", right: "10px"}}>Add Vector File</a>
                <div className="links" style={{marginTop: "50px", position: "absolute", right: "20px", bottom: "-20px"}}>
                    <a className="li" style={{fontSize: "1rem", float: "right", marginRight: "5px"}} onClick={this.removeItem.bind(this)}>✖ remove</a>
                </div>
            </div>
        );
    }

    visitPage(e) {
        return;
    }
}