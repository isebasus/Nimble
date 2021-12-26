import React, { Component } from 'react';
import Header from './Header.js';
import MockupItem from './MockupItem';

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
                <h1 className="first">Add Some Mockups<a id="text"></a></h1>
                {display}
              </div>
        </div>
        )
    }
}

export class Items extends React.Component {

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

    checkout() {
        return;
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
                <h2 className="caption" style={{marginBottom: "0px", fontSize:"2.4rem", marginTop: "0px", textAlign: "left", marginLeft: "5px"}} id="pCaption"><a className="tprice">Total: ${price}</a> <a class="button" style={{float: "right", marginTop: "3px"}} onClick={this.checkout}>Checkout</a></h2>
            </div>
            
        </div>
      )
    }
  }