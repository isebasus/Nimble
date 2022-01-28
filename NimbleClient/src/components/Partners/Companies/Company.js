import React, { Component } from 'react';

export default class Company extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var companyName = this.props.name.toUpperCase();
        var description = this.props.description.toUpperCase();
        return (
            <div id="parentContainer" style={{color: '-webkit-link', cursor: 'pointer'}} onClick={this.search.bind(this, this.props.name)}>
                <div className="parent" style={{backgroundImage: `url(${this.props.image})`, maxHeight: "280px", objectFit: "cover"}}>
                    <div className="project">
                        <div className="cover" id="coverScraper"></div>
                    </div>
                </div>
                <div className="projectName">
                    <h1 className="name">{companyName}<a style={{float: "right", marginTop: "6px"}}>{description}</a></h1>
                </div>
            </div>
        );
    }

    search(companyName){
        var newName = companyName.replace(/[^A-Z0-9]/ig, "_").toLowerCase();
        this.props.history.push('/production-companies?path=' + newName);
    }
}