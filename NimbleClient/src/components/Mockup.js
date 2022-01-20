import React, { Component } from 'react';
import Header from './Header.js';
import MockupItem from './MockupItem';
import Loader from "react-loader-spinner";

export default class Mockup extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            cart: []
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (window.localStorage.getItem('state') == null) {
                return;
            }

            if (JSON.parse(window.localStorage.getItem('state')).cart.length > 0) {
                this.setState(JSON.parse(window.localStorage.getItem('state')));
            } else {
                this.setState({cart: []});
            }
        }, 500)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        var display;
        if (this.state.cart.length == 0) {
            display = <h2 className="caption" >You have an empty cart.</h2>
        } else {
            display = <Items history={this.props.history}></Items>
        }

        return (
            <div className="body">
              <Header history={this.props.history}></Header>
              <div className="merch">
                <nav className="navBar">
                      <a class="navItems">Home</a>
                      <a class="navItems">About</a>
                      <a class="navItems">Partners</a>
                      <a class="navItems">Builder</a>
                      <a class="navItems">Order</a>
                </nav>
                <h1 className="first" style={{fontSize: "4.5rem"}}>Upload Your Design<a id="text"></a></h1>
                {display}
              </div>
        </div>
        )
    }
}

export class Items extends React.Component {

    constructor(props) {
        super(props);
        
        var data = JSON.parse(window.localStorage.getItem('state'));
        data.checkout = "";
        data.loading = "none";
        data.check = "Checkout";
        data.notes = {};
        this.state = data || {
            cart: []
        }

        this.setNotes = this.setNotes.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (window.localStorage.getItem('state') == null) {
                return;
            }

            if (JSON.parse(window.localStorage.getItem('state')).cart.length > 0) {
                this.setState(JSON.parse(window.localStorage.getItem('state')));
            } else {
                this.setState({cart: []});
            }
        }, 500)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    pushCheckout() {
        //this.props.history.push('/checkout');
        return;
    }

    setNotes(id, notes) {
        var dict = this.state.notes;
        dict[id] = notes;

        this.setState({notes: dict});
    }

    checkout() {
        var count = 0;
        var parsedData = JSON.parse(window.localStorage.getItem('state'));
        var modifiedData = JSON.parse(window.localStorage.getItem('state'));
        for (var i = 0; i < parsedData.cart.length; i++) {
            if (parsedData.cart[i].mockupUploaded == true && parsedData.cart[i].vectorUploaded == true) {
                if (this.state.notes[parsedData.cart[i].id] != null) {
                    modifiedData.cart[i]["notes"] = this.state.notes[parsedData.cart[i].id];
                    window.localStorage.setItem('state', JSON.stringify(modifiedData));
                }
                count++;
            }

            if (parsedData.cart[i].mockupUploaded == false && parsedData.cart[i].vectorUploaded == true) {
                this.setState({checkout: "A mockup is missing."});
                return;
            }

            if (parsedData.cart[i].mockupUploaded == true && parsedData.cart[i].vectorUploaded == false) {
                this.setState({checkout: "A vector file is missing."});
                return;
            }
        }
        this.setState({loading: "block", check: ""});
        if (count == parsedData.cart.length) {
            this.sendData(parsedData);
            return;
        }
        
        var errMargin = '' + parsedData.cart.length - count;
        var message = "Please add " + errMargin + " more mockup and vector files.";
        this.setState({checkout: message, loading: "none", check: "Checkout"});
    }

    render(){
        var price = 0;
        this.state.cart.map((item) => {
            price += (item.price * item.quantity);
        });
      return (
        <div>
            <div class="basketItems" style={{gridTemplateColumns: "repeat(1, 1fr)", gap: "15px 15px", overflow: "hidden", opacity: "1", right: "0px", position: "relative", width: "100%"}}>
                {this.state.cart.map((item) => 
                    <MockupItem setNotes={this.setNotes} name={item.name} color={item.color} notes={item.notes} units={item.quantity} size={item.size} price={item.price} image={item.image} id={item.id}></MockupItem>
                )}
                <h2 className="caption" style={{marginBottom: "0px", fontSize:"2.4rem", marginTop: "0px", textAlign: "left", marginLeft: "5px"}} id="pCaption"><a className="tprice">Total: ${price}</a> <a class="button" style={{float: "right", marginTop: "3px"}} onClick={this.checkout.bind(this)}>{this.state.check}<Loader style={{display: this.state.loading}} type="ThreeDots" color="#000000" height={8} width={60}timeout={3000} /></a></h2>
                <h2 className="caption" style={{marginBottom: "0px", fontSize:"1rem", color: "rgba(0, 0, 0, 0.58)", marginTop: "0px", textAlign: "right"}} id="pCaption"><a className="tprice">{this.state.checkout}</a></h2>
            </div>
            
        </div>
      )
    }

    async sendData(data) {
        const formData = new FormData();
        for (var i = 0; i < data.cart.length; i++) {
            if (data.cart[i].mockupUploaded == false && data.cart[i].vectorUploaded == false) {
                return;
            }
        }
        if (window.localStorage.getItem('userId') == null) {
            var data = {
                "userId": this.generateUUID()
            }
            window.localStorage.setItem('userId', JSON.stringify(data));
        }

        var parsedData = JSON.parse(window.localStorage.getItem('state'));
        for (var i = 0; i < parsedData.cart.length; i++) {
            parsedData.cart[i]["userId"] = JSON.parse(window.localStorage.getItem('userId')).userId;
        }

        const cartData = new FormData();
        cartData.append('data', JSON.stringify(parsedData.cart));
        const response = await fetch('/api/addUserItemCart', {
            method: 'POST',
            body: cartData
        })
        const res = await response.json();
        console.log(res);

        /*
        var serializedData = []
        for (var cartId in this.state.notes) {
            var d = [cartId, this.state.notes[cartId]];
            serializedData.push(d);
        }

        formData.append('data', JSON.stringify(serializedData));
        formData.append('userId', JSON.stringify(JSON.parse(window.localStorage.getItem('userId')).userId));
        const response = await fetch('/api/uploadNotes', {
            method: 'POST',
            body: formData
        })
        const res = await response.json();
        console.log(res);
        */
        var isUploaded = JSON.parse(window.localStorage.getItem('isUploaded'));
        isUploaded.uploaded = true;
        window.localStorage.setItem('isUploaded', JSON.stringify(isUploaded));
        //this.setState({loading: "none"}, this.pushCheckout);
    }
}

