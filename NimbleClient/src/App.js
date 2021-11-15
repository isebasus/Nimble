import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useLocation} from "react-router-dom";
import BlankDescription from './components/jsx/BlankDescription.jsx';
import MerchType from './components/MerchType.js';
import { createBrowserHistory, createHashHistory } from 'history';
import ShoppingCart from './components/ShoppingCart.js';
import { MerchPage } from './components/MerchPage.js';
import qwertyVideo from '../src/videos/qwertyVideo.mp4';
import Description from './components/jsx/Description.jsx';
import {FetchData} from './components/FetchData.js';
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
        <nav>
        <a href="https://github.com/isebasus/"class="logo" id="g" >
          <h1 className="logoText">NIMBLE</h1>
        </a>
         <a href="https://github.com/isebasus/"class="github" id="g" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="40" height="40" fill="rgb(0,0,0)"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
        </a>
        <a href="https://github.com/isebasus/" class="basket" id="g" >
          <a id="text3">1x</a> Basket
        </a>
        </nav>
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
            <nav>
                <a href="https://github.com/isebasus/" class="logo" id="g" >
                    <h1 className="logoText">NIMBLE</h1>
                </a>
                <a href="https://github.com/isebasus/" class="github" id="g" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="40" height="40" fill="rgb(0,0,0)"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                </a>
                <a href="https://github.com/isebasus/" class="basket" id="g" >
                  1x Basket
                </a>
            </nav>
            
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
    this.state = { merch: [], loading: true, merchObject: [], matchPath: [], name: "", caption: "", exactPath: ''};
    this.isLoaded = false;
  };

  render() {
    const location = this.props.location.pathname;
    switch(location) {
      case '/los-angeles-apparel':
        if (this.isLoaded == false) {
          this.populateMerchData('Los Angeles Apparel');
          this.isLoaded = true;
        }
        this.formatMerchData();
        break;
      case '/gildan-apparel':
        if (this.isLoaded == false) {
          this.populateMerchData('Gildan');
          this.isLoaded = true;
        }
        this.formatMerchData();
        break;
      case '/comfort-colors-apparel':
        if (this.isLoaded == false) {
          this.populateMerchData('Comfort Colors');
          this.isLoaded = true;
        }
        this.formatMerchData();
        break;
      case '/alstyle-apparel':
        if (this.isLoaded == false) {
          this.populateMerchData('Alstyle');
          this.isLoaded = true;
        }
        this.formatMerchData();
        break;
    }

    return (
      <div>
        <MerchPage name={this.state.name} caption={this.state.caption} merch={this.state.merchObject} history={this.props.history} matchPath={this.state.matchPath}></MerchPage>
        <Switch location={this.location}>
          <Route exact path={this.state.exactPath} component={this} />
        </Switch>
        {this.state.matchPath.map((path) => 
          <Route path={path} component={ApparelDescription}/>
        )}
      </div>
    )
  }

  async populateMerchData(merchType) {
    const formData = new FormData();
    formData.append('name', merchType);

    const response = await fetch('/api/Merch', {
        method: 'POST',
        body: formData
    })

    const data = await response.json();
    this.setState({ merch: data, loading: false, merchObject: [], matchPath: [], name: "", caption: "", exactPath: `${this.props.match.path}/`});
  }

  overrideLocation() {
    let location = Object.assign({}, this.props.location)
    location.pathname = this.props.match
    this.location = location
  }

  formatMerchData() {
    this.state.merch.map(merch => {
      this.state.name = merch.name;
      this.state.caption = merch.caption;
      
      for (var i in merch.matchPaths) {
        this.state.matchPath.push(eval(merch.matchPaths[i]));
      }
      var j = 0;
      for (var i in merch.merchObject) {
        merch.merchObject[i][merch.merchObject[i].length - 1] = this.state.matchPath[j];
        this.state.merchObject.push(merch.merchObject[i]);
        j++;
      }
    })
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
