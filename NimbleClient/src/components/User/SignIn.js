import React, { Component} from 'react';
import Header from '../Header';
import { GoogleLogin } from 'react-google-login'

export default class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state = {loading: true, loaded: false, notFound: false}
    }
    render() {
        const clientId = '205025008312-lavq1vtflqd86aac59nvo3tgnptn59ba.apps.googleusercontent.com';
        return (
            <div className="body">
              <Header history={this.props.history}></Header>
              <div className="merch" style={{maxWidth: "600px"}}>
                <h1 className="first">NIMBLE<a id="text"></a></h1>
                <div class="basketItems" style={{gridTemplateColumns: "repeat(1, 1fr)", padding: "40px 40px", gap: "15px 15px", overflow: "hidden", opacity: "1", right: "0px", position: "relative", width: "100%", marginTop: "20px", backgroundColor: "rgba(0, 0, 0, 0.065)", borderRadius: "10px"}}>
                    <h2 className="caption" style={{textAlign: "left", opacity: "0.7", fontWeight: "800", marginBottom:"10px"}}>Let's login.</h2>
                    <input className="inputForm" type="text" placeholder='Your email' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}} />
                    <input className="inputForm" type="text" placeholder='Your password' style={{textTransform: "uppercase", display: "block", width: "100%", position: "relative", textAlign: "left", textIndent: "0.7em", fontWeight: "900"}}/>
                    <a class="loginButton" style={{fontWeight: "800", marginBottom: "0px", marginTop: "10px", width: "100%", padding: "10px", borderRadius: "8px", fontSize: "1.8em"}}>Login</a>
                    <GoogleLogin
                        clientId={clientId}
                        render={renderProps => (
                            <a class="loginButton" style={{fontWeight: "800", marginBottom: "0px", color: "rgb(39, 40, 42, 0.8)", marginTop: "0px", boxShadow: "none", width: "100%", padding: "9px", borderRadius: "8px", fontSize: "1em", background: "rgb(0, 0, 0, 0.09)"}}>
                                login with google
                            </a>
                        )}
                        buttonText="Login With Google"
                        isSignedIn={true}
                        cookiePolicy={'single_host_origin'}
                        style={{borderRadius: "10px"}}
                    />
                    <a class="loginButton" style={{fontWeight: "800", marginBottom: "0px", color: "rgb(39, 40, 42, 0.8)", marginTop: "0px", boxShadow: "none", width: "100%", padding: "10px", borderRadius: "8px", fontSize: "1em", background: "rgb(0, 0, 0, 0.09)"}}>
                        sign up
                    </a>

                </div>
              </div>
            </div>
        )
    }
}
