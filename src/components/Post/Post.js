import React, { Component } from 'react'
import user from '../../images/user.png'
import '../Post/Post.css'

export default class Post extends Component {

    render() {
        return (
            <div className="Container-fluid">
                <div className="Container-fluid askquestion">
                    <div className="row">
                        <div className="col-1"> <img className="post-img" src={user} width="20px" height="20px" /> </div>
                        <div className="col-11 uname"> User Name </div>
                    </div>
                    <div className="row post">
                        <div className="col-1"></div>
                        <div className="col-11 uname"><b>Post your Questions or Link</b> </div>
                    </div>
                </div>
            </div>
        )
    }
}
