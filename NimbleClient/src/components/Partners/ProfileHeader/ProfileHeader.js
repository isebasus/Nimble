import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default class ProfileHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var rating;
        var weight;
        if (this.props.ratings == 0) {
            rating = "n/a";
            weight = "200"
        } else {
            rating = this.props.ratings;
            weight = "500";
        }
        var companyName = this.props.name.toUpperCase();
        var description = this.props.description.toUpperCase();
        return (
            <div id="parentContainer" style={{color: '-webkit-link', cursor: 'pointer'}}>
                <div className="parent" style={{backgroundImage: `url(${this.props.image})`, maxHeight: `${this.props.maxHeight}`, objectFit: "cover", backgroundSize: "cover", backgroundRepeat: "no-repeat", verticalAlign: "middle"}}>
                    <div className="project">
                        <div className="cover">
                            <a style={{float: "left", bottom: "115px", position: "fixed", left: "40px"}}>
                                <div style={{width: "90px", height: "90px", backgroundColor: "black", borderRadius: "100px", backgroundImage: `url(${this.props.profilePicture})`, objectFit: "cover", backgroundSize: "cover", backgroundRepeat: "none"}}></div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="projectName">
                    <h1 className="name" >{companyName}
                    <a style={{float: "right", marginTop: "6px"}}>
                        <StarRatingComponent 
                            name="rate1" 
                            starCount={5}
                            value={this.props.ratings}
                            editing={false}
                            starColor="#000000"
                        />
                    </a>
                    <a style={{float: "right", marginTop: "8px", marginRight: "5px", fontWeight: {weight}}}>{rating}</a>
                    </h1>
                    <h2 className="caption" style={{marginTop: "-8px", marginBottom: "0px", fontSize:"1.1rem", color: "rgba(0, 0, 0, 0.8)", textAlign: "left", width: "100%", alignItems: "right", position: "relative"}} id="pCaption">{description}</h2>
                </div>
            </div>
        );
    }
}