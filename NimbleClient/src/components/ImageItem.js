import React, { Component, useEffect} from 'react';
import { projectFirestore, projectStorage } from "../firebase/config";

export default class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {notes: ""};
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
        var notes = ""; 
        if (this.props.notes != null) {
            notes = this.props.notes
        } else {
            notes = "none";
        }

        var sizeString = "Sizes: ";
        var sizeDict = {'XS': this.props.sizes['XS'], 'S': this.props.sizes['S'], 'M': this.props.sizes['M'], 'L': this.props.sizes['L'], 'XL': this.props.sizes['XL'], 'XXL': this.props.sizes['XXL'], 'XXXL': this.props.sizes['XXXL']};

        var count = 0;
        for (let size in sizeDict) {
            if (sizeDict[size] == null){
                continue;
            }
            if (count == 0) {
                sizeString += (sizeDict[size] + " " + size);
                count++;
                continue;
            }
            sizeString += (", " + sizeDict[size] + " " + size);
        }

        return (
            <div className="item" style={{cursor: "default", display: "block", height: "fit-content", position: "relative", width: "100%", paddingBottom: "0px"}} onClick={this.visitPage.bind(this)}>
                <div style={{paddingBottom: "0px", paddingLeft: "0px", display: "block", height: "100%", position: "relative", width: "100%"}}>
                    <div className="box" style={{width: "20%", height: "100px", objectFit: "cover", borderRadius: "10px", display: "inline", textAlign: "left", marginBottom: "0px", left: "0px", marginRight: "10px", float: "left", backgroundImage: `url(${this.props.image})`}}></div>
                    <div style={{position: "relative", display: "inline", float: 'left', width: "300px", height: "100%"}}>
                        <div style={{paddingBottom: "0px", paddingLeft: "0px", display: "block"}}>
                            <h2 className="caption" style={{fontSize: "1rem", marginBottom: "0px", textAlign: "left", marginTop: "0px", display: "inline", float: "left", marginRight: "10px", fontWeight: "700"}} id="pCaption">{this.props.name}</h2>
                            <div className="palette" style={{background: `${this.props.color}`, cursor: 'pointer'}}></div>
                        </div>
                        <div className="spacer"></div>
                        <h2 className="caption" style={{fontSize: "0.9rem", marginBottom: "0px", textAlign: "left", marginTop: "25px", left: '0px', position: "absolute"}} id="pCaption">{sizeString}</h2>
                        <h2 className="caption" style={{fontSize: "0.9rem", marginBottom: "0px", textAlign: "left", marginTop: "45px", float: "left", marginLeft: "0px", position: "absolute"}} id="pCaption">{this.props.totalQuantity} units</h2>
                        <h2 className="caption" style={{fontSize: "0.9rem", marginBottom: "0px", textAlign: "left", marginTop: "68px", float: "left", marginLeft: '0px', position: "absolute"}} id="pCaption"><a className="tprice">${this.props.price}</a></h2>
                    </div>
                    
                </div>
                <h2 className="caption" style={{fontSize:"1rem", color: "rgba(0, 0, 0, 0.80)", width: "40%", textAlign: "left", textIndent: "0.7em", marginTop: "110px", marginBottom: "30px"}} id="pCaption"><a className="tprice">Notes: </a>{notes}</h2>
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

