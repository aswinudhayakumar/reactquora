import React, { Component } from 'react'
import '../Navbar/Navbar.css'
import home from '../../images/feed.png'
import homecolored from '../../images/Home.png'
import people from '../../images/people.png'
import settings from '../../images/setting.png'
import user from '../../images/user.png'
import noti from '../../images/notification.png'
import search from '../../images/search.png'
import pen from '../../images/write-letter.png'
import profile from '../../images/profiles.png'
import Logout from '../../images/exit.png'
import { logout, setspeech } from '../../actions'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Post from '../Post/Post';
import Speech from '../Speech/Speech';
import SpeechRecognition from 'react-speech-recognition'
import PropTypes from "prop-types";
import mic from '../../images/mic.png'
import Axios from 'axios';

const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    startListening: PropTypes.func,
    stopListening: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
}


class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Feed: this.props.Feed,
            dp: this.props.auth.Profilepic,
            speech: '',
            change: '',
            trans: this.props.transcript,
            startListening: this.props.startListening,
            stopListening: this.props.stopListening,
            browserSupportsSpeechRecognition: this.props.browserSupportsSpeechRecognition,
            resetTranscript: this.props.resetTranscript,
            notification: [],
            redirect : false,
        }

    }

    logout = () => {
        this.props.dispatch(logout())
        localStorage.removeItem("webtoken")
        window.location.replace("http://localhost:3000/")
    }

    change = (a) => {
        console.log(a)
        //     var payload = {
        //       Speech: a
        //   }

        //   this.setState({

        //   })

        //   this.props.dispatch(setspeech(payload))
    }

    formhandle = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })

        if (event.target.value === '') {
            this.setState({
                trans: ''
            })
            return (
                this.props.resetTranscript
            )
        }

    }


    // componentDidUpdate() {
    //     if (this.props.auth.Feed !== "Feed") {
    //         this.setState({
    //             Feed : false
    //         })
    //     }
    // }

    start = () => {
        this.setState({
            trans: ''
        })
        this.state.startListening()
        setTimeout(this.stop, 3000);
        setTimeout(this.state.stopListening, 3000);
    }

    stop = () => {
        this.setState({
            trans: this.props.transcript
        })

        this.state.resetTranscript()

    }

    getnotification = () => {
        var link = "http://localhost:8123/getnotification"
        var obj = {
            Postuserid: this.props.auth.Id
        }
        Axios.post(link, obj).then(res => {
            if (res.data !== []) {
                this.setState({
                    notification: res.data
                })
            }
        })
    }

    deletenotification = (id) => {
        var link = "http://localhost:8123/closenotofication"
        var obj = {
            ID : id
        }
        Axios.post(link, obj).then(res => {
            this.getnotification()
        })
    }

    profile = () => {
        this.setState({
            redirect : true
        })
    }

    render() {

        if(this.state.redirect === true){
            return (<Redirect to={{
                pathname: "/profile",
            }} />
            )
        }


        console.log(this.state.trans)
        if (!this.state.browserSupportsSpeechRecognition) {
            return null
        }



        var a = "nav-item home active";
        var b = "nav-item active";
        return (
            <div className="container-fluid bb">
                <div className="container pad">
                    <nav class="navbar navbar-expand-lg nav-bg">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                        </button>
                        <a class="navbar-brand" href="#"><b>Quora</b></a>

                        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">

                            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                <Link to="/feed"><li className={this.state.Feed === "Home" ? a : b}>
                                    <a class="nav-link">
                                        <div className="row">
                                            <div className="col-md-1">  <img className="home-img" alt="one" src={this.state.Feed === "Home" ? home : homecolored} width="20px" height="20px" /></div>
                                            <div className="col-md-8 links" ><p className="navtitles">Home</p></div>
                                        </div>
                                    </a>
                                </li>
                                </Link>
                                <Link to="/answer">
                                    <li className={this.state.Feed === "Answer" ? a : b}>
                                        <a class="nav-link" href="#">
                                            <div className="row">
                                                <div className="col-md-1"><img className="home-img" alt="one" src={pen} width="20px" height="20px" /></div>
                                                <div className="col-md-8 links"><p className="navtitles">Answer</p></div>
                                            </div>
                                        </a>
                                    </li>
                                </Link>
                                <li class="nav-item active">
                                    <a class="nav-link" href="#">
                                        <div className="row">
                                            <div className="col-md-1"><img className="home-img" alt="one" src={people} width="20px" height="20px" /></div>
                                            <div className="col-md-8 links"><p className="navtitles">Spaces</p></div>
                                        </div>
                                    </a>
                                </li>

                                <li class="nav-item notify-link active" onClick={this.getnotification} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    <a class="nav-link" >
                                        <div className="row">
                                            <div className="col-md-1"><img className="home-img" alt="one" src={noti} width="20px" height="20px" /></div>
                                            <div className="col-md-8 links" ><p className="navtitles">Notifications</p></div>
                                        </div>
                                    </a>
                                </li>
                                <li class="nav-item search">
                                    <div class="input-group input-group-sm mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroup-sizing-sm"> <img src={search} height="15px" width="15px" /> </span>
                                        </div>
                                        <input type="text" class="form-control" id="inp" aria-label="Small" name="trans" onChange={this.formhandle} value={this.state.trans} placeholder="Search Quora" aria-describedby="inputGroup-sizing-sm" />



                                    </div>

                                </li>
                                <li className="nav-item mic">
                                    <span onClick={this.start}><img src={mic} height="20px" width="20px" /></span>
                                </li>
                                <li class="nav-item dp">
                                    <div class="dropdown">
                                        <div class="form-inline my-2 my-lg-0" data-toggle="dropdown">
                                            <img className="pro-img" src={this.state.dp !== '' ? this.state.dp : user} width="20px" height="20px" />
                                        </div>
                                        <div class="dropdown-menu dpmenu">
                                            <a class="dropdown-item" onClick={this.profile}>
                                                <div className="row">
                                                    <div className="col-1"> <img className="home-img" src={profile} width="20px" height="20px" /> </div>
                                                    <div className="col name"> Profile <span class="sr-only">(current)</span> </div>
                                                </div>
                                            </a>
                                            <a class="dropdown-item" onClick={this.logout}>
                                                <div className="row">
                                                    <div className="col-1"> <img className="home-img" src={Logout} width="20px" height="20px" /> </div>
                                                    <div className="col name"> Logout <span class="sr-only">(current)</span> </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li class="nav-item add">
                                    <Post show="false" />
                                </li>
                            </ul>



                        </div>
                    </nav>
                </div>
                <div className="collapse notification-card" id="collapseExample">
                    {
                        this.state.notification.length > 0 ?
                            this.state.notification.map((data, i) => {
                                return (
                                    <div className="row notifi">
                                        <div className="col-1 pic">
                                            <img className="post-img" src={data.Image !== '' ? data.Image  : user} width="18px" height="18px" />
                                        </div>
                                        <div className="col-8 msg">
                                            <p className="">{data.Name} {data.Message} your post</p>
                                        </div>
                                        <div className="col-2 delnoti" onClick = {(e)=>{this.deletenotification(data.ID)}}>
                                           x
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <p>No notification</p>
                    }

                </div>
            </div>
        )
    }
}

Navbar.propTypes = propTypes

const options = {
    autoStart: false
}

const mapStateToProps = (state) => ({
    auth: state.payload
})
export default connect(mapStateToProps)(SpeechRecognition(options)(Navbar))