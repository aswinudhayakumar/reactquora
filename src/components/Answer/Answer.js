import React, { Component } from 'react'
import '../Answer/Answer.css'
import Sidenav from '../Sidenav/Sidenav';
import user from '../../images/user.png'
import postimg from '../../images/post.jpg'
import Post from '../Post/Post';
import Feedcard from '../Feedcard/Feedcard';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from '../Navbar/Navbar';
import Question from '../Questions/Question';
import Axios from 'axios';

class Answer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Questions: null,
        }
    }

    componentWillMount() {
        var link = "http://localhost:8123/getquestion"
        Axios.post(link).then(res => {
            console.log(res.data)
            this.setState({
                Questions: res.data
            })
        })
    }

    render() {
        console.log("quest ", this.state.Questions)
        if (this.props.auth.Logged === true) {
            return (
                <div className="container-fluid maincont">
                    <div className="tnav">
                        <Navbar Feed="Answer" />
                    </div>
                    <div className="container hnav">

                        <div className="row">
                            <div className="col-md-2 side col-sm-3 col-xs-12">

                            </div>
                            <div className="col-md-7 main col-sm-8 col-xs-12">
                                {
                                    this.state.Questions !== null
                                        ?
                                        <div>

                                            {this.state.Questions.map((data, i) => {
                                                return (
                                                    <div>
                                                            <Question category={data.Category} userid = {data.Userid} image={user} question={data.Question} link={data.Link} noofanswers={data.Answers} questionid={data.ID} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        :
                                        ''
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
export default connect(mapStateToProps)(Answer)