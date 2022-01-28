import React, { Component} from 'react';

export default class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {size: "", color: "", quantity: 15, buttonSizeState: Array(this.props.sizes.length).fill("sizeButton"), buttonColorState: Array(this.props.colors.length).fill("palette"), error: "", added: "Add to Cart", url: null, progress: 0}
    }

    generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    setWindowState(state) {
        var w = window.localStorage.getItem('state');
        window.localStorage.removeItem('newCart');
        window.localStorage.removeItem('checkout');
        if (w != null) {
            var parsedData = JSON.parse(w);
            parsedData.cart.push(state);
            window.localStorage.setItem('state', JSON.stringify(parsedData));
            return;
        }
        var data = {
            cart: []
        }
        data.cart.push(state);
        window.localStorage.setItem('state', JSON.stringify(data));
    }
    render() {
        return(
            <div className="descriptionBody">
                <div className="links" style={{marginTop: "20px", marginBottom: "-20px"}}>
                    <a className="li" onClick={this.goBack.bind(this)}>&larr; Back</a>
                </div>
                <h1 className="first2" id="title" style={{marginBottom: "0px", marginTop: "30px"}}>{this.props.name}</h1>
                <div className="box" style={{backgroundImage: `url(${this.props.image})`, marginTop: "-50px"}}></div>
                <h2 className="caption" style={{fontSize:"2.4rem", color: "rgba(0, 0, 0, 0.58)", marginBottom: "40px", marginTop: "-100px"}} id="pCaption"><a className="tprice">＄{this.props.price} USD / SHIRT</a></h2>
                <div className="centerColors">
                    {this.props.sizes.map((size, i) => 
                        <a class={this.state.buttonSizeState[i]} onClick={this.setSize.bind(this, size, i)}>{size}</a>
                    )}
                </div>
                <div className="spacer"></div>
                <div className="centerColors" style={{paddingLeft: '25px'}}>
                    {this.props.colors.map((color, i) => 
                        <div className={this.state.buttonColorState[i]} onClick={this.setColor.bind(this, color, i)} style={{background: `${color}`, cursor: 'pointer'}}></div>
                    )}
                </div>
                <div className="spacer"></div>
                <div className="centerColors" style={{marginTop: '-10px', paddingBottom: '0px'}}>
                    <input className="inputBox" min="15" type="number" placeholder="15" style={{marginRight: '10px', display: 'inline', maxWidth: "48px"}} onChange={event => this.setState({quantity: parseInt(event.target.value)})}/>
                    <a class="sizeButton" style={{marginRight: '10px', display: 'inline'}} onClick={this.addToBag.bind(this)}>{this.state.added}</a>
                </div>
                <h2 className="caption" style={{marginBottom: '0px', fontSize: '20px', marginTop:'30px'}} id="pCaption">{this.state.error}</h2>
                <h3 id="t-description" className="projectDescription" style={{fontWeight: "700", opacity: "0.8", textIndent: "1em"}}>{this.props.p1}</h3>
            </div>
        )
    }

    goBack(){
        this.props.history.goBack();
    }

    setSize(s, i) {
        this.setState({added: "Add to Cart"});

        var changed = [];
        for(var j = 0; j < this.state.buttonSizeState.length; j++) {
            if (j == i) {
                changed.push("sizeButtonChanged");
            } else {
                changed.push("sizeButton");
            }
        }
        this.setState({size: s, color: this.state.color, quantity: this.state.quantity, buttonSizeState: changed, buttonColorState: this.state.buttonColorState});
    }

    setColor(c, i) {
        this.setState({added: "Add to Cart"});

        var changed = [];
        for(var j = 0; j < this.state.buttonColorState.length; j++) {
            if (j == i) {
                changed.push("paletteChanged");
            } else {
                changed.push("palette");
            }
        }
        this.setState({size: this.state.size, color: c, quantity: this.state.quantity, buttonSizeState: this.state.buttonSizeState, buttonColorState: changed});
    }

    async addToBag(q) {
        if (this.state.color == "") {
            this.setState({error: "Please choose a color."});
            return;
        }

        if (this.state.size == "") {
            this.setState({error: "Please choose a size."});
            return;
        }
        var data = {
            "id": this.generateUUID(),
            "brand": this.props.brand,
            "name": this.props.name,
            "caption": this.props.caption,
            "color": this.state.color,
            "size": this.state.size,
            "quantity": this.state.quantity,
            "image": this.props.image,
            "price": this.props.price,
            "mockupUploaded": false,
            "vectorUploaded": false,
            "company": this.props.company
        }
        this.setWindowState(data);
        this.setState({added: "Added!"});

        var data = {
            uploaded: false
        }
        window.localStorage.setItem('isUploaded', JSON.stringify(data));
    }

}