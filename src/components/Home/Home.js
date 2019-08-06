import React, { Component } from 'react'
import Sidenav from '../Sidenav/Sidenav';
import '../Home/Home.css'
import user from '../../images/user.png'
import postimg from '../../images/post.jpg'
import Post from '../Post/Post';
import Feedcard from '../Feedcard/Feedcard';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from '../Navbar/Navbar';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dp : this.props.auth.Profilepic,
            posts: null,
        }
    }

    componentWillMount() {
        var link = "http://localhost:8123/feed"
        var obj = {
            Category: this.props.auth.Feed
        }
        axios.post(link, obj).then(res => {
            var fields = res.data
            if(res.data !== null){
            fields.sort((a, b) => (b.ID > a.ID) ? 1 : -1)
            console.log("res", res.data)
            console.log("field", fields)
            if (res.data != null) {
                this.setState({
                    posts: fields
                })
            }
        }
        })
    }


    render() {

        if (this.props.auth.Logged === true) {
            return (
                <div className="container-fluid maincont">
                    <div className="tnav">
                    <Navbar Feed="Home"/>
                    </div>
                    <div className="container hnav">

                        <div className="row">
                            <div className="col-md-2 side col-sm-3 col-xs-12">
                                <Sidenav />
                            </div>
                            <div className="col-md-7 main col-sm-8 col-xs-12">
                                {this.props.auth.Feed === "Feed" ? <Post /> : '' }
                                
                                {this.props.auth.Feed !== "Feed" ? <p className="selected">Now showing {this.props.auth.Feed} Posts</p> : ''}
                                {this.state.posts !== null ?
                                    this.state.posts.map((data, i) => {
                                        var pic = "http://localhost:8123/" + data.Postimage
                                        console.log(pic)
                                        return (
                                            <Feedcard liked="false" userid={data.Userid} disliked="false" id={data.ID} Category={data.Category} Title={data.Title} Name={data.Name} Date={data.Date} Time={data.Time} Image={data.Image !== '' ? data.Image : user} Post_image={pic} description={data.Description} likes={data.Likes} dislikes={data.Dislikes} comments={data.Comments} />
                                        )
                                    })
                                    :
                                    ""
                                }

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (<Redirect to={{
                pathname: "/",
            }} />
            )
        }
    }

}

const mapStateToProps = (state) => ({
    auth: state.payload
})
export default connect(mapStateToProps)(Home)