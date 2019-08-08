import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Navbar from '../Navbar/Navbar';
import '../Singlequestion/Singlequestion.css'
import ReactQuill, { Quill } from 'react-quill'; // ES6
import Answer from '../Answer/Answer';
import Axios from 'axios';
import user from '../../images/user.png'

class Singlequestion extends Component {
    constructor(props){
        super(props);
        this.state = {
            userid : this.props.location.state.userid,
            category : this.props.location.state.category,
            question : this.props.location.state.question,
            questionid : this.props.location.state.questionid,
            nooofanswers : this.props.location.state.nooofanswers,
            link : this.props.location.state.link,
            image : this.props.location.state.image,
            noofanswers : 0,
            text : '',
            error: {
                text: false,
            },
            answers : []
        }
    }

    submit = () => {
        var error = this.state.error
        if (this.state.text === '') {
            error.text = true
            this.setState({
                error
            })
        }
        else {
            error.text = false
            this.setState({
                error
            })
        }

        if (this.state.error.text === false) {
            var obj = {
                Userid: this.props.auth.Id,
                Questionid: this.state.questionid,
                Name: this.props.auth.Name,
                Answer: this.state.text,
                Profile: this.props.auth.Profilepic

            }
            var link = "http://localhost:8123/addanswer"
            Axios.post(link, obj).then(res => {
                alert("Answered successfully")

                var obj = {
                    Id: this.state.questionid
                }
                var link = "http://localhost:8123/getsinglequestion"
                Axios.post(link, obj).then(res => {
                    console.log("asnwer ", res.data.Answers)
                    this.setState({
                        noofanswers: res.data.Answers,
                    })
                    link = "http://localhost:8123/getanswers"
                    obj = {
                        ID : this.state.questionid
                    }
                    Axios.post(link, obj).then(res => {
                        this.setState({
                            answers : res.data
                        })
                    })
                })
            })
        }
    }

    componentDidMount(){
        var link = "http://localhost:8123/getanswers"
        var obj = {
            ID : this.state.questionid
        }
        Axios.post(link, obj).then(res => {
            this.setState({
                answers : res.data
            })
        })
    }

    handleChange = (value) => {
        this.setState({ 
            text: value
        })
    }

    render() {
        var styleObj = {
            "max-width" : "500px",
        }
        console.log(this.props.location)
        return (
            <div>
                <Navbar />
                <div className="container main-question">
                    <div className="row">
                        <p className="qcategory">category : {this.state.category}</p>
                    </div>
                    <div className="row">
                        <h1 className="single-question">{this.state.question}</h1>
                    </div>
                    <div className="row">
                        <p className="qlink">{this.state.link}</p>
                    </div>
                    {}
                    {this.state.userid !== this.props.auth.Id ? 
                    <div className="row">
                    <div className="clickforanswer col-2">
                        <div data-toggle="collapse" onClick={this.getcomments} href="#one" role="button" aria-expanded="false" aria-controls="collapseExample" >
                            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="answer" transform="translate(2.500000, 3.500000)" stroke="none" stroke-width="1.5" fill="none" fill-rule="evenodd">
                                    <g id="pen" transform="translate(9.000000, 9.000000) rotate(-315.000000) translate(-9.000000, -9.000000) translate(7.000000, -1.000000)">
                                        <path d="M2,8.8817842e-16 L2,8.8817842e-16 L2,8.8817842e-16 C3.1045695,6.85269983e-16 4,0.8954305 4,2 L4,16 L2.00256278,20 L0,16 L0,2 L0,2 C-1.35267774e-16,0.8954305 0.8954305,1.09108686e-15 2,8.8817842e-16 Z" id="pen_body" class="icon_svg-stroke" stroke="#666" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <polygon id="pen_tip" class="icon_svg-fill_as_stroke" fill="#666" transform="translate(2.000000, 18.750000) scale(1, -1) translate(-2.000000, -18.750000) " points="2 17.5 3.25 20 0.75 20"></polygon>
                                    </g>
                                    <path d="M12,16 L17,16 L17,11 M7,1 L2,1 L2,6" id="bg" class="icon_svg-stroke" stroke="#666" stroke-linecap="round" stroke-linejoin="round"></path>
                                </g>
                            </svg> Answer
                        </div>
                    </div>
                    </div>
                    :
                    <p className="sameuser">You asked this question, so you can't answer.</p>
                    }
                    <hr/>
                    <div class="row collapse" id="one">
                            <div class="answer-card card-body">
                                <ReactQuill className="answer-quil" value={this.state.text}
                                    onChange={this.handleChange} /><br/>
                                <button onClick={this.submit} className="btn btn-sm btn-success cbtn">Answer</button>
                                {/* <div dangerouslySetInnerHTML={{__html: this.state.text}}></div> */}
                            </div>
                    </div>
                    {this.state.answers !== null ?
                            <div className="row ans">
                                <p className="noofanswers">{this.state.answers.length} Answers found.</p>

                                {this.state.answers.map((data, i) => {
                                    return (
                                        <div className="col-12 dcmt">
                                            
                                            <p className="cuname">  <img className="auth-img-cmt" src={data.Profile} width="40" height="40px" />  <b> {data.Name} </b> </p>
                                            <p className="cmt"> <div className="setwidth" dangerouslySetInnerHTML={{__html: data.Answer}} style={styleObj}></div> </p>
                                            <hr />
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            ''
                        }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.payload
})
export default connect(mapStateToProps)(Singlequestion)