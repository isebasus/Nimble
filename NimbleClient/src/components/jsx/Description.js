import React, { Component} from 'react';

export default class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {size: "", color: "", quantity: 15, buttonSizeState: Array(this.props.sizes.length).fill("sizeButton"), buttonColorState: Array(this.props.colors.length).fill("palette"), error: ""}
    }

    setWindowState(state) {
        var w = window.localStorage.getItem('state');
        if (w != null) {
            var parsedData = JSON.parse(w);
            for(var i = 0; i < parsedData.cart.length; i++) {
                if (parsedData.cart[i].id == state.id) {
                    parsedData.cart[i].quantity += state.quantity;
                    window.localStorage.setItem('state', JSON.stringify(parsedData));
                    return;
                }
            }

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
                <h1 className="first2" id="title">{this.props.name}</h1>
                <h2 className="caption" style={{marginBottom: '10px'}} id="pCaption">{this.props.caption}</h2>
                <div className="box" id={this.props.image}></div>
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
                    <input className="inputBox" min="15" type="number" placeholder="15" style={{marginRight: '10px', display: 'inline'}} onChange={event => this.setState({quantity: parseInt(event.target.value)})}/>
                    <a class="sizeButton" style={{marginRight: '10px', display: 'inline'}} onClick={this.addToBag.bind(this)}>Add To Cart</a>
                </div>
                <h2 className="caption" style={{marginBottom: '0px', fontSize: '20px', marginTop:'30px'}} id="pCaption">{this.state.error}</h2>
                <h3 id="t-description" classNamclassName="projectDescription">{this.props.p1}</h3>
                <h3 id="t-description" className="projectDescription">{this.props.p2}</h3>
                <h3 id="t-description" className="projectDescription">{this.props.p2b}</h3>
                <h3 id="t-description" className="projectDescription">{this.props.p3}<a class={this.props.clas} href={this.props.href}>{this.props.details}</a>{this.props.p3b}</h3>
                <h3 id="t-description" className="projectDescription"></h3>
                <h3 id="t-description" className="projectDescription"></h3>
            </div>
        )
    }

    goBack(){
        this.props.history.goBack();
    }

    setSize(s, i) {
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
        if (this.state.quantity < 15) {
            this.setState({error: "You cannot order less than 15 units."});
            return;
        }

        if (this.state.color == "") {
            this.setState({error: "Please choose a color."});
            return;
        }

        if (this.state.size == "") {
            this.setState({error: "Please choose a size."});
            return;
        }
        var data = {
            "id": this.props.name + this.state.color + this.state.size,
            "name": this.props.name,
            "caption": this.props.caption,
            "color": this.state.color,
            "size": this.state.size,
            "quantity": this.state.quantity,
            "image": this.props.image
        }
        this.setWindowState(data);
    }

}