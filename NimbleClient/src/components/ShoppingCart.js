import React, { Component } from 'react';
import CartItem from './CartItem.js';

export default class ShoppingCart extends Component {

    static props = null;

    constructor(props) {
        super(props);
        this.props = props;
    }
    
    render() {
        return (
            <div className="shoppingMargin">
                <div className="expander">
                    <div className="shoppingCart">
                        <h2 className="cartTitle">BASKET</h2>
                        <a></a>
                        <CartItem type="5041GD SHIRT" ammount="24"/>
                        <CartItem type="5041GD SHIRT" ammount="24"/>
                        <CartItem type="5041GD SHIRT" ammount="24"/>
                        <CartItem type="5041GD SHIRT" ammount="24"/>
                        <CartItem type="5041GD SHIRT" ammount="24"/>
                    </div>
                </div>
            </div>
        );
    }

    search(e){
        this.props.history.push(this.props.matchPath);
    }
}