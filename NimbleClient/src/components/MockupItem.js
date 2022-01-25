import React, { Component, useEffect} from 'react';
import { projectFirestore, projectStorage } from "../firebase/config";

export default class MockupItem extends Component {
    constructor(props) {
        super(props);
        this.state = {notes: ""};
    }

    removeItem() {
        var parsedData = JSON.parse(window.localStorage.getItem('state'));
        for (var i = 0; i < parsedData.cart.length; i++) {
            if (parsedData.cart[i].id == this.props.id) {
                this.removeItemBackend(parsedData.cart[i].id)
                parsedData.cart.splice(i, 1);
                break;
            }
        }
        window.localStorage.setItem('state', JSON.stringify(parsedData));
    }

    async removeItemBackend(cartId) {
        var data = [JSON.parse(window.localStorage.getItem('userId')).userId, cartId];
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        const response = await fetch('/api/removeItem', {
            method: 'POST',
            body: formData
        })
        const res = await response.json();
        console.log(res);
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
                <input className="inputBox" type="text" maxLength="80" placeholder={notes} style={{left: '25px', display: 'inline', width: "30%", position: "absolute", top: "140px", textAlign: "left", textIndent: "0.7em"}} onChange={event => this.props.setNotes(this.props.id, event.target.value)}/>
                <MockupFile id={this.props.id} setMessage={this.props.setMessage}/>
                <VectorFile id={this.props.id} setMessage={this.props.setMessage}/>
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
                this.state = data.cart[i].mockupUploaded == false ? {mockup: "Add Mockup", url: null, error: null} 
                    : {mockup: "Mockup Added!", url: null, error: null};
                return;
            }
        }
    }

    generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    useStorage(file){
        if (file == null) {
            console.log("file is null");
            return;
        }
        var uuid = this.generateUUID();
        const storageRef = projectStorage.ref(uuid);
        const mainImage = storageRef.child(uuid);

        this.setState({mockup: "Uploading... "});
        mainImage.put(file).then((snapshot) => {
            mainImage.getDownloadURL().then((url) => {
                this.setState({url: url});
                this.setFileData(this.setMockupState.bind(this));
            })
        });
    }

    setMockupState() {
        var isUploaded = JSON.parse(window.localStorage.getItem('isUploaded'));
        isUploaded.uploaded = false;
        window.localStorage.setItem('isUploaded', JSON.stringify(isUploaded));
        this.setState({mockup: "Mockup Added!"});
    }

    setFileData(_callback) {
        var parsedData = JSON.parse(window.localStorage.getItem('state'));
        for (var i = 0; i < parsedData.cart.length; i++) {
            if (parsedData.cart[i].id == this.props.id) {
                if (parsedData.cart[i]["mockupUploaded"] == true) {
                    this.props.setMessage("Press checkout to update your Mockup File(s)");
                }
                parsedData.cart[i]["mockup"] = this.state.url;
                parsedData.cart[i]["mockupUploaded"] = true;
                window.localStorage.setItem('state', JSON.stringify(parsedData));
                break;
            }
        }
        _callback();
    }
      

    onFileChangeCapture(e) {
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
                accept=".png,.jpg,.jpeg"
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
                this.state = data.cart[i].vectorUploaded == false ? {vector: "Add Vector File", url: null, error: null} : {vector: "Vector File Added!", url: null, error: null};
                return;
            }
        }
    }

    useStorage(file){
        if (file == null) {
            return;
        }
        var uuid = this.generateUUID();
        const storageRef = projectStorage.ref(uuid);
        const mainImage = storageRef.child(uuid);

        this.setState({vector: "Uploading... "});
        mainImage.put(file).then((snapshot) => {
            mainImage.getDownloadURL().then((url) => {
                this.setState({url: url});
                this.setFileData(this.setVectorState.bind(this));
            })
        });
    }

    generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    setVectorState() {
        var isUploaded = JSON.parse(window.localStorage.getItem('isUploaded'));
        isUploaded.uploaded = false;
        window.localStorage.setItem('isUploaded', JSON.stringify(isUploaded));
        this.setState({vector: "Vector File Added!"})
    }

    setFileData(_callback) {
        var parsedData = JSON.parse(window.localStorage.getItem('state'));
        for (var i = 0; i < parsedData.cart.length; i++) {
            if (parsedData.cart[i].id == this.props.id) {
                if (parsedData.cart[i]["vectorUploaded"] == true) {
                    this.props.setMessage("Press checkout to update your Vector File(s)");
                }
                parsedData.cart[i]["vector"] = this.state.url;
                parsedData.cart[i]["vectorUploaded"] = true;
                window.localStorage.setItem('state', JSON.stringify(parsedData));
                _callback();
                return;
            }
        }
        _callback();
    }

    async setVectorData(vector, userId, cartId) {
        var data = [vector, userId, cartId];
        const formData = new FormData();
        
        formData.append('data', JSON.stringify(data));

        const response = await fetch('/api/addVectorFile', {
            method: 'POST',
            body: formData
        })
        const res = await response.json();
        console.log(res);
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