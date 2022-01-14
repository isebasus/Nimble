import React, { Component } from 'react';
import Header from './Header.js';
import MockupItem from './MockupItem';
import ImageItem from './ImageItem.js';


export default class Checkout extends Component {
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
        var count = 0;
        for (var i = 0; i < this.state.cart.length; i++) {
            if (this.state.cart[i].mockup != undefined && this.state.cart[i].vector != undefined) {
                count++;
            }
        }

        var display;
        if (this.state.cart.length == 0 || count != this.state.cart.length) {
            display = <h2 className="caption" >Please upload mockups to cart to proceed.</h2>
        } else {
            display = <Items></Items>
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
                <h1 className="first" style={{marginBottom: "90px"}}>Checkout<a id="text"></a></h1>
                <h2 className="caption" style={{marginBottom: "0px", fontSize:"2.4rem", color: "rgba(0, 0, 0, 0.58)"}} id="pCaption"><a className="tprice">CHECKOUT WITH MADMERCH</a></h2>
                {display}
              </div>
        </div>
        )
    }
}

export class Items extends React.Component {

    constructor(props) {
        super(props);
        var data = JSON.parse(window.localStorage.getItem('newCart'));
        data.loaded = false;
        data.price = 0;
        this.state = data || {
            combinedData: []
        }
        this.checkout = "Checkout";
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
        /*
        var price = 0;
        this.state.newCart.map((item) => {
            price += (item.price * item.totalQuantity);
        });
        this.setState({price: price})
        }
        */
      return (
        <div>
            <div class="basketItems" style={{gridTemplateColumns: "repeat(1, 1fr)", gap: "15px 15px", overflow: "hidden", opacity: "1", right: "0px", position: "relative", width: "100%", marginTop: "30px"}}>
                {this.state.combinedData.map((item) => 
                    <ImageItem name={item.name} color={item.color} units={item.totalQuantity} mockupPrice={item.mockupPrice} totalQuantity={item.totalQuantity} sizes={item.sizes} price={item.price} notes={item.notes} image={item.mockup} id={item.id}></ImageItem>
                )}
            </div>
        </div>
      )
    }
  }