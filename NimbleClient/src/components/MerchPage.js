import React, { Component } from 'react';
import TShirtType from './TShirtTypes.js';
import Description from './jsx/Description.js';
import qwertyVideo from '../videos/qwertyVideo.mp4';
import data from "../data/data.json";
import Header from "./Header.js";

export class MerchPage extends Component{

    constructor(props){
      super(props);
    };
  
    homeClick = () => {
      this.props.history.push('/');
    }
  
    render(){
      var wrapper;
      var name = "";
      var caption = "";
      var p1 = "";
      var image = "";
      var colors = [];
      var sizes = [];
      if (this.props.merch != null) {
        var items = Object.entries(this.props.merch).map(([key, value]) => 
          <TShirtType projectId={value[0]} colors={value[1]} coverId="coverScraper" name={value[2]} price={value[3]} history={this.props.history} match={value[4]}></TShirtType>
        );
        wrapper = <Columns items={items} placement="columns"></Columns>
      } else {
        var endpoint = this.props.location.substring(this.props.location.lastIndexOf('/') + 1);
        data.map((data) => {
          if (data.id == endpoint) {
            name = data.name;
            caption = data.caption;
            p1 = data.p1;
            colors = data.colors;
            sizes = data.sizes;
            image = data.image;
          }
        })
        var items = <Description
          id={data.id} 
          video={qwertyVideo} 
          name={name}
          caption={caption}
          p1={p1}
          colors={colors}
          image={image}
          sizes={sizes}
          history={this.props.history}
          website={ <p><a class="button">View Design</a> </p>}
        ></Description>
        wrapper = <Columns items={items} placement=""></Columns>
      }

      return(
        <div className="body">
              <Header></Header>
              <div className="merch">
                <nav className="navBar">
                      <a class="navItems">Home</a>
                      <a class="navItems">About</a>
                      <a class="navItems">Partners</a>
                      <a class="navItems">Builder</a>
                      <a class="navItems">Order</a>
                </nav>
                <div className="links" style={{marginTop: "20px", marginBottom: "-20px"}}>
                    <a className="li" onClick={this.goBack.bind(this)}>&larr; Back</a>
                </div>
                <h1 className="first">{this.props.name}<a id="text"></a></h1>
                <h2 className="caption">{this.props.caption}</h2>
                {wrapper}
              </div>
        </div>
      )
    }

    goBack(){
      this.props.history.goBack();
    }
  }

  export class Columns extends React.Component {

    constructor(props){
      super(props);
    };

    render(){
      return (
        <div className={this.props.placement}>
          {this.props.items}
        </div>
      )
    }
  }
