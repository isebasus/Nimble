import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useLocation} from "react-router-dom";
import BlankDescription from './components/jsx/BlankDescription.jsx';
import MerchType from './components/MerchType.js';
import { createBrowserHistory, createHashHistory } from 'history';
import { MerchPage } from './components/MerchPage.js';
import Description from './components/jsx/Description.js';
import {FetchData} from './components/FetchData.js';
import Header from './components/Header.js';
import Partners from './components/Partners/Partners.js';
import Mockup from './components/Mockup.js';
import Checkout from './components/Checkout/Checkout.js';
import Order from './components/Orders/Order.js';
import ProductionProfile from './components/Partners/ProductionProfiles/ProductionProfile.js';
import Blanks from './components/Partners/Blanks/Blanks.js';
import Merch from './components/Partners/Merch/Merch.js';
import './styles/App.css';

function App() {
  return (
    <Router history={createBrowserHistory}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>                   
          <Route path={"/partners"} component={Partners}></Route>
          <Route path={"/add-mockups"} component={Mockup}></Route>
          <Route path={"/checkout"} component={Checkout}></Route>
          <Route path={"/orders:id"} component={Order}></Route>
          <Route path={"/production-companies"} component={ProductionProfile}></Route>
          <Route path={"/production-brands"} component={Blanks}></Route>
          <Route path={"/production-merch"} component={Merch}></Route>
        </Switch>
      </div>
    </Router>
  );
}

class Home extends React.Component {
  ChooseMerch = () => {
    this.props.history.push('/partners');
  }

  render(){
    return (
      <header className="body">
        <Header history={this.props.history}></Header>
        <div className="projects">

          <nav className="navBar">
            <a class="navItems">Home</a>
            <a class="navItems">About</a>
            <a class="navItems">Partners</a>
            <a class="navItems">Builder</a>
            <a class="navItems">Order</a>
          </nav>

          <h1 className="first">Made Simple.<a id="text"></a></h1>
          <h2 className="caption">Not your average t-shirt maker. Made for <a id="git" href="https://github.com/isebasus/"><a id="text">Creators</a></a> &amp; <a id="res" href="https://drive.google.com/file/d/1IxqVpsvz8np6-Xaz1NG8KTiRZsLrbzxF/view?usp=sharing"><a id="text2">Artists</a></a> like you.  </h2>
          <a class="button" onClick={this.ChooseMerch}>Make some Merch</a>
        </div>
      </header>
    );
    }
}

export default App;
