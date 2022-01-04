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

        this.state = data || {
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

    pushCheckout() {
        this.props.history.push('/checkout');
    }

    checkout() {
        var count = 0;
        var parsedData = JSON.parse(window.localStorage.getItem('state'));
        for (var i = 0; i < parsedData.cart.length; i++) {
            if (parsedData.cart[i].mockup != undefined && parsedData.cart[i].vector != undefined) {
                count++;
            }

            if (parsedData.cart[i].mockup == undefined && parsedData.cart[i].vector != undefined) {
                this.setState({checkout: "A mockup is missing."});
                return;
            }

            if (parsedData.cart[i].mockup != undefined && parsedData.cart[i].vector == undefined) {
                this.setState({checkout: "A vector file is missing."});
                return;
            }
        }

        this.setState({loading: "block", check: ""});
        if (count == parsedData.cart.length) {
            this.sendData(parsedData);
            return;
        }
        this.setState({checkout: "Please add " + parsedData.cart.length - count + " more mockup and vector files."});
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
                    <MockupItem name={item.name} color={item.color} units={item.quantity} size={item.size} price={item.price} image={item.image} id={item.id}></MockupItem>
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
            if (data.cart[i].mockup == undefined && data.cart[i].vector == undefined) {
                return;
            }
        }

        formData.append('data', JSON.stringify(data.cart));

        const response = await fetch('/api/Merch', {
            method: 'POST',
            body: formData
        })
        const res = await response.json();
        window.localStorage.setItem('checkout', JSON.stringify(res));
        this.setState({loading: "none"}, this.pushCheckout);
    }
  }