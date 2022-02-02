import React, { Component } from 'react';

export default class MerchType extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <div id="parentContainer" style={{color: '-webkit-link', cursor: 'pointer'}}>
                <div className="parent" style={{backgroundImage: `url(${this.props.image})`, borderRadius: "5px"}}>
                    <div className="project">
                        <div onClick={this.search.bind(this)} className="cover" id="coverScraper"></div>
                    </div>
                </div>
                <div className="projectName">
                    <h1 className="name">{this.props.name}</h1>
                </div>
            </div>
        );
    }

    search(e){
        var newPath = this.props.currentLink[0] + "-" + this.props.link;
        this.props.history.push('/production-brands?path=' + newPath);
    }
}
