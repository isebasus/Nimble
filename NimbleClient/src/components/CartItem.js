import React, { Component } from 'react';

export default class CartItem extends Component {

    static props = null;

    constructor(props) {
        super(props);
        this.props = props;
    }
    
    render() {
        return (
            <div className="merchItem">
                <a className="content">{this.props.ammount}x {this.props.type}</a>
            </div>
        );
    }

    search(e){
        this.props.history.push(this.props.matchPath);
    }
}