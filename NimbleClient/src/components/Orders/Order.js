import React, { Component } from 'react';
import Header from '../Header.js';
import ImageItem from '../ImageItem.js';
import UserItem from './UserItems/UserItems.js';
import Loader from "react-loader-spinner";
import { useParams } from 'react-router';

export default class Order extends Component {
    constructor(props) {
        super(props);
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
                <h1 className="first" style={{marginBottom: "20px"}}>YOUR MERCH IS IN PRODUCTION<a id="text"></a></h1>
                <Items match={this.props.match}></Items>
              </div>
        </div>
        )
    }
}

export class Items extends React.Component {

    constructor(props) {
        super(props);
        this.checkout = "Checkout";
        this.state = {items: [], loading: true, loaded: false, notFound: false};
    }

    static renderItems(items) {
        var price = 0;
        items.map(item => {
            price += item.TotalPrice;
        })
        var taxes = price * 0.098;
        var totalPrice = taxes + price;
        return (
            <div>
                {items.map(item =>
                    <UserItem name={item.Name} merchPrice={item.MerchPrice} color={item.Color} units={item.TotalQuantity} mockupPrice={item.MockupPrice} totalQuantity={item.TotalQuantity} sizes={item.Sizes} price={item.TotalPrice} notes={item.Notes} image={item.Mockup} id={item.MerchId} cartIds={item.CartIds}></UserItem>
                )}
                <h2 className="caption" style={{marginBottom: "0px", fontSize:"2.4rem", marginTop: "18px", textAlign: "left", marginLeft: "5px"}} id="pCaption"><a className="tprice">Total: ${totalPrice} USD</a></h2>
            </div>
        );
    }

    render() {
        if (this.state.loaded == false) {
            this.getData();
            this.setState({loaded: true});
        }

        let contents;
        if (this.state.notFound == true) {
            contents = <p style={{fontWeight: 300, fontSize: "1.2em"}}>No order found.</p>
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
            <div class="basketItems" style={{gridTemplateColumns: "repeat(2, 1fr)", gap: "15px 15px", overflow: "hidden", opacity: "1", right: "0px", position: "relative", width: "100%", marginTop: "30px"}}>
                <input className="inputForm" type="text" placeholder='FIRST NAME:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}}/>
                <input className="inputForm" type="text" placeholder='LAST NAME:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}}/>
                <input className="inputForm" type="text" placeholder='ADDRESS:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}}/>
                <input className="inputForm" type="text" placeholder='STATE:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}}/>
                <input className="inputForm" type="text" placeholder='COUNTRY:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}}/>
                <input className="inputForm" type="text" placeholder='ZIP:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}}/>
                <input className="inputForm" type="text" placeholder='EMAIL:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}}/>
                <input className="inputForm" type="text" placeholder='PHONE:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}}/>
            </div>
        </div>
      )
    }

    async getData() {
        var id = this.props.match.params.id + "";
        console.log(this.props.match)
        const formData = new FormData();
        formData.append('userId', JSON.stringify(id));
        const response = await fetch('/api/getCustomer', {
            method: 'POST',
            body: formData
        })

        const res = await response.json();
        if (res == "none") {
            this.setState({notFound: true, loading: false});
            return;
        }

        console.log(res.Items);
        this.setState({items: res.Items, loading: false, user: res})
    }
  }