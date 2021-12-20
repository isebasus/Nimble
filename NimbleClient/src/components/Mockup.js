import React, { Component } from 'react';
import Header from './Header.js';

export default class Mockup extends Component {
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

    render() {
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
              </div>
        </div>
        )
    }
}