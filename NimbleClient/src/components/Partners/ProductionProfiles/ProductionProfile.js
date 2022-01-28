import React, { Component} from 'react';
import Header from '../../Header.js';
import Loader from "react-loader-spinner";
import {useLocation} from "react-router-dom";
import MerchType from '../../MerchType.js';
import ProfileHeader from '../ProfileHeader/ProfileHeader.js';

export default class ProductionProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {loading: true, loaded: false, notFound: false}
    }

    static renderProfile(items, notFound, path, history) {
        let item;
        if (notFound == true) {
            item = <h2 className="caption" style={{fontWeight: "900", marginTop: "100px"}}>404. NOT FOUND</h2>
        } else {
            let contents;
            if (path.length == 1) {
                contents = items.Brands.map((brands) => 
                    <MerchType image={brands.Image} name={brands.Name} display={brands.Display} link={brands.Link} currentLink={path} history={history}></MerchType>
                );
            }
            item = <div>
                    <div class="basketItems" style={{gridTemplateColumns: "repeat(1, 1fr)", gap: "15px 15px", overflow: "hidden", opacity: "1", right: "0px", position: "relative", width: "100%", marginTop: "20px", backgroundColor: "rgba(0, 0, 0, 0.065)"}}>
                        <ProfileHeader image={items.Logo} name={items.Company} description={items.Description} maxHeight={"280px"} ratings={items.Ratings} profilePicture={items.ProfilePicture}></ProfileHeader> 
                    </div>
                    <h1 className="first" style={{fontSize: "3em", textAlign: "left"}}>Blanks Provided by {items.Company}<a id="text"></a></h1>
                    <div className="columns" style={{gridTemplateColumns: "repeat(3, 1fr)"}}>
                        {contents}
                    </div>
                   </div>
        }
        return (
            <div>
                {item}
            </div>
        );
    }

    render() {
        var search = this.props.location.search;
        var path = new URLSearchParams(search).get('path');

        let contents;
        if (path == null) {
            contents = <h2 className="caption" style={{fontWeight: "900", marginTop: "100px"}}>404. NOT FOUND</h2>;
        } else {
            const pathArr = path.split("-");

            if (this.state.loaded == false) {
                this.getData(pathArr[0]);
                this.setState({loaded: true});

                var search = this.props.location.search;
                var name = new URLSearchParams(search).get('path');
                console.log(name);
            }

            contents = this.state.loading 
            ? <Loader style={{display: this.state.loading}} type="ThreeDots" color="#000000" height={8} width={60}timeout={3000}/>
            : ProductionProfile.renderProfile(this.state.items, this.state.notFound, pathArr, this.props.history);
        }
        return (
            <div className="body">
              <Header history={this.props.history}></Header>
              <div className="merch">
                <nav className="navBar">
                      <a class="navItems">Home</a>
                      <a class="navItems">About</a>
                      <a class="navItems">Partners</a>
                      <a class="navItems">Builder</a>
                      <a class="navItems">Order</a>
                </nav>
                {contents}
              </div>
        </div>
        )
    }

    async getData(company) {
        const formData = new FormData();
        formData.append('name', JSON.stringify(company));
        const response = await fetch('/api/getProductionCompany', {
            method: 'POST',
            body: formData
        })

        const res = await response.json();
        console.log(res);
        if (res == "Error: Cannot find Company.") {
            this.setState({notFound: true, loading: false});
            return;
        }
        this.setState({items: res, loading: false})
    }
}
