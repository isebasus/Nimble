import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import qwertyVideo from '../src/videos/qwertyVideo.mp4';
import FoodVideo from '../src/videos/foodBanks.mp4';
import pongVideo from '../src/videos/pongVideo.mp4';
import scraperVideo from '../src/videos/scraperVideo.mp4';
import archiveVideo from '../src/videos/archive.mp4';
import pacVideo from '../src/videos/pacman.mp4';
import Project from './components/projects.jsx';
import Description from './components/description.jsx';
import FetchData from './components/FetchData.js'
import CustomImageEditor from './components/Designer.js';
import { createBrowserHistory } from 'history';
import qwerty from '../src/images/qwerty.png'
import './styles/App.css';

var xRotate = 0;
var yRotate = 0;

function App() {
  return (
    <Router history={createBrowserHistory}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path={"/qwerty"} component={Qwerty}></Route>
          <Route path={"/archive"} component={Archive}></Route>
          <Route path={"/hamming"} component={Hamming}></Route>
          <Route path={"/videoscraper"} component={VideoScraper}></Route>
          <Route path={"/pacman"} component={Pacman}></Route>
          <Route path={"/pong"} component={Pong}></Route>
          <Route path={"/foodbanks"} component={FoodBanks}></Route>
          <Route path={"/designer"} component={Designer}></Route>
        </Switch>
      </div>
    </Router>
  );
}

class Home extends React.Component{
  onHover = () =>{
    xRotate = 1;
    yRotate = 1;
  }

  qwerty = () => {
    this.props.history.push('/designer')
  }

  videoScraper = () => {
    this.props.history.push('/videoscraper')
  }

  pacman = () => {
    this.props.history.push('/pacman')
  }

  archive = () => {
    this.props.history.push('/archive')
  }

  pong = () => {
    this.props.history.push('/pong')
  }

  hamming = () => {
    this.props.history.push('/hamming')
  }

  foodBanks = () => {
    this.props.history.push('/foodbanks')
  }


  designer = () => {
    this.props.history.push('/designer')
  }


  render(){
    return (
      <header className="body">
         <a href="https://github.com/isebasus/"class="github" id="g" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="40" height="40" fill="rgb(255,255,255)"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
        </a>
        <a href="mailto:isebasus@gmail.com"class="github" id="g" >
          <h1 className="contact">Contact</h1>
        </a>
        <div className="projects">
          <h1 className="first"><a id="text">hey, i'm sebastian.</a></h1>
          <h2 className="caption">These are the projects I've developed. Check out my <a id="git" href="https://github.com/isebasus/">github</a> &amp; <a id="res" href="https://drive.google.com/file/d/1IxqVpsvz8np6-Xaz1NG8KTiRZsLrbzxF/view?usp=sharing">resume</a> for more.  </h2>
          <div className="columns">
          <Project projectId="foodBanks" path={this.foodBanks} coverId="coverScraper" name="food banks"></Project>
          <Project projectId="archive" path={this.archive} coverId="coverScraper" name="archive"></Project>
          <Project projectId="videoScraper" path={this.videoScraper} coverId="coverScraper"name="video scraper"></Project>
          <Project projectId="qwerty" path={this.qwerty} name="qwerty  " coverId="coverQwerty"imagePath={qwerty}></Project>
          </div>
        </div>
      </header>
    );
    }
}

export class Designer extends React.Component {
  render() {
    return (
      <header className="body">
        <nav>
        <a href="https://github.com/isebasus/"class="logo" id="g" >
          <h1 className="logoText">NIMBLE</h1>
        </a>
         <a href="https://github.com/isebasus/"class="github" id="g" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="40" height="40" fill="rgb(0,0,0)"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
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
          <a class="button">Make some Merch</a>
        </div>
      </header>
    )
  }
}

export class Archive extends React.Component{
  render(){
    return(
      <Description 
      video={archiveVideo}
      projectName="Archive"
      caption="Huffman Compression"
      p1="This Huffman Coding implementation was created for a school project. The project builds two programs (the encoder and the decoder), the binaries can only be ran in linux but atleast we have another linux capatible compression algorithm."
      p2="This project was created in raw C. The encoder works by first computing a histogram of all bytes (characters) within a file, then it traverses through the freqency of each character to emit a code table. Further, the encoder will then emit the Huffman tree into the encoded file, then emit each code that corresponds with each character in the original file."
      p2b="The decoder works by reading in the dumped tree from the encoded file and reconstructs the Huffman tree. With this reconstructed tree, the decoder can read the rest of the file bit by bit to traverse down the Huffman tree one link at a time. Reading a 0 means to walk left, and reading a 1 means to walk right of the Huffman tree."
      p3="Overall, this project was really fun and coding the assignment up in two weeks kept the adrenaline pumping. Check out the code on my GitHub and also check out my "
      details="design"
      href="https://docs.google.com/document/d/1TV7tv_EihiZ0EpDRFjV8yQ-Bk1MdsqCt-646f9M02Vk/edit?usp=sharing"
      p3b=" document! ❤️ Links above."
      website={ <p><a class="button">📦 View Design</a> </p>}
      link="https://docs.google.com/document/d/1TV7tv_EihiZ0EpDRFjV8yQ-Bk1MdsqCt-646f9M02Vk/edit?usp=sharing"
      gitLink="https://github.com/isebasus/archive/"
      clas="details"
      >
      </Description>
    )
  }
}

export class Hamming extends React.Component{
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

export class Qwerty extends React.Component{
  render(){
    return(
      <Description 
      video={qwertyVideo} 
      projectName="Qwerty"
      caption="web proxy"
      p1="This Web Proxy was originally created for the necessity of searching up websites under my high school wifi. As a result, most websites under the school wifi are blocked so a web proxy would save the day. Until, of course, one day it would finally become a blocked website as well."
      p2="This project was created with the Flask web server. This application works by HTTP requesting a website to grab its HTML under a given search string. As a result, once the application has the HTMl it could use the css and js links to fully render the site. It does this by integrating this servers domain in front of the css and js links in the HTML so that way it could request the css and js from my server. It of course does not work for every single website, but it still needs work to be done."
      p3="Overall, this project was a pain at first, trying to figure out how to render the HTML and css, but it was really fun in my opinion. Check out the code on my GitHub and also check out my website! ❤️ Links above."
      website={ <p><a class="button">📦 Visit Site</a> </p>}
      link="https://qwertyuiop.space"
      gitLink="https://github.com/isebasus/qwertyuiop/"
      >
      </Description>
    )
  }
}

export class FoodBanks extends React.Component{
  render(){
    return(
      <Description 
      video={FoodVideo} 
      projectName="FoodBanks"
      caption="food banks!"
      p1="This website was created to help individuals struggling from the Covid-19 pandemic to find food banks near them. I also thought it would be nice if I could help people struggling from the corona-virus pandemic."
      p2="This project was created with Node.js. The application works by requesting and parsing data from Google's cloud platform API. After parsing the data, I store it into my own API, letting the website's front end access the data about local food banks."
      p3="Overall, this project was really fun and knowing that I would be able to help people made the experience even better. Not to mention, going on the news was something different. Check out the article "
      website={ <p><a class="button">📦 Visit Site</a> </p>}
      details="here"
      link="https://foodbanks.space"
      href="https://www.10news.com/news/local-news/teen-creates-website-to-locate-local-food-banks"
      gitLink="https://github.com/isebasus/FoodBanks/"
      p3b=" and don't forget to check out my GitHub! ❤️ Link above." 
      clas="details"
      >
      </Description>
    )
  }
}

export class VideoScraper extends React.Component{
  render(){
    return(
      <Description 
      gitLink="https://github.com/isebasus/YoutubeWebScraper/"
      video={scraperVideo} 
      projectName="Video Scraper"
      caption="web scraper"
      website={ <p><a class="button" href="https://github.com/ZumbaMaster313/YoutubeWebScraper/blob/master/webscraperPic.JPG">📦 View Images</a> </p>}
      p1="This Youtube Web-Scraper is an app that is able to search up any youtube video from Youtube's API. It was made in flask, which is a Python library used to create web applications. This was created for the revolutionary purpose of being able to search up youtube videos on this application instead on youtube.com. Very innovative..."
      p2="This project was my first flask application which was pretty fun for me to learn. The webscraper works by grabbing a search string which then sends an HTTP request to Youtube's API. The API then sends data back that contains the urls of each video that corresponds with the search string. With that, the application is able to display those URls as videos in HTML."
      p3="As a result, I learned a lot about creating web applications since this was my first web application I made. There were some difficulties, like trying to find out how to work with Youtube's api and how to of course ping the api to get the information that the application needed. But overall very fun project, check out my code on my GitHub 💖. Link above!"
      >
      </Description>
    )
  }
}

export class Pacman extends React.Component{
  render(){
    return(
      <Description 
      projectName="Pacman"
      caption="unity game"
      website={ <p><a class="button">Visit Site</a> </p>}
      video={pacVideo} 
      gitLink="https://github.com/isebasus/PacMan"
      link="https://gamessebastian.weebly.com/"
      p1="A simple remake of Pacman... But it was made in Unity, not straight C. I made this game to understand how the ghosts in the game worked, so I was like &quot;ok I feel like making Pacman&quot;. "
      p2="During this process I learned 2d animation, Tile mapping, Tile map art, and scripting object oriented for-loops. It worked out pretty good, except for the fact that some parts of the game doesn't function like the original."
      p3="If you want more details about this project, it's " 
      details="here"
      href="https://isebasus.wixsite.com/sebs/pac-man"
      p3b=". Thanks for checking it out!" 
      clas="details"
      ></Description>
    )
  }
}

export class Pong extends React.Component{
  render(){
    return(
      <Description 
      link="https://gameesseb.weebly.com/"
      gitLink="https://github.com/isebasus/PongGame"
      projectName="Pong"
      caption="unity game"
      website={ <p><a class="button">Visit Site</a> </p>}
      video={pongVideo}
      p1="A simple Pong game made in Unity, just wanted to develop it for fun. I also was interested in how the ball deflected off of the objects. "
      p2="In this project, I learned how to invert the velocities of objects, use triggers on collision, and learned how the enemy behaved. I was honestly suprised that the game plays the same as the original... except for the score board 👌."
      p3="Anyways, if you want more details about this project, it's "
      details="here"
      href="https://isebasus.wixsite.com/sebs/pong"
      p3b=". Thanks for checking it out!"
      clas="details"
      >

      </Description>
    )
  }
}

export default App;
