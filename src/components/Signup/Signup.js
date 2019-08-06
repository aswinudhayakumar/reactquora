import React, { Component } from 'react'
import '../Signup/Signup.css'
import sign from '../../images/signup.png'
import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux'
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom'
class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            uname : '',
            email : '',
            password : '',
            cpassword : '',
            profile : '',
            gemail : '',
            gisgn : false,
            error : {
                uname : false,
                found : false,
                email : false,
                password : false,
                cpassword : false
            }
        }
    }

    formhandler = (event) => {

        this.setState({
          [event.target.name]: event.target.value
        })

      }
    

    signup = (e) => {
        e.preventDefault();
        
        var error = this.state.error
        var email = this.state.email
        var name = this.state.uname
        var password = this.state.password
        var cpassword = this.state.cpassword

        if(password.length < 8){
            error.password = true
            this.setState({
                error
            })
        }else{
            error.password = false
            this.setState({
                error
            })
        }

        if(password !== cpassword){
            error.cpassword = true
            this.setState({
                error
            })
        }else{
            error.cpassword = false
            this.setState({
                error
            })
        }

        if(name === "" || name.length < 2){
            error.uname = true
            this.setState({
                error
            })
        }else{
            error.uname = false
            this.setState({
                error
            })
        }

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


        if( this.state.error.uname === false && this.state.error.email === false && this.state.error.password === false && this.state.error.cpassword === false){
            
            if(this.state.email !== this.state.gemail){
                var obj = {
                    Googleid :'',
                    Category : '',                
                    Profilepic :'',
                    Name : this.state.uname,
                    Email : this.state.email,
                    password : this.state.password
                }
            }
            else{
                var obj = {
                    Googleid : this.state.gid,
                    Category : '',                
                    Profilepic : this.state.profile,
                    Name : this.state.uname,
                    Email : this.state.email,
                    password : this.state.password
                }
            }
            var link = "http://localhost:8123/signup"
            axios.post(link, obj).then(res => {
                alert(res.data)
                if(res.data !== "success"){
                    error.found = true
                    this.setState({
                        error,
                        gid : '',
                        profile : '',
                    })
                }
                else{
                    alert("New user created")
                    this.setState({
                        redirect : true
                    })
                }
            })

        }
        else{
            alert("error")
        }


    }


    render() {

        if(this.state.redirect === true){
            return( <Redirect to = {{
                pathname : "/signin",
            }} />
           )
        }

        const responseGoogle = (response) => {
            if (!response.error) {
                console.log(response)
                this.setState({
                    uname: response.w3.ig,
                    email: response.w3.U3,
                    gid: response.w3.Eea,
                    profile : response.w3.Paa,
                    gemail : response.w3.U3
                })
            }
        }
        if (this.props.auth.Logged === false) {
        return (
            <div className="container main-box">
                <div className="row">
                    <div className="col-md-5 col-sm-5 col-xs-12 signup-box">
                        <h3>Signup for Quora</h3><br/>
                        <form onSubmit={this.signup} > 
                            <input type="text" name="uname" value={this.state.uname} onChange = {this.formhandler}  className="form-control" placeholder="Enter your full name"/><br/>
                            {this.state.error.uname === true ? <p className="error">Name sholud atleast have 2 characters</p> : ''}
                            <input type="email" name="email" value={this.state.email} onChange = {this.formhandler} className="form-control" placeholder="Enter Email id"/><br/>
                            {this.state.error.found === true ? <p className="error">Email Id Already exists</p> : ''}
                            {this.state.error.email === true ? <p className="error">Enter Valid Email Id</p> : ''}
                            {this.state.error.dup === true ? <p>Email Id Already exists</p> : ''}                          
                            <input type="password" name="password" value={this.state.password} onChange = {this.formhandler} className="form-control" placeholder="Enter password"/><br/>
                            {this.state.error.password === true ? <p className="error">password should contain atleast 8 characters</p> : ''}
                            <input type="password" name="cpassword" value={this.state.cpassword} onChange = {this.formhandler} className="form-control" placeholder="Enter conform password"/><br/>
                            {this.state.error.cpassword === true ? <p className="error">password and conform password haven't matched</p> : ''}
                            <button className="btn-success signbtn" >Signup</button> <GoogleLogin
                                            clientId="285651157927-tbqg4amqsci3g6semte4vhkhh938ekld.apps.googleusercontent.com"
                                            buttonText="Signup"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                            className="gsign"
                                        /><br/><br/>
                             <Link className="link" to="/signin">Already have an account? signin here.</Link>
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
export default connect(mapStateToProps)(Signup)