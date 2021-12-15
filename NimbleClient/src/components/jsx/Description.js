import React, { Component} from 'react';

export default class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {size: "", color: "", quantity: 15, buttonSizeState: Array(this.props.sizes.length).fill("sizeButton"), buttonColorState: Array(this.props.colors.length).fill("palette"), }
    }

    render() {
        return(
            <div className="descriptionBody">
                <div className="links">
                    <a className="li" onClick={this.goBack.bind(this)}>&larr; Back</a>
                </div>
                <h1 className="first2" id="title">{this.props.projectName}</h1>
                <h2 className="caption" style={{marginBottom: '10px'}} id="pCaption">{this.props.caption}</h2>
                <div className="box" id={this.props.image}></div>
                <div className="centerColors">
                    {this.props.sizes.map((size, i) => 
                        <a class={this.state.buttonSizeState[i]} onClick={this.setSize.bind(this, size, i)}>{size}</a>
                    )}
                </div>
                <div className="spacer"></div>
                <div className="centerColors" style={{paddingLeft: '25px'}}>
                    {this.props.colors.map((color, i) => 
                        <div className={this.state.buttonColorState[i]} onClick={this.setColor.bind(this, color, i)} style={{background: `${color}`, cursor: 'pointer'}}></div>
                    )}
                </div>
                <div className="spacer"></div>
                <div className="centerColors" style={{marginTop: '-10px', paddingBottom: '0px'}}>
                    <input className="inputBox" type="text" placeholder="15" style={{marginRight: '10px', display: 'inline'}}/>
                    <a class="sizeButton" style={{marginRight: '10px', display: 'inline'}}>Add To Cart</a>
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

    goBack(){
        this.props.history.goBack();
    }

    setSize(s, i) {
        var changed = [];
        for(var j = 0; j < this.state.buttonSizeState.length; j++) {
            if (j == i) {
                changed.push("sizeButtonChanged");
            } else {
                changed.push("sizeButton");
            }
        }
        this.setState({size: s, color: this.state.color, quantity: this.state.quantity, buttonSizeState: changed, buttonColorState: this.state.buttonColorState});
    }

    setColor(c, i) {
        var changed = [];
        for(var j = 0; j < this.state.buttonColorState.length; j++) {
            if (j == i) {
                changed.push("paletteChanged");
            } else {
                changed.push("palette");
            }
        }
        this.setState({size: this.state.size, color: c, quantity: this.state.quantity, buttonSizeState: this.state.buttonSizeState, buttonColorState: changed});
    }

    addToBag(q) {
        
    }

}