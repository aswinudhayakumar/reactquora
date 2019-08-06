import React, { Component } from 'react'
import thumbsupnon from '../../images/thumbs-up-non.png'
import thumbsup from '../../images/thumbs-up.png'
import del from '../../images/delete.png'
import thumbsdownnon from '../../images/dislike.png'
import thumbsdown from '../../images/thumbs-down.png'
import commentsnon from '../../images/comments-non.png'
import '../Feedcard/Feedcard.css'
import { connect } from 'react-redux'
import Axios from 'axios';

class Feedcard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Category: this.props.Category,
            Title: this.props.Title,
            Name: this.props.Name,
            Image: this.props.Image,
            Post_image: this.props.Post_image,
            description: this.props.description,
            likes: this.props.likes,
            dislikes: this.props.dislikes,
            comments: this.props.comments,
            id: this.props.id,
            userid : this.props.userid,
            liked: this.props.liked,
            disliked: this.props.disliked,
            date: this.props.Date,
            time: this.props.Time,
            mycomment: '',
            postcomments: null,
            readmore  : '',
            readless : '',
            show : "readless"
        }

    }



    componentDidMount() {
        var obj = {
            Postid: this.state.id,
            Userid: parseInt(this.props.auth.Id),
            Name: "",
            Like: 1,
            Comment: '',
        }
        var link = "http://localhost:8123/getliked"
        Axios.post(link, obj).then(res => {
            console.log(res.data)
            this.setState({
                liked: res.data.Like,
                disliked: res.data.Dislike
            })
        })
        if( this.state.description.length > 256 ){
             this.setState({
                 readless : this.state.description.slice(0, 256),
                 readmore : this.state.description,
                 show : "readmore"
             })
         }
         else{
             
         }
    }

    formhandle = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })

    }

    like = () => {
        var obj = {
            Postid: this.state.id,
            Userid: this.props.auth.Id,
            Name: this.props.auth.Name,
            Profile : this.props.auth.Profilepic,
            Like: 1,
            Dislike: 0,
            Comment: '',
        }
        if (this.state.liked !== 1) {
            var link = "http://localhost:8123/like"
            Axios.post(link, obj).then(res => {
                this.setState({
                    liked: 1,
                    likes: this.state.likes + 1,
                })

                if( this.state.id !== this.props.auth.Id){
                    link = "http://localhost:8123/setnotification"
                    obj = {
                        Postid : this.state.id,
                        Userid :this.props.auth.Id,
                        Postuserid : this.state.userid,
                        Image : this.props.auth.Profilepic,
                        Message : "liked",
                        Name : this.props.auth.Name,
                    }
                    Axios.post(link, obj).then(res => {
                        
                    })
                }

            })
            if (this.state.disliked === 1) {
                this.setState({
                    disliked: 0,
                    dislikes: this.state.dislikes - 1,
                })
            }
        }
        else {
            console.log("already liked");
            var link = "http://localhost:8123/like"
            Axios.post(link, obj).then(res => {
                this.setState({
                    liked: 0,
                    likes: this.state.likes - 1,
                })
                this.setState({
                    liked: 0,
                })
                link = "http://localhost:8123/resetlikenotification"
                obj = {
                    Postid : this.state.id,
                    Userid :this.props.auth.Id,
                    Postuserid : this.state.userid,
                    Message : "liked",
                    Name : this.props.auth.Name,
                }
                Axios.post(link, obj).then(res => {

                })
            })
        }
    }

    dislike = () => {
        var obj = {
            Postid: this.state.id,
            Userid: this.props.auth.Id,
            Name: "",
            Like: 1,
            Dislike: 0,
            Comment: '',
        }
        if (this.state.disliked !== 1) {
            var link = "http://localhost:8123/dislike"
            Axios.post(link, obj).then(res => {
                this.setState({
                    disliked: 1,
                    dislikes: this.state.dislikes + 1,
                })
            })
            if (this.state.liked === 1) {
                this.setState({
                    liked: 0,
                    likes: this.state.likes - 1,
                })
            }
        }
        else {
            console.log("already disliked");
            var link = "http://localhost:8123/dislike"
            Axios.post(link, obj).then(res => {
                this.setState({
                    disliked: 0,
                    dislikes: this.state.dislikes - 1,
                })
                this.setState({
                    disliked: 0,
                })
            })
        }

    }

    getcomments = () => {
        var obj = {
            Postid: this.state.id,
            Userid: 0,
            Name: '',
            Like: 0,
            Dislike: 0,
            Comment: '',
        }
        var link = "http://localhost:8123/getcomments"
        Axios.post(link, obj).then(res => {
            console.log("Here ",res.data)
            this.setState({
                postcomments: res.data
            })
        })
    }

    comment = (e) => {
        e.preventDefault()
        if (this.state.mycomment !== '') {
            var obj = {
                Postid: this.state.id,
                Userid: parseInt(this.props.auth.Id),
                Name: this.props.auth.Name,
                Profile : this.props.auth.Profilepic,
                Like: 0,
                Dislike: 0,
                Comment: this.state.mycomment,
            }
            var link = "http://localhost:8123/comment"
            Axios.post(link, obj).then(res => {
                var link = "http://localhost:8123/getcomments"
                Axios.post(link, obj).then(res => {
                    console.log(res.data)
                    this.setState({
                        postcomments: res.data,
                        comments: this.state.comments + 1
                    })
                    if( this.state.id !== this.props.auth.Id){
                        link = "http://localhost:8123/setnotification"
                        obj = {
                            Postid : this.state.id,
                            Userid :this.props.auth.Id,
                            Postuserid : this.state.userid,
                            Image : this.props.auth.Profilepic,
                            Message : "commented",
                            Name : this.props.auth.Name,
                        }
                        Axios.post(link, obj).then(res => {
                            
                        })
                    }
                })
            })

        }
    }

    closepost = () => {
        document.getElementById("box").style.display = "none";
    }

    readmore = () => {
        this.setState({
            show : "readless"
        })
    }

    readless = () => {
        this.setState({
            show : "readmore"
        })
    }

    render() {

        var eg1 = "#rand" + this.state.id;
        var eg2 = "rand" + this.state.id;
        var bid = "b" + this.state.id
        var place = "Type your comments here " + this.props.auth.Name
        return (
            <div className="container-fluid box" id="box">
                <div className="row title">
                    <div className="col-4" id="answer-cat"><p>Category - {this.state.Category}</p></div>
                    <div className="col-7"></div>
                    <div className="col-1"> <span onClick={this.closepost}><div className="closepost">X</div></span> </div>
                </div>
                <div className="row title">
                    <p className="ptitle"> {this.state.Title} </p>
                </div>
                <div className="row author">
                    <div className="col-1 auth-img"> <img className="auth-img-ind" src={this.state.Image} width="40" height="40px" /> </div>
                    <div className="col-10 authname"> {this.state.Name} <p className="time">Posted on {this.state.date} {this.state.time}</p> </div>
                </div>
                {this.state.Post_image === "http://localhost:8123/" ?
                    ''
                    :
                    <div className="row image">
                        {console.log(this.state.Post_image)}
                        <img className="post" src={this.state.Post_image} />
                    </div>
                }

                <div className="row description">
                    {console.log(this.state.readmore, this.state.readless)}
                    {this.state.show === "readless" ? <p>{this.state.description}  {this.state.description.length > 100 ? <span className="read" onClick={this.readless}><p>...readless</p></span> : ''} </p> : <p>{this.state.readless} <span className="read" onClick={this.readmore}><p>...readmore</p></span> </p>}
                </div>
                <div className="row actions">
                    <div className="cur col-md-2 col-3 col-xs-4">
                        <div className="row" onClick={this.like}>
                            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                                <g id="upvote" class="icon_svg-stroke icon_svg-fill" stroke-width="1.5" stroke="#666" fill={this.state.liked === 1 ? "#349afb" : "none" } fill-rule="evenodd" stroke-linejoin="round">
                                    <polygon points="12 4 3 15 9 15 9 20 15 20 15 15 21 15"></polygon>
                                </g>
                            </svg>

                            <p className="like"> {this.state.likes} Likes</p>
                        </div>
                    </div>
                    <div className="cur col-md-2 col-3 col-xs-4">
                        <div className="row" onClick={this.dislike}>
                            <div className=""> <img className="" src={this.state.disliked !== 1 ? thumbsdownnon : thumbsdown} width="24" height="24" />  </div>
                            <p className="like"> {this.state.dislikes} Disikes</p>
                        </div>
                    </div>
                    <div className="cur col-md-3 col-3 col-xs-4">
                        <div data-toggle="collapse" onClick={this.getcomments} href={eg1} role="button" aria-expanded="false" aria-controls="collapseExample" className="row">
                            <div className=""><svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="comment"  class="icon_svg-stroke icon_svg-fill" stroke="#666" stroke-width="1.5" fill="none" fill-rule="evenodd">
                                    <path d="M12.0711496,18.8605911 C16.1739904,18.8605911 19.5,15.7577921 19.5,11.9302955 C19.5,8.102799 16.1739904,5 12.0711496,5 C7.96830883,5 4.64229922,8.102799 4.64229922,11.9302955 C4.64229922,13.221057 5.02055525,14.429401 5.67929998,15.4641215 C5.99817082,15.9649865 4.1279592,18.5219189 4.56718515,18.9310749 C5.02745574,19.3598348 7.80252458,17.6358115 8.37002246,17.9406001 C9.45969688,18.5258363 10.7235179,18.8605911 12.0711496,18.8605911 Z"></path>
                                </g>
                            </svg></div>
                            <p className="like"> {this.state.comments} Comments</p>
                        </div>
                    </div>

                </div>
                <div class="collapse" id={eg2}>
                    <div class="card card-body">
                        <form onSubmit={this.comment}>
                            <div className="row">
                                <div className="auth-img"> <img className="auth-img-ind" src={this.props.auth.Profilepic} width="40" height="40px" /> </div>
                                <div className="col-8 type"><input name="mycomment" value={this.state.mycomment} onChange={this.formhandle} type="text" className="custin" placeholder={place} /></div>
                                {this.state.mycomment !== '' ? <div className="col-2 cbtn"> <button className="btn btn-success cbtn btn-sm" >Comment</button> </div> : <p className="rec">Recommended</p>}

                            </div>
                        </form>
                        {this.state.postcomments !== null  ?
                            <div className="row">
                                {this.state.postcomments.map((data, i) => {
                                    return (
                                        <div className="col-12 dcmt">
                                            <hr />
                                            <p className="cuname"> <img className="auth-img-cmt" src={data.Profile} width="40" height="40px" /> <b> {data.Name} </b> {data.Userid === this.props.auth.Id ? <span className="delcmt"> <img src={del} height="15px" width="15px" /> </span> : ''}</p>
                                            <p className="cmt">{data.Comment}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            ''
                        }
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.payload
})
export default connect(mapStateToProps)(Feedcard)