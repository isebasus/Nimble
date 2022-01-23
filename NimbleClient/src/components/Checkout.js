import React, { Component } from 'react';
import Header from './Header.js';
import MockupItem from './MockupItem';
import ImageItem from './ImageItem.js';
import Loader from "react-loader-spinner";


export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.getCartData();
    }

    getCartData() {
        
        return;
    }

    render() {

        var display;
        var isUploaded = JSON.parse(window.localStorage.getItem('isUploaded'));
        if (isUploaded.uploaded == false) {
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
        this.checkout = "Checkout";
        this.state = {items: [], loading: true, loaded: false};
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

    static renderItems(items) {
        return (
            <div>
                {items.map(item =>
                    <ImageItem name={item.Name} color={item.Color} units={item.TotalQuantity} mockupPrice={item.MockupPrice} totalQuantity={item.TotalQuantity} sizes={item.Sizes} price={item.TotalPrice} notes={item.Notes} image={item.Mockup} id={item.MerchId}></ImageItem>
                )}
            </div>
        );
    }

    render() {
        if (this.state.loaded == false) {
            this.getData();
            this.setState({loaded: true});
        }
        let contents;
        if (JSON.parse(window.localStorage.getItem('state')).cart.length <= 0) {
            contents = <p style={{fontWeight: 300, fontSize: "1.2em"}}>Please add more items to the cart.</p>
        } else {
            contents = this.state.loading 
            ? <Loader style={{display: this.state.loading}} type="ThreeDots" color="#000000" height={8} width={60}timeout={3000}/>
            : Items.renderItems(this.state.items);
        }
      return (
        <div>
            <div class="basketItems" style={{gridTemplateColumns: "repeat(1, 1fr)", gap: "15px 15px", overflow: "hidden", opacity: "1", right: "0px", position: "relative", width: "100%", marginTop: "30px"}}>
                {contents}
            </div>
        </div>
      )
    }

    async getData() {
        const formData = new FormData();
        var userId = JSON.parse(window.localStorage.getItem('userId'));
        formData.append('userId', JSON.stringify(userId.userId));
        const response = await fetch('/api/getUserData', {
            method: 'POST',
            body: formData
        })

        const res = await response.json();
        console.log(res.Items);
        this.setState({items: res.Items, loading: false})
    }
  }