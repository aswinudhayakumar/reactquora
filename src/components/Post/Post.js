import React, { Component } from 'react'
import user from '../../images/user.png'
import '../Post/Post.css'
import { connect } from 'react-redux'
import uploadimage from '../../images/signup.png'
import Axios from 'axios';
import { Redirect, } from 'react-router-dom'
import Speech from '../Speech/Speech';
import SpeechRecognition from 'react-speech-recognition'
import PropTypes from "prop-types";
import mic from '../../images/mic.png'

const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    startListening: PropTypes.func,
    stopListening: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
}

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            link: '',
            question: '',
            description: '',
            category: '',
            image: '',
            img: "",
            questioncat : "Others",
            show : this.props.show,
            error: {
                title: false,
                description: false,
                category: false,
                image: false,
                question: false,
                link: false,
            },
            trans : this.props.transcript,
            startListening : this.props.startListening,
            stopListening : this.props.stopListening,
            browserSupportsSpeechRecognition : this.props.browserSupportsSpeechRecognition,
            resetTranscript : this.props.resetTranscript 
        }
    }

    submit = (e) => {

        e.preventDefault()

        var error = this.state.error
        if (this.state.title === '') {
            error.title = true
            this.setState({
                error
            })
        } else {
            error.title = false
            this.setState({
                error
            })
        }

        if (this.state.description === '') {
            error.description = true
            this.setState({
                error
            })
        } else {
            error.description = false
            this.setState({
                error
            })
        }

        if (this.state.category === '') {
            error.category = true
            this.setState({
                error
            })
        } else {
            error.category = false
            this.setState({
                error
            })
        }

        if (this.state.error.title === false && this.state.error.description === false && this.state.error.category === false && this.state.error.image === false) {

            var d = new Date()
            var date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()
            var hrs = d.getHours()
            var mins = d.getMinutes()
            var ap = "AM"
            if (hrs > 12) {
                hrs = hrs % 12
                ap = "PM"
            }
            var time = hrs + " : " + mins + " " + ap
            var link = "http://localhost:8123/newpost"
            var obj = {
                Title: this.state.title,
                Description: this.state.description,
                Category: this.state.category,
                Postimage: '',
                Image: this.props.auth.Profilepic,
                Userid: this.props.auth.Id,
                Name: this.props.auth.Name,
                Likes: 0,
                Dislikes: 0,
                Comments: 0,
                Date: date,
                Time: time
            }
            Axios.post(link, obj).then(res => {

                const fm = new FormData()
                fm.append("image", this.state.image)

                if (this.state.error.image === false) {

                    Axios.post("http://localhost:8123/uploadimage", fm).then(res => {
                        window.location.replace("http://localhost:3000")
                    })

                } else {
                    alert("Only jpg/jpeg and png files are allowed!");
                }

            })

        }

    }

    askquestion = (e) => {
        e.preventDefault()
        var error = this.state.error
        if (this.state.question === '' || this.state.question.length > 45) {
            error.question = true
            this.setState({
                error
            })
        } else {
            error.question = false
            this.setState({
                error
            })
        }
        if (this.state.link.length > 45) {
            error.link = true
            this.setState({
                error
            })
        } else {
            error.link = false
            this.setState({
                error
            })
        }

        if (this.state.error.question === false && this.state.error.question === false) {



            var obj = {
                Name: this.props.auth.Name,
                Userid: parseInt(this.props.auth.Id),
                Question: this.state.question,
                Link: this.state.Link,
                Profile : this.props.auth.Image,
                Userimage: this.props.auth.Profilepic,
                Category: this.state.questioncat,
            }

            var link = "http://localhost:8123/newquestion"
            Axios.post(link,obj).then(res => {
                alert("Question added successfully !")
            })
        }

    }

    formhandle1 = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })

        if(event.target.value === ''){
            this.setState({
                trans : ''
            })
            return(
                this.props.resetTranscript
            )
        }

    }

    start = (e) =>{
        this.setState({
            trans: ''
        })
        this.state.startListening()
        setTimeout(this.state.stopListening, 3000);
        setTimeout(this.stop, 3000);
        setTimeout(this.state.stopListening, 3000);
    }

    stop = () =>{
        
        this.setState({
            question: this.props.transcript
        })

      this.state.resetTranscript()
    }


    formhandle = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })

        if(event.target.name === "question"){
            var cat = '';
            var question = this.state.question;
            question = question.toLowerCase();
            var cook = ["food", "eat", "eaten", "eating", "ate", "cook", "cooked", "cooking", "vegetables", "vegetarian", "veg", "non vegetarian", "non veg", "non-veg", "noodles", "idly", "doosa", "cake", "fruits"]
            var photo = [ "photo", "photography", "camera", "photographer", "click", "exposure", "lens", "iso", "frame", "rate", "framerate", "slow", "motion", "nature", "nikon", "cannon", "tripod" ]
            var science = [ "science", "technology", "mobile", "device", "computer", "pc", "laptop", "innovation", "phone", "samsung", "nokia", "macbook", "iphone", "led", "amoled", "display", "processor", "cpu", "gpu", "graphics", "chemical", "lab" ]
            var health = [ "health", "nurtition", "healthy", "lifestyle", "disease", "diseases", "diseased", "body", "human", "oragan", "heart", "lungs", "kidney", "liver", "eye", "cancer", "human", "aids", "cough", "syrup", "tablet", "exercise", "yoga" ]
            var music = [ "music", "song", "songs", "singer", "keyboard", "guitar", "drums", "melody", "folk", "aux", "remix", "rahman", "ilayaraja", "yuvan", "arr", "ysr", "track", "audio", "album" ]
            var movies = [ "movie", "movies", "theater", "director", "hero", "producer", "hollywood", "bollywood", "kollywood", "tollywood", "sandalwood", "heroine", "actor", "actress", "shooting", "cinema", "comedy", "comedian", "thala", "superstar", "thalapathy" ]
            var design = ["design", "render", "architecture", "arch", "building", "bridge", "road", "rectangle", "circle", "triangle", "polygonal", "flat", "home", "house"]
            var lit = ["literature", "language", "english", "tamil", "grammar"]
            var arr = this.state.question.split(" ")
            var c = 0;
            var x = '';
            for (x of arr) {
                if (cook.includes(x)) {
                    c += 1
                }
            }
            var cook_count = c;
            c = 0;
            for (x of arr) {
                if (photo.includes(x)) {
                    c += 1
                }
            }
            var photo_count =c ;
            c = 0
            for (x of arr) {
                if (science.includes(x)) {
                    c += 1
                }
            }
            var science_count = c;
            c = 0
            for (x of arr) {
                if (science.includes(x)) {
                    c += 1
                }
            }
            var science_count = c;
            c = 0
            for (x of arr) {
                if (health.includes(x)) {
                    c += 1
                }
            }
            var health_count = c;
            c = 0
            for (x of arr) {
                if (music.includes(x)) {
                    c += 1
                }
            }
            var music_count = c;
            c = 0
            for (x of arr) {
                if (movies.includes(x)) {
                    c += 1
                }
            }
            var movies_count = c;
            c = 0
            for (x of arr) {
                if (design.includes(x)) {
                    c += 1
                }
            }
            var design_count = c;
            c = 0
            for (x of arr) {
                if (lit.includes(x)) {
                    c += 1
                }
            }
            var lit_count = c;

            console.log( cook_count, photo_count, science_count )

            if( cook_count > photo_count && cook_count > science_count && cook_count > health_count && cook_count >music_count && cook_count >movies_count && cook_count > design_count && cook_count > lit_count ){
                console.log("Cook")
                this.setState({
                    questioncat : "Cooking"
                })
            }
            else if( photo_count > cook_count && photo_count > science_count && photo_count > health_count && photo_count >music_count && photo_count >movies_count && photo_count > design_count && photo_count > lit_count ){
                console.log("Photo")
                this.setState({
                    questioncat : "Photography"
                })
            }
            else if( science_count > cook_count && science_count > photo_count && science_count > health_count && science_count >music_count && science_count >movies_count && science_count > design_count && science_count > lit_count ){
                console.log("Science")
                this.setState({
                    questioncat : "Science"
                })
            }
            else if( health_count > cook_count && health_count > photo_count && health_count > science_count && health_count >music_count && health_count >movies_count && health_count > design_count && health_count > lit_count ){
                console.log("Health")
                this.setState({
                    questioncat : "Health"
                })
            }
            else if( music_count > cook_count && music_count > photo_count && music_count > science_count && music_count >health_count && music_count >movies_count && music_count > design_count && music_count > lit_count ){
                console.log("Music")
                this.setState({
                    questioncat : "Music"
                })
            }
            else if( movies_count > cook_count && movies_count > photo_count && movies_count > health_count && movies_count >music_count && movies_count > science_count && movies_count > design_count && movies_count > lit_count ){
                console.log("Movies")
                this.setState({
                    questioncat : "Movies"
                })
            }
            else if( design_count > cook_count && design_count > photo_count && design_count > health_count && design_count >music_count && design_count >movies_count && design_count > science_count && design_count > lit_count ){
                console.log("Design")
                this.setState({
                    questioncat : "Design"
                })
            }
            else if( lit_count > cook_count && lit_count > design_count  && lit_count > health_count && lit_count >music_count && lit_count >movies_count && lit_count > design_count && lit_count > science_count ){
                console.log("Lit")
                this.setState({
                    questioncat : "Literatue"
                })
            }
            else{
                this.setState({
                    questioncat : "Others"
                })
            }
        }

        if (event.target.name === "image") {

            this.setState({ image: event.target.files[0] })

            var error = this.state.error
            var fileName = event.target.value;
            var idxDot = fileName.lastIndexOf(".") + 1;
            var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
            if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
                error.image = false
                this.setState({
                    error
                })
                const file = event.target.files[0];
                getBase64(file).then(base64 => {
                    var z = base64;
                    console.debug("file stored", z);
                    this.setState({
                        img: z
                    })
                })

            } else {
                error.image = true
                this.setState({
                    error
                })
            }
        }

    }


    render() {
        console.log(this.state.trans)
        return (
            <div className="Container-fluid">
                <div className="Container-fluid ">
                    {this.state.show !== "false" ? <div className="askquestion">
                                        <div className="col-11 uname"> <img className="post-img" src={this.props.auth.Profilepic !== '' ? this.props.auth.Profilepic : user} width="18px" height="18px" />  {this.props.auth.Name} </div>
                                        <div className="post">
                                            <div className="col-11 ques" data-keyboard='false' data-backdrop='static' data-toggle="modal" data-target="#exampleModal" >What is your Question or Link ? </div>
                                        </div>
                                        </div>
                        :                                 <span class="nav-item add">
                        <button data-keyboard='false' data-backdrop='static' data-toggle="modal" data-target="#exampleModal" className="addbtn">Add Question</button>
                    </span>
                    }

                </div>

                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <a className="nav-ind-tab" data-toggle="tab" href="#home">Ask Question</a>
                                    </li>
                                    <li class="nav-item">
                                        <a className="nav-ind-tab" data-toggle="tab" href="#menu1">Share post</a>
                                    </li>
                                </ul>
                                <div data-dismiss="modal" className="modal-md"><span className="close-modal" aria-hidden="true">x</span></div>
                            </div>
                            <div className="modal-body tab-content">
                                <div id="home" class="container tab-pane active">
                                    <div className="tips">
                                        Tips on getting good answers quickly
                                        <ul>
                                            <li> <span class="ui_icon ui_icon_color--blue ui_icon_size--small ui_icon_outline--default" aria-hidden="true"><svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                    <path class="icon_svg-stroke" d="M12,3 C16.971,3 21,7.029 21,12 C21,16.971 16.971,21 12,21 C7.029,21 3,16.971 3,12 C3,7.029 7.029,3 12,3 Z M8,12.6290909 L10.9090909,15.5381818 L16,9" stroke="#70b1fc" stroke-width="1.5"></path>
                                                </g>
                                            </svg></span> Make sure your question hasn't been asked already</li>
                                            <li> <span class="ui_icon ui_icon_color--blue ui_icon_size--small ui_icon_outline--default" aria-hidden="true"><svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                    <path class="icon_svg-stroke" d="M12,3 C16.971,3 21,7.029 21,12 C21,16.971 16.971,21 12,21 C7.029,21 3,16.971 3,12 C3,7.029 7.029,3 12,3 Z M8,12.6290909 L10.9090909,15.5381818 L16,9" stroke="#70b1fc" stroke-width="1.5"></path>
                                                </g>
                                            </svg></span> Keep your question short and to the point</li>
                                            <li> <span class="ui_icon ui_icon_color--blue ui_icon_size--small ui_icon_outline--default" aria-hidden="true"><svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                    <path class="icon_svg-stroke" d="M12,3 C16.971,3 21,7.029 21,12 C21,16.971 16.971,21 12,21 C7.029,21 3,16.971 3,12 C3,7.029 7.029,3 12,3 Z M8,12.6290909 L10.9090909,15.5381818 L16,9" stroke="#70b1fc" stroke-width="1.5"></path>
                                                </g>
                                            </svg></span> Double-check grammar and spelling</li>
                                        </ul>
                                    </div>
                                    <div className="uname"> <img className="post-img" src={user} width="40px" height="40px" />  {this.props.auth.Name} asked  </div>
                                    <form onSubmit={this.askquestion}>
                                        <input type="text" name="question" onChange={this.formhandle} value={this.state.question} className="question" placeholder="Start your questions from 'What','How','Why' etc., " />
                                        
                                        <div className="mic">
                                            <span onClick={this.start}><img src={mic} height="25px" width="25px" /></span>
                                        </div>
                                        <p className="questioncat">Category : {this.state.questioncat}</p>
                                        {this.state.error.question === true ? <p className="error1">Question should not be empty and should not exceed 45 characters</p> : ''}
                                        <hr />
                                        <div><input className="question2" name="link" onChange={this.formhandle} value={this.state.link} placeholder="Optional : you can also add respective link here" /></div>
                                        {this.state.error.link === true ? <p className="error1">Link should not exceed 45 characters</p> : ''}
                                        <div className="modal-footer">

                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="submit" class="btn btn-primary">Ask Question</button>
                                        </div>
                                    </form>
                                </div>
                                <div id="menu1" class="container tab-pane fade">
                                    <form onSubmit={this.submit}>
                                        <div>
                                            <p>Post shared by {this.props.auth.Name}</p>
                                            <label>Post Title</label>
                                            <input type="text" name="title" value={this.state.title} onChange={this.formhandle} placeholder="Title" className="form-control" />
                                            {this.state.error.title === true ? <p className="error">Title should not be left out empty</p> : ''}
                                            <label>Upload image (516 x 400 is recommended)</label>
                                            <input name="image" accept="image/x-png,image/gif,image/jpeg" onChange={this.formhandle} className="form-control-file" type="file" /><br />
                                            {this.state.img !== "" ? <img src={this.state.img} className="post" alt="selected image" /> : ''}
                                            {this.state.error.image === true ? <p className="error">Select only image files</p> : ''}
                                            <label>Post Description</label>
                                            <textarea name="description" value={this.state.description} onChange={this.formhandle} className="form-control"></textarea>
                                            {this.state.error.description === true ? <p className="error">Description should not be left out empty</p> : ''}
                                            <label>Post Category</label>
                                            <select name="category" value={this.state.category} onChange={this.formhandle} className="form-control">
                                                <option name="title" value="" className="form-control">--choose--</option>
                                                <option name="title" value="Photography" className="form-control">Photography</option>
                                                <option name="title" value="Science" className="form-control">Science</option>
                                                <option name="title" value="Literature" className="form-control">Literature</option>
                                                <option name="title" value="Health" className="form-control">Health</option>
                                                <option name="title" value="Cooking" className="form-control">Cooking</option>
                                                <option name="title" value="Music" className="form-control">Music</option>
                                                <option name="title" value="Sports" className="form-control">Sports</option>
                                                <option name="title" value="Movies" className="form-control">Movies</option>
                                            </select>
                                            {this.state.error.category === true ? <p className="error">Category should not be left out empty</p> : ''}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="submit" class="btn btn-primary">Share</button>
                                        </div>
                                    </form>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

Post.propTypes = propTypes

const options = {
    autoStart: false
}

const mapStateToProps = (state) => ({
    auth: state.payload
})
export default connect(mapStateToProps)(SpeechRecognition(options)(Post))