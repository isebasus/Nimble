import React, { Component} from 'react';

export default class Description extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var colors = ['#914637', '#e30e11', '#2e9e50', '#eb6134', '#eb9ba8', '#7da88a', '#1704bf', '#88a2cf', '#030303', '#d9d9d9', '#f7f7f7']
        return(
            <div className="descriptionBody">
                <div className="links">
                    <a className="li" href="/">&larr; Back</a>
                </div>
                <h1 className="first2" id="title">{this.props.projectName}</h1>
                <h2 className="caption" style={{marginBottom: '10px'}} id="pCaption">{this.props.caption}</h2>
                <div className="box" id={this.props.image}></div>
                <div className="centerColors">
                    <a class="sizeButton">XS</a>
                    <a class="sizeButton">S</a>
                    <a class="sizeButton">M</a>
                    <a class="sizeButton">L</a>
                    <a class="sizeButton">XL</a>
                    <a class="sizeButton">XXL</a>
                </div>
                <div className="spacer"></div>
                <div className="centerColors" style={{paddingLeft: '25px'}}>
                    {colors.map((color) => 
                        <div className="palette" style={{background: `${color}`, cursor: 'pointer'}}></div>
                    )}
                </div>
                <div className="spacer"></div>
                <div className="centerColors" style={{marginTop: '-10px', paddingBottom: '0px'}}>
                    <input className="inputBox" type="text" placeholder="15" style={{marginRight: '10px', display: 'inline'}}/>
                    <a class="button" style={{marginRight: '10px', display: 'inline'}}>Add To Cart</a>
                </div>
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