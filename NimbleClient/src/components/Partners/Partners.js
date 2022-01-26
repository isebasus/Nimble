import React, { Component} from 'react';
import Header from '../Header';
import Company from './Companies/Company';
import Loader from "react-loader-spinner";

export default class Partners extends React.Component {
    static location = Location;
    static history = null;
  
    constructor(props){
      super(props);
      this.state = {loaded: false, loading: true, items: []}
    };

    static renderCompanies(items) {
      return (
        <div>
          {items.map(item => 
            <Company name={item.CompanyName} ratings={item.Ratings} image={item.Logo} description={item.Description}></Company>
          )}
        </div>
      )
    }
  
    render() {  
      if (this.state.loaded == false) {
        this.getData();
        this.setState({loaded: true});
      }
      let contents = this.state.loading
      ? <Loader style={{display: this.state.loading}} type="ThreeDots" color="#000000" height={8} width={60}timeout={3000}/>
      : Partners.renderCompanies(this.state.items);

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
  
                  <h1 className="first">Partners <a id="text"></a></h1>
                  <div class="basketItems" style={{gridTemplateColumns: "repeat(1, 1fr)", gap: "15px 15px", overflow: "hidden", opacity: "1", right: "0px", position: "relative", width: "100%"}}>
                    {contents}
                  </div>
                </div>
            </div>
      );
    }

    async getData() {
      const response = await fetch('/api/getCompanies', {
        method: 'GET'
      });
      const res = await response.json();
      console.log(res);
      this.setState({items: res, loading: false});
    }
  }