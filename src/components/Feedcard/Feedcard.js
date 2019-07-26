import React, { Component } from 'react'
import thumbsupnon from '../../images/thumbs-up-non.png'
import thumbsup from '../../images/thumbs-up.png'
import thumbsdownnon from '../../images/thumbs-down-non.png'
import thumbsdown from '../../images/thumbs-down.png'
import commentsnon from '../../images/comments-non.png'
import '../Feedcard/Feedcard.css'

class Feedcard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Category: this.props.Category,
            Title: this.props.Title,
            Name: this.props.Name,
            Image:this.props.Image,
            Post_image: this.props.Post_image,
            description: this.props.description,
            likes : this.props.likes,
            dislikes : this.props.dislikes,
            comments : this.props.comments,
            id : this.props.id,
            liked : this.props.liked,
            disliked : this.props.disliked,
        }
    }

    render() {
        var eg1 = "#rand" + this.state.id;
        var eg2 = "rand"+this.state.id;
        return (
            <div className="container-fluid box">
                <div className="row title">
                    <div className="col-4" id="answer-cat"><p>Answer - {this.state.Category}</p></div>
                    <div className="col-7"></div>
                    <div className="col-1"> <div className="close">x</div> </div>
                </div>
                <div className="row title">
                    <h4> {this.state.Title} </h4>
                </div>
                <div className="row author">
                    <div className="col-1 auth-img"> <img className="auth-img-ind" src={this.state.Image} width="25" height="25px" /> </div>
                    <div className="col-11 authname"> {this.state.Name}</div>
                </div>
                <div className="row image">
                    <img className="post" src={this.state.Post_image} />
                </div>
                <div className="row description">
                    {this.state.description}
                </div>
                <div className="row actions">
                    <div className="col-md-2 col-3 col-xs-4">
                        <div className="row">
                            <img className="" src={this.state.liked !== 'true' ? thumbsupnon : thumbsup } width="25" height="25px" />
                            <p className="like"> {this.state.likes} Likes</p>
                        </div>
                    </div>
                    <div className="col-md-2 col-3 col-xs-4">
                        <div className="row">
                            <div className=""> <img className="" src={this.state.disliked !== 'true' ? thumbsdownnon : thumbsdown } width="25" height="25px" />  </div>
                            <p className="like"> {this.state.dislikes} Disikes</p>
                        </div>
                    </div>
                    <div className="col-md-3 col-3 col-xs-4">
                        <div className="row">
                            <div className=""><img className="" src={commentsnon} width="25" height="25px" /></div>
                            <p className="like"> {this.state.comments} Comments</p>
                        </div>
                    </div>
                </div>
                <a data-toggle="collapse" href={eg1} role="button" aria-expanded="false" aria-controls="collapseExample"><p className="comment-link">Show comments</p></a>
                <div class="collapse" id={eg2}>
                    <div class="card card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div>
            </div>
        )
    }
}

export default Feedcard
