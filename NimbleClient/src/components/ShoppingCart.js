import React, { Component } from 'react';
import CartItem from './CartItem.js';

export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            cart: []
        }
        this.status = window.localStorage.getItem('state') == null ? "Empty Basket" : "";
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (window.localStorage.getItem('state') != null && JSON.parse(window.localStorage.getItem('state')).cart.length > 0) {
                this.setState(JSON.parse(window.localStorage.getItem('state')));
                this.status = "";
            } else {
                this.setState({cart: []});
                this.status = "Empty Basket";
            }
        }, 500)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    addMockups() {
        this.props.history.push('/add-mockups');
    }
    
    render() {
        return (
            <div>
                <div class="basketItems" style={{gridTemplateColumns: "repeat(1, 1fr)", gap: "15px 15px", overflow: "hidden"}}>
                  {this.status}
                  {this.state.cart.map((item) => 
                    <CartItem name={item.name} color={item.color} units={item.quantity} size={item.size} price={item.price} id={item.id}></CartItem>
                  )}
                  <a class="sizeButton" style={{marginTop: "0px", maxWidth: "100%", marginRight: "0px"}} onClick={this.addMockups.bind(this)}>Create Mockups</a>
                </div>
            </div>
        );
    }

    search(e){
        this.props.history.push(this.props.matchPath);
    }
}