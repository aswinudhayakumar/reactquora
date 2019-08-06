import React, { Component } from 'react'
import '../Questions/Question.css'
import ReactQuill, { Quill } from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import { Redirect, Link } from 'react-router-dom'
import Aquil from '../Questions/quil'
import del from '../../images/delete.png'
import { connect } from 'react-redux'
import Axios from 'axios';


class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userid : this.props.userid,
            category: this.props.category,
            question: this.props.question,
            link: this.props.link,
            noofanswers: this.props.noofanswers,
            questionid: this.props.questionid,
            text: '',
            answers: [{ Answer: "Yes", Name: "Tester" }],
            image: this.props.image,
            error: {
                text: false,
            },
        }
        this.handleChange = this.handleChange.bind(this)
        this.modules = {
            formula: true,
            toolbar: {
                container: [['bold', 'italic', 'underline', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['formula', 'link', 'image'],
                ['clean']],
                handlers: {
                    'image': this.imageHandler
                }
            }
        };
    }

    handleChange(value) {
        this.setState({
            text: value
        })
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
                })
            })
        }
    }

    fun = () => {
        this.setState({
            redirect : true 
        })
    }

    render() {
        console.log(typeof this.state.text)

        if(this.state.redirect === true){
            return(
                <Redirect to={{
                    pathname: '/question',
                    state: { category : this.state.category,
                        question : this.state.question,
                        questionid : this.state.questionid,
                        nooofanswers : this.state.nooofanswers,
                        link : this.state.link,
                        userid : this.state.userid,
                        image : this.state.image, }
                }}
                />
            )
        }

        var eg1 = "#rand" + this.state.questionid;
        var eg2 = "rand" + this.state.questionid;
        return (
            <div className="container-fluid ind-question-box">
                <p className="question-cat">Question added - {this.state.category}</p>
                <span onClick={this.fun}><p className="ind-question">{this.state.question}</p></span>
                <p className="question-link">{this.state.link}</p>
                <span><p className="noofanswers">No of answers : {this.state.noofanswers}</p></span>
                {this.state.userid !== this.props.auth.Id ? 
                <div className="row actions">

                    <div className="clickforanswer col-2">
                        <div data-toggle="collapse" onClick={this.getcomments} href={eg1} role="button" aria-expanded="false" aria-controls="collapseExample" >
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
                <div class="collapse" id={eg2}>
                    <div class="answer-card card-body">
                        <ReactQuill className="editor" value={this.state.text}
                            onChange={this.handleChange} /><br />
                        <button onClick={this.submit} className="btn btn-sm btn-success">Answer</button>
                        {/* <div dangerouslySetInnerHTML={{__html: this.state.text}}></div> */}
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.payload
})
export default connect(mapStateToProps)(Question)