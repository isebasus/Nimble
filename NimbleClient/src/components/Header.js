import React, { Component } from 'react';
import ShoppingCart from './ShoppingCart/ShoppingCart.js';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            cart: []
        }
        this.status = window.localStorage.getItem('state') == null ? "" : this.state.cart.length + "x";
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (window.localStorage.getItem('state') == null) {
                return;
            }

            if (JSON.parse(window.localStorage.getItem('state')).cart.length > 0) {
                this.setState(JSON.parse(window.localStorage.getItem('state')));
                this.status = this.state.cart.length + "x";
            } else {
                this.setState({cart: []});
                this.status = "";
            }
        }, 500)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    pushSignUp() {
        this.props.history.push("/sign-in");
    }

    pushHome(){
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <nav>
                <a onClick={this.pushHome.bind(this)} class="logo" id="g" >
                    <h1 className="logoText">NIMBLE</h1>
                </a>
                <a onClick={this.pushSignUp.bind(this)} class="github" id="g" >
                <div style={{width: "50px", height: "50px", backgroundColor: "black", borderRadius: "100px", backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/grocery-274020.appspot.com/o/blankProfilePic.jpeg?alt=media&token=2bfa4c87-61ab-43b8-b941-cba4c7c638b8)`, objectFit: "cover", backgroundSize: "cover", backgroundRepeat: "none"}}></div>
                </a>
                <a class="basket" id="g" style={{marginTop: "24px"}}>
                    <div style={{float: "right"}}>{this.status} Basket</div>
                    <ShoppingCart history={this.props.history}></ShoppingCart>
                </a>
                </nav>
            </div>
        )
    }
}