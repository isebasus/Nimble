import React, { Component, useEffect} from 'react';
import { projectFirestore, projectStorage } from "../firebase/config";

export default class MockupItem extends Component {
    constructor(props) {
        super(props);
        this.state = {notes: ""};
    }

    removeItem() {
        var data = {
            cart: []
        }
        var parsedData = JSON.parse(window.localStorage.getItem('state'));
        for (var i = 0; i < parsedData.cart.length; i++) {
            if (!(parsedData.cart[i].id == this.props.id)) {
                data.cart.push(parsedData.cart[i]);
            }
        }
        window.localStorage.setItem('state', JSON.stringify(data));
    }
    
    render() {
        var price = this.props.units * this.props.price;
        var notes = "";
        if (this.props.notes != null) {
            notes = "Notes: " + this.props.notes;
        } else {
            notes = "Notes: ";
        }
        return (
            <div className="item" style={{cursor: "default", height: '200px', position: "relative", width: "100%"}} onClick={this.visitPage.bind(this)}>
                <div style={{paddingBottom: "0px", paddingLeft: "0px", display: "block", height: "100%", position: "relative", width: "100%"}}>
                    <div className="box" style={{width: "20%", height: "100px", objectFit: "cover", borderRadius: "10px", display: "inline", textAlign: "left", marginBottom: "0px", left: "0px", marginRight: "10px", float: "left"}} id={this.props.image}></div>
                    <div style={{position: "relative", display: "inline", float: 'left', width: "300x", height: "100%"}}>
                        <div style={{paddingBottom: "0px", paddingLeft: "0px", display: "block"}}>
                            <h2 className="caption" style={{fontSize: "1rem", marginBottom: "0px", textAlign: "left", marginTop: "0px", display: "inline", float: "left", marginRight: "10px", fontWeight: "700"}} id="pCaption">{this.props.name}</h2>
                            <div className="palette" style={{background: `${this.props.color}`, cursor: 'pointer'}}></div>
                        </div>
                        <div className="spacer"></div>
                        <h2 className="caption" style={{fontSize: "0.9rem", marginBottom: "0px", textAlign: "left", marginTop: "25px", left: '0px', position: "absolute"}} id="pCaption">Size: {this.props.size}</h2>
                        <h2 className="caption" style={{fontSize: "0.9rem", marginBottom: "0px", textAlign: "left", marginTop: "45px", float: "left", marginLeft: "0px", position: "absolute"}} id="pCaption">{this.props.units} units</h2>
                        <h2 className="caption" style={{fontSize: "0.9rem", marginBottom: "0px", textAlign: "left", marginTop: "68px", float: "left", marginLeft: '0px', position: "absolute"}} id="pCaption"><a className="tprice">${price}</a></h2>
                    </div>
                    
                </div>
                <input className="inputBox" type="text" placeholder={notes} style={{left: '25px', display: 'inline', width: "30%", position: "absolute", top: "140px", textAlign: "left", textIndent: "0.7em"}} onChange={event => this.props.setNotes(this.props.id, event.target.value)}/>
                <MockupFile id={this.props.id}/>
                <VectorFile id={this.props.id}/>
                <div className="links" style={{marginTop: "50px", position: "absolute", right: "20px", bottom: "-20px"}}>
                    <a className="li" style={{fontSize: "1rem", float: "right", marginRight: "5px"}} onClick={this.removeItem.bind(this)}>✖ remove</a>
                </div>
            </div>
        );
    }

    visitPage(e) {
        return;
    }
}

class MockupFile extends Component {
    constructor(props) {
        super(props);
        this.inputReference = React.createRef();
        var data = JSON.parse(window.localStorage.getItem('state'));
        for (var i = 0; i < data.cart.length; i++) {
            if (data.cart[i].id == this.props.id) {
                this.state = data.cart[i].mockup == undefined ? {mockup: "Add Mockup", url: null, error: null} 
                    : {mockup: "Mockup Added!", url: null, error: null};
                return;
            }
        }
    }

    useStorage(file, base64){
        const storageRef = projectStorage.ref(file.name);
    
        const mainImage = storageRef.child(file.name);

        this.setState({mockup: "Uploading... "});

        mainImage.put(file).then((snapshot) => {
            mainImage.getDownloadURL().then((url) => {
                this.setState({url: url});
                this.setState({mockupEncoded: base64});
                this.setState({mockup: "Mockup Added!"},
                this.setFileData);
            })
        });
    }

    setFileData() {
        console.log(this.state.url);
        var parsedData = JSON.parse(window.localStorage.getItem('state'));
        for (var i = 0; i < parsedData.cart.length; i++) {
            if (parsedData.cart[i].id == this.props.id) {
                parsedData.cart[i]["mockup"] = this.state.url;
                parsedData.cart[i]["mockupEncoded"] = this.state.mockupEncoded;
                window.localStorage.setItem('state', JSON.stringify(parsedData));
                return;
            }
        }
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
      

    onFileChangeCapture(e) {
        /*Selected files data can be collected here.*/
       var file = e.target.files[0];
       this.getBase64(file).then(
        data => this.useStorage(file, data)
       );
    };

    onBtnClick = () => {
        /*Collecting node-element and performing click*/
        this.inputReference.current.click();
    };

    render() {
        return (
            <form>
                <input
                type="file"
                ref={this.inputReference}
                onChangeCapture={this.onFileChangeCapture.bind(this)}
                style={{display: 'none'}}
                />
                <a class="button" style={{position: "absolute", top: "50px", right: "10px"}} onClick={this.onBtnClick}>{this.state.mockup}</a>
            </form>
        )
    }
}

class VectorFile extends Component {
    constructor(props) {
        super(props);
        this.inputReference = React.createRef();
        var data = JSON.parse(window.localStorage.getItem('state'));
        for (var i = 0; i < data.cart.length; i++) {
            if (data.cart[i].id == this.props.id) {
                this.state = data.cart[i].vector == undefined ? {vector: "Add Vector File", url: null, error: null} : {vector: "Vector File Added!", url: null, error: null};
                return;
            }
        }
    }

    useStorage(file){
        const storageRef = projectStorage.ref(file.name);
    
        const mainImage = storageRef.child(file.name);

        this.setState({vector: "Uploading... "});

        mainImage.put(file).then((snapshot) => {
            mainImage.getDownloadURL().then((url) => {
                this.setState({url: url});
                this.setState({vector: "Vector File Added!"},
                this.setFileData);
            })
        });
    }

    setFileData() {
        console.log(this.state.url);
        var parsedData = JSON.parse(window.localStorage.getItem('state'));
        for (var i = 0; i < parsedData.cart.length; i++) {
            if (parsedData.cart[i].id == this.props.id) {
                parsedData.cart[i]["vector"] = this.state.url;
                window.localStorage.setItem('state', JSON.stringify(parsedData));
                return;
            }
        }
    }

    onFileChangeCapture(e) {
        /*Selected files data can be collected here.*/
       this.useStorage(e.target.files[0]);
    };

    onBtnClick = () => {
        /*Collecting node-element and performing click*/
        this.inputReference.current.click();
    };

    render() {
        return (
            <form>
                <input
                type="file"
                ref={this.inputReference}
                onChangeCapture={this.onFileChangeCapture.bind(this)}
                style={{display: 'none'}}
                />
                <a class="button" style={{position: "absolute", top: "105px", right: "10px"}} onClick={this.onBtnClick}>{this.state.vector}</a>
            </form>
        )
    }
}