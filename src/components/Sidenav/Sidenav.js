import React, { Component } from 'react'
import logout from '../../images/logout.png'
import '../Sidenav/Sidenav.css'
import photo from '../../images/photos.png'
import science from '../../images/science.png'
import lit from '../../images/lit.png'
import health from '../../images/health.png'
import cook from '../../images/cook.png'
import music from '../../images/music.png'
import design from '../../images/design.png'
import movie from '../../images/movie.png'
import feed from '../../images/feed.png'
import { connect } from 'react-redux'
import { setfeed } from '../../actions';
import { Redirect } from 'react-router-dom'

class Sidenav extends Component {

    state = {
        redirect: false
    }

    feed = (a) => {

        var payload = {
            Feed: a
        }

        this.props.dispatch(setfeed(payload))

        this.setState({
            redirect: true
        })

    }

    render() {

        if (this.state.redirect === true) {
            return (<Redirect to={{
                pathname: "/",
            }} />
            )
        }

        var a = "row specific-menu";
        var b = "row specific-menu-hover";

        return (
            <div className="container-fluid ss">
                <span onClick={() => this.feed("Feed")}>
                    {console.log(this.props.auth.Feed,"Feed")}
                    <div className={this.props.auth.Feed == "Feed" ? b : a}>
                        <div className="col-1 feed"><img className="home-img" alt="one" src={feed} width="18px" height="18px" /></div>
                        <div className="col-8"><p className="titles">Feed</p></div>
                    </div>
                </span>
                <span onClick={() => this.feed("Photography")}>
                    <div className={this.props.auth.Feed == "Photography" ? b : a}>
                        <div className="col-1"><img className="home-img" alt="one" src={photo} width="18px" height="18px" /></div>
                        <div className="col-8"><p className="titles">Photography</p></div>
                    </div>
                </span>
                <span onClick={() => this.feed("Science")}>
                    <div className={this.props.auth.Feed == "Science" ? b : a}>
                        <div className="col-1"><img className="home-img" alt="one" src={science} width="18px" height="18px" /></div>
                        <div className="col-8"><p className="titles">Science</p></div>
                    </div>
                </span>
                <span onClick={() => this.feed("Literature")}>
                    <div className={this.props.auth.Feed == "Literature" ? b : a}>
                        <div className="col-1"><img className="home-img" alt="one" src={lit} width="18px" height="18px" /></div>
                        <div className="col-8"><p className="titles">Literature</p></div>
                    </div>
                </span>
                <span onClick={() => this.feed("Health")}>
                    <div className={this.props.auth.Feed == "Health" ? b : a}>
                        <div className="col-1"><img className="home-img" alt="one" src={health} width="18px" height="18px" /></div>
                        <div className="col-8"><p className="titles">Health</p></div>
                    </div>
                </span>
                <span onClick={() => this.feed("Cooking")}>
                    <div className={this.props.auth.Feed == "Cooking" ? b : a}>
                        <div className="col-1"><img className="home-img" alt="one" src={cook} width="18px" height="18px" /></div>
                        <div className="col-8"><p className="titles">Cooking</p></div>
                    </div>
                </span>
                <span onClick={() => this.feed("Music")}>
                    <div className={this.props.auth.Feed == "Music" ? b : a}>
                        <div className="col-1"><img className="home-img" alt="one" src={music} width="18px" height="18px" /></div>
                        <div className="col-8"><p className="titles">Music</p></div>
                    </div>
                </span>
                <span onClick={() => this.feed("Design")}>
                    <div className={this.props.auth.Feed == "Design" ? b : a}>
                        <div className="col-1"><img className="home-img" alt="one" src={design} width="18px" height="18px" /></div>
                        <div className="col-8"><p className="titles">Design</p></div>
                    </div>
                </span>
                <span onClick={() => this.feed("Movies")}>
                    <div className={this.props.auth.Feed == "Movies" ? b : a}>
                        <div className="col-1"><img className="home-img" alt="one" src={movie} width="18px" height="18px" /></div>
                        <div className="col-8"><p className="titles">Movies</p></div>
                    </div>
                </span>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.payload
})
export default connect(mapStateToProps)(Sidenav)