import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import '../Profile/Profile.css'
import { connect } from 'react-redux'
import change from '../../images/change.svg'
import out from '../../images/exit.png'
import post from '../../images/post.svg'
import question from '../../images/blog.svg'
import { logout } from '../../actions'
import Axios from 'axios';
import user from '../../images/user.png'
import Feedcard from '../Feedcard/Feedcard';
import Question from '../Questions/Question';

class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            old : '',
            new : '',
            pchange : false,
            post : null,
            question : null,
            verify : false,
            posts : 0,
            questions : 0,
            answers : 0,
            postorques : true,
        }
    }

    componentWillMount(){
        var link = "http://localhost:8123/getprofiledetails"
        var obj = {
            ID : this.props.auth.Id
        }
        Axios.post(link, obj).then(res=>{
            console.log("Hello ",res.data)
            this.setState({
                posts : res.data.Posts,
                questions : res.data.Questions,
                answers : res.data.Answers,
                post : res.data.Post,
                question : res.data.Question
            })
        })
    }

    formhandle = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    logout = () => {
        this.props.dispatch(logout())
        localStorage.removeItem("webtoken")
        window.location.replace("http://localhost:3000/")
    }

    enableedit = () => {
        this.setState({
            pchange : !this.state.pchange
        })
    }

    verify = () => {
        if( this.state.old !== '' ){
            var link = "http://localhost:8123/verifypass"
            var obj = {
                ID : this.props.auth.Id,
                Password : this.state.old, 
            }
            
            Axios.post(link, obj).then(res => {

                this.setState({
                    pchange : false,
                    verify : true
                })
            })
        }
    }

    setpass = () => {
        if( this.state.new.length >= 8 ){
            var link = "http://localhost:8123/setpass"
            var obj = {
                ID : this.props.auth.Id,
                Password : this.state.new, 
            }
            Axios.post(link, obj).then(res => {
                    alert("Password changed successfully !")
                    this.setState({
                        pchange : false,
                        verify : false,
                        new : '',
                        old : ''
                    })
            })
        }
    }

    post = () => {
        this.setState({
            postorques : true
        })
    }

    ques = () => {
        this.setState({
            postorques : false
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="container-fluid maincont">
            <div className="tnav">
            <Navbar/>
            </div>
            <div className="container profile-nav hnav">
                <div className="row user-main">
                    <div className="col-2 pic-col">
                        <img className="profile-pic" src={this.props.auth.Profilepic} /><br/>
                        <p className="change-btn">Change</p>
                    </div>
                    <div className="col-3 user-details">
                        <h1 className="auth-profile-name">{this.props.auth.Name}</h1>
                        Total Posts posted : {this.state.posts}<br/>
                        Total Questions Asked : {this.state.questions}<br/>
                        Total Answers Given : {this.state.answers}<br/>
                    </div>
                    <div className="col-4 profile-menu">
                         <span onClick={this.enableedit}><img src={change} height="25px" width="25px"/> Change password <br/><br/></span>
                         {
                        this.state.pchange === true ? 
                         <span><input className="form-control form-control-sm" name="old" value={this.state.old} onChange={this.formhandle} type="password" placeholder="Enter old password" /><span onClick={this.verify}><p className="vbtn">Verify</p></span> <br/></span>
                            :
                            ''
                        }
                        {
                        this.state.verify === true ? 
                        <span><input className="form-control form-control-sm" name="new" value={this.state.new} onChange={this.formhandle} type="password" placeholder="Enter New password" /><span onClick={this.setpass}><p className="vbtn">Change</p></span> <br/></span>
                            :
                            ''
                        }                
                         <span className="logout-btn" onClick={this.logout}><img src={out} height="25px" width="25px"/> Logout</span>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-2 side li col-sm-3 col-xs-12">
                        <span className="direct-btn" onClick={this.post}>{this.state.postorques === false ? <p> My Posts </p> : <b><p>My Posts</p></b> } </span>
                        <span className="direct-btn" onClick={this.ques}>{this.state.postorques === true ? <p> My Questions </p> : <b><p>My Questions</p></b> }</span>
                    </div>
                    <div className="col-md-7 col-sm-8 col-xs-12">
                    {this.state.postorques === true ? <h4 className="head">Your Posts</h4> : <h4 className="head">Your Questions</h4> }
                        {
                            this.state.postorques === true ? 
                            
                            this.state.post !== null ?
                            
                            this.state.post.map((data,i)=>{
                                var pic = "http://localhost:8123/" + data.Postimage
                                console.log(pic)
                                return(
                                    <Feedcard liked="false" userid={data.Userid} disliked="false" id={data.ID} Category={data.Category} Title={data.Title} Name={data.Name} Date={data.Date} Time={data.Time} Image={data.Image !== '' ? data.Image : user} Post_image={pic} description={data.Description} likes={data.Likes} dislikes={data.Dislikes} comments={data.Comments} />
                                )
                            })

                            :

                            ''
                            
                            :

                            this.state.question.map((data, i) => {
                                return (
                                    <div>
                                            <Question category={data.Category} userid = {data.Userid} image={user} question={data.Question} link={data.Link} noofanswers={data.Answers} questionid={data.ID} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.payload
})
export default connect(mapStateToProps)(Profile)