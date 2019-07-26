import React, { PureComponent } from 'react'
import '../Navbar/Navbar.css'
import home from '../../images/home.png'
import answer from '../../images/answer.png'
import settings from '../../images/settings.png'
import user from '../../images/user.png'
import profile from '../../images/profile.png'
import logout from '../../images/logout.png'

class Navbar extends PureComponent {
    render() {
        return (
            <nav class="navbar navbar-expand-lg nav-bg">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="#">Quora</a>

                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">

                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">
                                <div className="row">
                                    <div className="col-md-1"> <img className="home-img" src={home} width="20px" height="20px" /> </div>
                                    <div className="col-md-6 name"> Home <span class="sr-only">(current)</span> </div>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="#">
                                <div className="row">
                                    <div className="col-md-1"> <img className="home-img" src={answer} width="20px" height="20px" /> </div>
                                    <div className="col-md-6 name"> Answer <span class="sr-only">(current)</span> </div>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="#">
                                <div className="row">
                                    <div className="col-md-1"> <img className="home-img" src={settings} width="20px" height="20px" /> </div>
                                    <div className="col-md-6 name"> Posts <span class="sr-only">(current)</span> </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div class="dropdown">
                        <div class="form-inline my-2 my-lg-0 dropdown-toggle" data-toggle="dropdown">
                            <img className="home-img" src={user} width="20px" height="20px" /> <p className="user"> Hello User </p>
                        </div>
                        <div class="dropdown-menu dpmenu">
                            <a class="dropdown-item" href="#">
                                <div className="row">
                                    <div className="col-1"> <img className="home-img" src={profile} width="20px" height="20px" /> </div>
                                    <div className="col name"> Profile <span class="sr-only">(current)</span> </div>
                                </div>
                            </a>
                            <a class="dropdown-item" href="#">
                                <div className="row">
                                    <div className="col-1"> <img className="home-img" src={settings} width="20px" height="20px" /> </div>
                                    <div className="col name"> Settings <span class="sr-only">(current)</span> </div>
                                </div>
                            </a>
                            <a class="dropdown-item" href="#">
                                <div className="row">
                                    <div className="col-1"> <img className="home-img" src={logout} width="20px" height="20px" /> </div>
                                    <div className="col name"> Logout <span class="sr-only">(current)</span> </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar
