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
    
    render() {
        return (
            <div class="basketItems" style={{gridTemplateColumns: "repeat(1, 1fr)", gap: "15px 15px", overflow: "hidden"}}>
                  {this.status}
                  {this.state.cart.map((item, i) => 
                    <CartItem name={item.name} color={item.color} units={item.quantity} size={item.size}></CartItem>
                  )}
            </div>
        );
    }

    search(e){
        this.props.history.push(this.props.matchPath);
    }
}