import React, { Component } from 'react';
import CartItem from './CartItem.js';

export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            cart: []
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (window.localStorage.getItem('state') != null) {
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
        return (
            <div class="basketItems" style={{gridTemplateColumns: "repeat(1, 1fr)", gap: "15px 15px", overflow: "hidden"}}>
                  {this.state.cart.map((item, i) => 
                    <CartItem name={item.name} color={item.color} units={item.quantity}></CartItem>
                  )}
            </div>
        );
    }

    search(e){
        this.props.history.push(this.props.matchPath);
    }
}