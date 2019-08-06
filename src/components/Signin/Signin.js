import React, { Component } from 'react'
import '../Signup/Signup.css'
import sign from '../../images/signup.png'
import axios from 'axios'
import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux'
import { login } from '../../actions';
import jwt_decode from 'jwt-decode'
import { Redirect, Link } from 'react-router-dom'

class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                email: false,
                password: false
            },
            result: null,
        }
    }

    formhandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submit = (e) => {
        e.preventDefault()

        var error = this.state.error
        var email = this.state.email
        var password = this.state.password

        var emailpattern = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
        if (!emailpattern.test(email)) {
            error.email = true
            this.setState({
                error
            })
        }
        else {
            error.email = false
            this.setState({
                error
            })
        }

        if (this.state.error.email === false && this.state.error.password === false) {
            var obj = {
                Googleid: '',
                Category: '',
                Profilepic: '',
                Name: '',
                Email: this.state.email,
                password: this.state.password
            }
            var link = "http://localhost:8123/signin"
            axios.post(link, obj).then(res => {
                console.log("signin ", res.data)
                if (res.data !== null) {
                    this.setState({
                        result: res.data
                    })
                    localStorage.setItem("webtoken", res.data)
                    var jwt = res.data
                    if (jwt !== null) {
                        var decoded = jwt_decode(jwt)
                        var payload = {
                            Jwt : jwt,
                            Name : decoded.Name,
                            Id : decoded.Userid,
                            Email : decoded.Email,
                            Category : decoded.Category,
                            Profilepic: decoded.Profile
                        }
                        this.props.dispatch(login(payload))
                        window.location.replace("http://localhost:3000/feed")
                    }
                }
                else {
                    error.email = true
                    this.setState({
                        error
                    })
                }
            })

        }
        else {
            alert("error")
        }

    }

    gsignin = () => {
        var error = this.state.error
        var email = this.state.email
        var password = this.state.password

        var emailpattern = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
        if (!emailpattern.test(email)) {
            error.email = true
            this.setState({
                error
            })
        }
        else {
            error.email = false
            this.setState({
                error
            })
        }

        if (this.state.error.email === false && this.state.error.password === false) {
            var obj = {
                Googleid: this.state.gid,
                Category: '',
                Profilepic: '',
                Name: '',
                Email: this.state.email,
                password: ''
            }
            var link = "http://localhost:8123/signinwithgoogle"
            axios.post(link, obj).then(res => {
                console.log("signin ", res.data)
                if (res.data !== null) {
                    this.setState({
                        result: res.data
                    })
                    localStorage.setItem("webtoken", res.data)
                    var jwt = res.data
                    if (jwt !== null) {
                        var decoded = jwt_decode(jwt)
                        var payload = {
                            Jwt : jwt,
                            Name : decoded.Name,
                            Id : decoded.Userid,
                            Email : decoded.Email,
                            Category : decoded.Category,
                            Profilepic: decoded.Profile
                        }
                        this.props.dispatch(login(payload))
                        window.location.replace("http://localhost:3000/feed")
                    }
                }
                else {
                    error.email = true
                    this.setState({
                        error
                    })
                }
            })

        }
        else {
            alert("error")
        }
    }

    render() {

        const responseGoogle = (response) => {
            console.log(response);
            if (!response.error) {
                this.setState({
                    uname: response.w3.ig,
                    email: response.w3.U3,
                    gid: response.w3.Eea
                })
                this.gsignin()
            }
        }
        if (this.props.auth.Logged === false) {
        return (
            <div className="container main-box">
                <div className="row">
                    <div className="col-md-5 col-sm-5 col-xs-12 signup-box">
                        <h3>Signin for Quora</h3><br />
                        <form onSubmit={this.submit}>
                            <input type="email" name="email" value={this.state.email} onChange={this.formhandler} className="form-control" placeholder="Enter Email id" /><br />
                            <input type="password" name="password" value={this.state.password} onChange={this.formhandler} className="form-control" placeholder="Enter password" /><br />                       
                            {this.state.error.email === true ? <p className="error">Email Id and password haven't matched</p> : ''}
                            <button className="btn-success signbtn">Signin</button> <GoogleLogin
                                clientId="285651157927-tbqg4amqsci3g6semte4vhkhh938ekld.apps.googleusercontent.com"
                                buttonText="Signin"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                className="gsign"
                            /><br /><br />
                            <Link className="link" to="/">New user? Create your account.</Link>
                        </form>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-6 col-sm-6 col-xs-12"> <img className="sign-image" src={sign} /> </div>
                </div>
            </div>
        )
        }
        else{
            return( <Redirect to = {{
                pathname : "/feed",
            }} />
           )
        }
    }
}

const mapStateToProps=(state)=>({
    auth:state.payload
})
export default connect(mapStateToProps)(Signin)