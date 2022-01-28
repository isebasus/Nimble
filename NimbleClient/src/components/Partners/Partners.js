import React, { Component} from 'react';
import Header from '../Header';
import Company from './Companies/Company.js';
import Loader from "react-loader-spinner";

export default class Partners extends React.Component {
    static location = Location;
  
    constructor(props){
      super(props);
      this.state = {loaded: false, loading: true, items: []}
      this.location = props.location;
      this.overrideLocation();
    };

    static renderCompanies(items, history) {
      return (
        <div>
          {items.map(item => 
            <Company name={item.CompanyName} ratings={item.Ratings} image={item.Logo} description={item.Description} history={history}></Company>
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
      : Partners.renderCompanies(this.state.items, this.props.history);

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
  
                  <h1 className="first" style={{marginBottom: "0px", textAlign: "left"}}>Partners <a id="text"></a></h1>
                  <h2 className="caption" style={{textAlign: "left", marginBottom: "0px", marginTop: "0px", fontWeight: "900", opacity: 0.8}}>Choose your manufacturer.</h2>
                  <div class="basketItems" style={{gridTemplateColumns: "repeat(1, 1fr)", gap: "15px 15px", overflow: "hidden", opacity: "1", right: "0px", position: "relative", width: "100%", marginTop: "20px", backgroundColor: "rgba(0, 0, 0, 0.065)"}}>
                    {contents}
                  </div>
                </div>
            </div>
      );
    }

    overrideLocation() {
      let location = Object.assign({}, this.props.location)
      location.pathname = this.props.match
      this.location = location
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