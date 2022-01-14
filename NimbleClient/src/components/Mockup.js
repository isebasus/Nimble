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

        var combinedData = [];
        var verifiedIds = [];
        this.state.cart.map((item) => {
            var id = item.mockupEncoded + item.color + item.name;
            
            var index = null;
            for(var i = 0; i < verifiedIds.length; i++) {
                if (verifiedIds[i] == id) {
                    index = i;
                }
            }

            if (index == null) {
                verifiedIds.push(id);
                var prices = JSON.parse(window.localStorage.getItem('checkout'));
                
                var totalPrice = 0;
                var mockupPrice = 0;
                for (var i = 0; i < prices.length; i++) {
                    if (prices[i].id == item.id) {
                        totalPrice = prices[i].totalPrice;
                        mockupPrice = prices[i].mockupPrice;
                    }
                }

                var dict = {};
                dict[item.size] = item.quantity;
                combinedData.push({name: item.name, mockup: item.mockup, vector: item.vector, mockupPrice: mockupPrice, price: totalPrice, totalQuantity: item.quantity, notes: item.notes, id: id, color: item.color, sizes: dict});
            } else if (combinedData[index].name == item.name && combinedData[index].color == item.color) {
                var prices = JSON.parse(window.localStorage.getItem('checkout'));
                
                var totalPrice = 0;
                var mockupPrice = 0;
                for (var i = 0; i < prices.length; i++) {
                    if (prices[i].id == item.id) {
                        totalPrice = prices[i].totalPrice;
                        mockupPrice = prices[i].mockupPrice;
                    }
                }

                var dict = combinedData[index].sizes;

                if (dict[item.size] == null) {
                    dict[item.size] = item.quantity;
                } else {
                    dict[item.size] += item.quantity;
                }
                var currPrice = combinedData[index].price + (totalPrice);
                var currQuantity = combinedData[index].totalQuantity + item.quantity;
                combinedData[index] = {name: item.name, mockup: item.mockup, vector: item.vector, mockupPrice: mockupPrice, totalQuantity: currQuantity, price: currPrice, notes: item.notes, id: id, color: item.color, sizes: dict}
            }
        });
        
        var data = {
            combinedData
        }
        window.localStorage.setItem('newCart', JSON.stringify(data));
        this.props.history.push('/checkout');
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
            if (parsedData.cart[i].mockup != undefined && parsedData.cart[i].vector != undefined) {
                if (this.state.notes[parsedData.cart[i].id] != null) {
                    modifiedData.cart[i]["notes"] = this.state.notes[parsedData.cart[i].id];
                    window.localStorage.setItem('state', JSON.stringify(modifiedData));
                }
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

        if (window.localStorage.getItem('checkout') != null) {
            window.localStorage.removeItem('checkout');
        }

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