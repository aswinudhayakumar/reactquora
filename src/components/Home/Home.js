import React, { Component } from 'react'
import Sidenav from '../Sidenav/Sidenav';
import '../Home/Home.css'
import user from '../../images/user.png'
import postimg from '../../images/post.jpg'
import Post from '../Post/Post';
import Feedcard from '../Feedcard/Feedcard';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row side">
                    <div className="col-md-3 col-sm-3 col-xs-12">
                        <Sidenav />
                    </div>
                    <div className="col-md-7 col-sm-8 col-xs-12">
                        <Post />
                        <Feedcard liked="true" disliked="false" id='1' Category = 'Category' Title= 'Post title or Question' Name= 'User name' Image = {user} Post_image = {postimg} description = 'description' likes = '121' dislikes = '2' comments = '5' id = '1' />
                        <Feedcard liked="false" disliked="true" id='1' Category = 'Category' Title= 'Post title or Question' Name= 'User name' Image = {user} Post_image = {postimg} description = 'description' likes = '121' dislikes = '2' comments = '5' id = '2' />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
