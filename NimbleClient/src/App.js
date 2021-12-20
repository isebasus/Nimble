import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useLocation} from "react-router-dom";
import BlankDescription from './components/jsx/BlankDescription.jsx';
import MerchType from './components/MerchType.js';
import { createBrowserHistory, createHashHistory } from 'history';
import ShoppingCart from './components/ShoppingCart.js';
import { MerchPage } from './components/MerchPage.js';
import qwertyVideo from '../src/videos/qwertyVideo.mp4';
import Description from './components/jsx/Description.js';
import {FetchData} from './components/FetchData.js';
import Header from './components/Header.js';
import Basket from './components/Basket.js';
import Mockup from './components/Mockup.js'
import './styles/App.css';

function App() {
  return (
    <Router history={createBrowserHistory}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>                   
          <Route path='/fetch-data' component={FetchData} />   
          <Route path={"/choose-merch"} component={ChooseMerch}></Route>
          <Route path={"/los-angeles-apparel"} component={Merch}></Route>
          <Route path={"/gildan-apparel"} component={Merch}></Route>
          <Route path={"/comfort-colors-apparel"} component={Merch}></Route>
          <Route path={"/alstyle-apparel"} component={Merch}></Route>
          <Route path={"/add-mockups"} component={Mockup}></Route>
        </Switch>
      </div>
    </Router>
  );
}

class Home extends React.Component {
  qwerty = () => {
    this.props.history.push('/designer')
  }

  ChooseMerch = () => {
    this.props.history.push('/choose-merch')
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

export class ChooseMerch extends React.Component {
  static location = Location;
  static history = null;

  constructor(props){
    super(props);
    this.location = props.location;
    this.overrideLocation();
    this.history = this.props.history;
  };

  losAngelesApparel = () => {
    this.props.history.push("/los-angeles-apparel");
  }

  gildanApparel = () => {
    this.props.history.push("/gildan-apparel");
  }

  comfortApparel = () => { 
    this.props.history.push("/comfort-colors-apparel");
  }

  alstyleApparel = () => {
    this.props.history.push("/alstyle-apparel");
  }

  render() {

    const exactPath = `${this.props.match.path}/`;
    const laPath = `${this.props.match.path}/la-apparel`;
    const gildanPath = `${this.props.match.path}/gildan`;

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

                <h1 className="first">Choose your Blanks<a id="text"></a></h1>
                <div className="columns">
                    <MerchType projectId="laa" path={this.losAngelesApparel} matchPath={laPath} history={this.props.history} quality={<a className="quality"> Best Quality</a>} coverId="coverScraper" name="LOS ANGELES APPAREL"></MerchType>
                    <MerchType projectId="gildan" path={this.gildanApparel} matchPath={gildanPath} history={this.props.history} quality={<a className="quality2"> Best Price</a>} coverId="coverScraper" name="GILDAN"></MerchType>
                    <MerchType projectId="comfortColors" path={this.comfortApparel} coverId="coverScraper"name="COMFORT COLORS"></MerchType>
                    <MerchType projectId="alstyle" path={this.alstyleApparel} coverId="coverScraper"name="ALSTYLE"></MerchType>
                </div>
            </div>
            <Switch location={this.location}>
                <Route exact path={exactPath} component={this} />
            </Switch>
            <Route path={laPath} component={LosAngelesApparel}/>
            <Route path={gildanPath} component={Gildan}></Route>
        </div>
    );
  }

  overrideLocation() {
    let location = Object.assign({}, this.props.location)
    location.pathname = this.props.match
    this.location = location
  }
}

export class Merch extends React.Component {
  
  static location = Location;
  static history = null;

  constructor(props){
    super(props);
    this.location = props.location;
    this.overrideLocation();
    this.history = this.props.history;
  };

  render() {

    var merch;
    var name = "";
    var caption = "";

    var matchPath = [];
    const location = this.props.location.pathname;
    const exactPath = `${this.props.match.path}/`;

    switch(location) {
      case '/los-angeles-apparel':
        name = "Los Angeles Apparel"
        caption = "The best merch made in the USA."
        matchPath = [`${this.props.match.path}/1801gd`, `${this.props.match.path}/1809gd`, `${this.props.match.path}/hf09`, `${this.props.match.path}/hf10`]
        merch = {
          GarmentDiedTshirt: ["laa", ['#914637', '#e30e11', '#2e9e50', '#eb6134', '#eb9ba8', '#7da88a', '#1704bf', '#88a2cf', '#030303', '#d9d9d9', '#f7f7f7'], "1801GD T-SHIRT", "$16 / SHIRT", matchPath[0]],
          PocketTShirt: ["gildan", ['#914637', '#e30e11', '#2e9e50'], "1809GD T-SHIRT", "$16 / SHIRT", matchPath[1]],
          GarmentDiedHoodie: ["comfortColors", ['#914637', '#e30e11', '#2e9e50'], "HF-09 HOODIE", "$26 / HOODIE", matchPath[2]],
          ZipUpHoodie: ["alstyle", ['#914637', '#e30e11', '#2e9e50'], "HF-10 HOODIE", "$26 / HOODIE", matchPath[3]]
        }
        break;
      case '/gildan-apparel':
        name = "Gildan"
        caption = "Best priced merch on the market."

        matchPath = [`${this.props.match.path}/regular-shirt`, `${this.props.match.path}/hoodie`]
        merch = {
          RegularShirt: ["laa", ['#914637', '#e30e11', '#2e9e50', '#eb6134', '#eb9ba8', '#7da88a', '#1704bf', '#88a2cf', '#030303', '#d9d9d9', '#f7f7f7'], "GILDAN T-SHIRT", "16 / SHIRT", matchPath[0]],
          Hoodie: ["gildan", ['#914637', '#e30e11', '#2e9e50'], "GILDAN HOODIE", "$16 / SHIRT", matchPath[1]],
        }
        break;
      case '/comfort-colors-apparel':
        name = "Comfort Colors"
        caption = "Best comfort for cheap."

        matchPath = [`${this.props.match.path}/shirt`]
        merch = {
          Shirt: ["laa", ['#914637', '#e30e11', '#2e9e50', '#eb6134', '#eb9ba8', '#7da88a', '#1704bf', '#88a2cf', '#030303', '#d9d9d9', '#f7f7f7'], "COMFORT COLORS T-SHIRT", "16 / SHIRT", matchPath[0]],
        }
        break;
      case '/alstyle-apparel':
        name = "Alstyle"
        caption = "Not the best merch."

        matchPath = [`${this.props.match.path}/shirt`]
        merch = {
          Shirt: ["laa", ['#914637', '#e30e11', '#2e9e50', '#eb6134', '#eb9ba8', '#7da88a', '#1704bf', '#88a2cf', '#030303', '#d9d9d9', '#f7f7f7'], "ALSTYLE T-SHIRT", "16 / SHIRT", matchPath[0]],
        }
        break;
    }

    return (
      <div>
        <MerchPage name={name} caption={caption} merch={merch} history={this.props.history} matchPath={matchPath} location={this.props.location.pathname}></MerchPage>
        <Switch location={this.location}>
          <Route exact path={exactPath} component={this} />
        </Switch>
        {matchPath.map((path) => 
          <Route path={path} component={ApparelDescription}/>
        )}
      </div>
    )
  }

  overrideLocation() {
    let location = Object.assign({}, this.props.location)
    location.pathname = this.props.match
    this.location = location
  }


}

export class ApparelDescription extends React.Component {
  render(){
    return(
      <Description 
      video={qwertyVideo} 
      projectName="Hamming"
      caption="Hamming Encoding"
      p1="This Web Proxy was originally created for the necessity of searching up websites under my high school wifi. As a result, most websites under the school wifi are blocked so a web proxy would save the day. Until, of course, one day it would finally become a blocked website as well."
      p2="This project was created with the Flask web server. This application works by HTTP requesting a website to grab its HTML under a given search string. As a result, once the application has the HTMl it could use the css and js links to fully render the site. It does this by integrating this servers domain in front of the css and js links in the HTML so that way it could request the css and js from my server. It of course does not work for every single website, but it still needs work to be done."
      p3="Overall, this project was a pain at first, trying to figure out how to render the HTML and css, but it was really fun in my opinion. Check out the code on my GitHub and also check out my website! ❤️ Links above."
      website={ <p><a class="button">View Design</a> </p>}
      link="https://docs.google.com/document/d/1TV7tv_EihiZ0EpDRFjV8yQ-Bk1MdsqCt-646f9M02Vk/edit?usp=sharing"
      gitLink="https://github.com/isebasus/hamming/"
      >
      </Description>
    )
  }
}

export class LosAngelesApparel extends React.Component{
  constructor(props){
    super(props);
  };

  back = () => {
    this.props.history.push('/choose-merch');
  }

  render(){
    return(
      <BlankDescription 
      onClick={this.back} 
      caption="Merch made in the USA." 
      title="Los Angeles Apparel"
      padding="130px"
      imageClass="laaGarments"
      technology1="devicon-python-plain"
      technology2="devicon-html5-plain"
      technology3="devicon-javascript-plain"
      type1="Python"
      type2="HTML5/CSS"
      type3="JavaScript"
      gitLink="https://github.com/ZumbaMaster313/YoutubeWebScraper"
      ></BlankDescription>
    )
  }
}

export class Gildan extends React.Component{
  constructor(props){
    super(props);
  };

  back = () => {
    this.props.history.push('/choose-merch');
  }

  render(){
    return(
      <BlankDescription 
      onClick={this.back} 
      caption="Best priced shirt on the market." 
      title="Gildan"
      padding="130px"
      imageClass="gildanGarments"
      technology1="devicon-python-plain"
      technology2="devicon-html5-plain"
      technology3="devicon-javascript-plain"
      type1="Python"
      type2="HTML5/CSS"
      type3="JavaScript"
      gitLink="https://github.com/ZumbaMaster313/YoutubeWebScraper"
      ></BlankDescription>
    )
  }
}


export default App;
