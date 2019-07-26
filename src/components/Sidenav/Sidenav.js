import React, { Component } from 'react'
import logout from '../../images/logout.png'
import '../Sidenav/Sidenav.css'
import photo from '../../images/photos.png'
import science from '../../images/science.png'
import lit from '../../images/lit.png'
import health from '../../images/health.png'
import cook from '../../images/cook.png'
import music from '../../images/music.png'
import sport from '../../images/sport.png'
import movie from '../../images/movie.png'
import feed from '../../images/feed.png'

class Sidenav extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row specific-menu">
                    <div className="col-1 "><img className="home-img" alt="one" src={feed} width="20px" height="20px" /></div>
                    <div className="col-8">Feed</div>
                </div>
                <div className="row specific-menu">
                    <div className="col-1"><img className="home-img" alt="one" src={photo} width="20px" height="20px" /></div>
                    <div className="col-8">Photography</div>
                </div>
                <div className="row specific-menu">
                    <div className="col-1"><img className="home-img" alt="one" src={science} width="20px" height="20px" /></div>
                    <div className="col-8">Science</div>
                </div>
                <div className="row specific-menu">
                    <div className="col-1"><img className="home-img" alt="one" src={lit} width="20px" height="20px" /></div>
                    <div className="col-8">Literature</div>
                </div>
                <div className="row specific-menu">
                    <div className="col-1"><img className="home-img" alt="one" src={health} width="20px" height="20px" /></div>
                    <div className="col-8">Health</div>
                </div>
                <div className="row specific-menu">
                    <div className="col-1"><img className="home-img" alt="one" src={cook} width="20px" height="20px" /></div>
                    <div className="col-8">Cooking</div>
                </div>
                <div className="row specific-menu">
                    <div className="col-1"><img className="home-img" alt="one" src={music} width="20px" height="20px" /></div>
                    <div className="col-8">Music</div>
                </div>
                <div className="row specific-menu">
                    <div className="col-1"><img className="home-img" alt="one" src={sport} width="20px" height="20px" /></div>
                    <div className="col-8">Sports</div>
                </div>
                <div className="row specific-menu">
                    <div className="col-1"><img className="home-img" alt="one" src={movie} width="20px" height="20px" /></div>
                    <div className="col-8">Movies</div>
                </div>
            </div>
        )
    }
}

export default Sidenav
