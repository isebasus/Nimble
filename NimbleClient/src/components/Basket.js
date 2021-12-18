import React, { Component } from 'react';
import Header from "./Header.js";

export default class Basket extends Component {
    constructor(props) {
        super(props);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.state = {
            isHovering: false
        };
    }

    handleMouseOver() {
        this.setState(() => ({
          isHovering: true
        }));
      }
    
      handleMouseOut() {
        this.setState(() => ({
          isHovering: false
        }));
      }
    
    render() {
        return (
            <div>
                <Header handleMouseOver={this.handleMouseOver} handleMouseOut={this.handleMouseOut} isHovering={this.state.isHovering}></Header>
            </div>
        );
    }
}