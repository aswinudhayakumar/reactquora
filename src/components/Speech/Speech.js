
import React, {Component } from 'react'
import PropTypes from "prop-types";
import SpeechRecognition from 'react-speech-recognition'
import { connect } from 'react-redux'
import { setspeech } from '../../actions';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class Dictaphone extends Component {

  constructor(props){
    super(props);
    this.state = {
      text : ''
    }
  }

  change = (event) => {
    var payload = {
      Speech: event
  }

  this.props.dispatch(setspeech(payload))
  }

  render() {
    const {
      transcript,
      startListening,
      stopListening,
      browserSupportsSpeechRecognition
    } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <div>
        <button onClick={startListening}>Start</button>
        <button onClick={stopListening}>Stop</button>
        <span>
          <input value={transcript} onChange={this.change(transcript)} />
        </span>
      </div>
    )
  }
}

Dictaphone.propTypes = propTypes

const options = {
  autoStart: false
}
const mapStateToProps = (state) => ({
  auth: state.payload
})
export default connect(mapStateToProps)( SpeechRecognition (options) (Dictaphone))