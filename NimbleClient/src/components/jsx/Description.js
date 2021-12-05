import React, { Component} from 'react';

export default class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {currentCount: 0};
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }

    decrementCounter() {
        this.setState({
            currentCount: this.state.currentCount - 1
        })
    }

    render() {
        var colors = ['#914637', '#e30e11', '#2e9e50', '#eb6134', '#eb9ba8', '#7da88a', '#1704bf', '#88a2cf', '#030303', '#d9d9d9', '#f7f7f7']
        return(
            <div className="descriptionBody">
                <div className="links">
                    <a className="li" href="/">&larr; Back</a>
                </div>
                <div className="box" id="laa">
                    
                </div>
                <h1 className="first2" id="title">{this.props.projectName}</h1>
                <h2 className="caption" style={{marginBottom: '20px'}} id="pCaption">{this.props.caption}</h2>
                <div className="centerColors">
                    {colors.map((color) => 
                        <div className="palette" style={{background: `${color}`, cursor: 'pointer'}}></div>
                    )}
                </div>
                <div className="spacer"></div>
                <div className="centerColors">
                    <a class="sizeButton">L</a>
                    <a class="sizeButton">L</a>
                    <a class="sizeButton">L</a>
                    <a class="sizeButton">L</a>
                </div>


                <a class="button" style={{marginTop: '10px'}}>Add To Cart</a>
                <h3 id="t-description" classNamclassName="projectDescription">{this.props.p1}</h3>
                <h3 id="t-description" className="projectDescription">{this.props.p2}</h3>
                <h3 id="t-description" className="projectDescription">{this.props.p2b}</h3>
                <h3 id="t-description" className="projectDescription">{this.props.p3}<a class={this.props.clas} href={this.props.href}>{this.props.details}</a>{this.props.p3b}</h3>
                <h3 id="t-description" className="projectDescription"></h3>
                <h3 id="t-description" className="projectDescription"></h3>
            </div>
        )
    }

}