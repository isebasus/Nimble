import React, { Component } from 'react';
import Header from '../Header.js';
import ImageItem from './ImageItem.js';
import Loader from "react-loader-spinner";


export default class Checkout extends Component {
    constructor(props) {
        super(props);
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
                <h2 className="caption" style={{marginBottom: "0px", fontSize:"2.4rem", color: "rgba(0, 0, 0, 0.58)", fontWeight: "800"}} id="pCaption">CHECKOUT WITH MADMERCH</h2>
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
        this.state = {items: [], loading: true, loaded: false, isPressed: "none", check: "Purchase"};
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

    setFirstName(firstName) { this.setState({firstName: firstName});}

    setLastName(lastName) {this.setState({lastName: lastName});}

    setAddress(address) {this.setState({address: address})}

    setStateInfo(state) {this.setState({state: state})}

    setCountry(country) {this.setState({country: country})}
    
    setZip(zip) {this.setState({zip: zip})}

    setEmail(email) {this.setState({email: email})}

    setPhone(phone) {this.setState({phone: phone})}

    validateEmail(email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    
    checkFeild(feild, error) {
        if (feild == null || feild == "") {
            this.setState({checkout: error});
            return true;
        }
        return false;
    }

    checkEmail() {
        if (this.state.email != null) {
            if (this.validateEmail(this.state.email) == true) {
                this.setState({checkout: "Email is not formatted correctly"});
                return true;
            }
        }
        return false;
    }

    addInformation() {
        // Check all Missing items
        if (this.checkFeild(this.state.firstName, "Missing First Name") == true) return; 
        if (this.checkFeild(this.state.lastName, "Missing Last Name") == true) return; 
        if (this.checkFeild(this.state.address, "Missing Address") == true) return; 
        if (this.checkFeild(this.state.state, "Missing State") == true) return; 
        if (this.checkFeild(this.state.country, "Missing Country") == true) return; 
        if (this.checkFeild(this.state.zip, "Missing Zip") == true) return; 

        // Check Email
        if (this.checkEmail.bind(this) == true) return;
        if (this.checkFeild(this.state.email, "Missing Email") == true) return; 
        if (this.checkFeild(this.state.phone, "Missing Phone Number") == true) return; 

        this.setState({isPressed: "block", check: ""});

        // Proceed to add all information to API


        // Once everything is done
        this.setState({checkout: "", isPressed: "none", check: "Checkout"});
    }

    static renderItems(items, isPressed, check, addInformation) {
        var price = 0;
        items.map(item => {
            price += item.TotalPrice;
        })
        var taxes = (price * 0.098).toFixed();
        var totalPrice = parseInt(taxes) + price;
        return (
            <div>
                {items.map(item =>
                    <ImageItem name={item.Name} merchPrice={item.MerchPrice} color={item.Color} units={item.TotalQuantity} mockupPrice={item.MockupPrice} totalQuantity={item.TotalQuantity} sizes={item.Sizes} price={item.TotalPrice} notes={item.Notes} image={item.Mockup} id={item.MerchId} cartIds={item.CartIds}></ImageItem>
                )}
                <h2 className="caption" style={{marginBottom: "0px", fontSize:"1.2rem", marginTop: "15px", textAlign: "left", marginLeft: "5px"}} id="pCaption"><a className="tprice">subtotal: ${price}</a></h2>
                <h2 className="caption" style={{marginBottom: "10px", fontSize:"1.2rem", marginTop: "5px", textAlign: "left", marginLeft: "5px"}} id="pCaption"><a className="tprice" style={{fontWeight: "200"}}>taxes and fees: ${taxes}</a></h2>
                <h2 className="caption" style={{marginBottom: "0px", fontSize:"2.4rem", marginTop: "18px", textAlign: "left", marginLeft: "5px", borderTop: "2px solid #cccccc", paddingTop: "5px", borderRadius: "2px"}} id="pCaption"><a className="tprice">Total: ${totalPrice}</a><a class="button" style={{float: "right", marginTop: "6px"}} onClick={addInformation}>{check}<Loader style={{display: isPressed}} type="ThreeDots" color="#000000" height={8} width={60}timeout={3000} /></a></h2>
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
            : Items.renderItems(this.state.items, this.state.isPressed, this.state.check, this.addInformation.bind(this));
        }
      return (
        <div>
            <div class="basketItems" style={{gridTemplateColumns: "repeat(2, 1fr)", gap: "15px 15px", overflow: "hidden", opacity: "1", right: "0px", position: "relative", width: "100%", marginTop: "30px"}}>
                <input className="inputForm" type="text" placeholder='FIRST NAME:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}} onChange={event => this.props.setFirstName(event.target.value)} />
                <input className="inputForm" type="text" placeholder='LAST NAME:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}} onChange={event => this.props.setLastName(event.target.value)} />
                <input className="inputForm" type="text" placeholder='ADDRESS:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}} onChange={event => this.props.setAddress(event.target.value)} />
                <input className="inputForm" type="text" placeholder='STATE:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}} onChange={event => this.props.setStateInfo(event.target.value)} />
                <input className="inputForm" type="text" placeholder='COUNTRY:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}} onChange={event => this.props.setCountry(event.target.value)}/>
                <input className="inputForm" type="text" placeholder='ZIP:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}} onChange={event => this.props.setZip(event.target.value)} />
                <input className="inputForm" type="text" placeholder='EMAIL:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}} onChange={event => this.props.setEmail(event.target.value)}  />
                <input className="inputForm" type="text" placeholder='PHONE:' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}} onChange={event => this.props.setPhone(event.target.value)} />
            </div>
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