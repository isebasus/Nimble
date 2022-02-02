import React, { Component, useEffect} from 'react';

export default class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {notes: ""};
    }

    removeItem() {
        var parsedData = JSON.parse(window.localStorage.getItem('state'));
        for (var i = 0; i < parsedData.cart.length; i++) {
            this.props.cartIds.map((id) => {
                if (parsedData.cart[i].id == id) {
                    parsedData.cart.splice(i, 1);
                }
            })
        }
        this.removeItemBackend(this.props.id);
    }

    async removeItemBackend(cartId) {
        var data = [JSON.parse(window.localStorage.getItem('userId')).userId, cartId];
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        const response = await fetch('/api/removeParsedItem', {
            method: 'POST',
            body: formData
        })
        const res = await response.json();
        window.localStorage.reload(false);
        console.log(res);
    }
    
    render() {
        var price = this.props.mockupPrice + this.props.merchPrice;
        var notes = ""; 
        if (this.props.notes != null) {
            notes = Object.values(this.props.notes)[0]
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
            <div className="item" style={{cursor: "default", display: "block", position: "relative", width: "100%", paddingBottom: "0px"}} onClick={this.visitPage.bind(this)}>
                <div style={{paddingBottom: "0px", paddingLeft: "0px", display: "block", height: "100%", position: "relative", width: "100%"}}>
                    <div className="box" style={{width: "20%", height: "100px", objectFit: "cover", borderRadius: "5px", display: "inline", textAlign: "left", marginBottom: "0px", left: "0px", marginRight: "10px", float: "left", backgroundImage: `url(${this.props.image})`}}></div>
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
                
                <a style={{position: "absolute", top: "25px", right: "20px", fontWeight: "700", opacity: "0.8"}} ><a className="tprice">${this.props.mockupPrice} PER PRINT</a></a>
                <a style={{position: "absolute", top: "45px", right: "20px", fontWeight: "700", opacity: "0.8"}} ><a className="tprice">${this.props.merchPrice} PER SHIRT</a></a>
                <h2 className="caption" style={{fontSize:"1rem", color: "rgba(0, 0, 0, 0.80)", width: "40%", textAlign: "left", marginTop: "110px", paddingBottom: "20px", marginBottom: "20px"}} id="pCaption"><a className="tprice">Notes: </a>{notes}</h2>
            </div>
        );
    }

    visitPage(e) {
        return;
    }
}

