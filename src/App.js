import React, { Component } from 'react'
import './App.css';
import Approuter from './routers/Approuter';
import { login } from '../src/actions';
import {connect} from 'react-redux'
import jwt_decode from 'jwt-decode'

class App extends Component {

  render() {

    var data = localStorage.getItem("webtoken")
    if(data != null){
      var jwt = data
      if (jwt !== null) {
          var decoded = jwt_decode(jwt)
          var payload = {
              Jwt : jwt,
              Name : decoded.Name,
              Id : decoded.Userid,
              Email : decoded.Email,
              Category : decoded.Category,
              Profilepic : decoded.Profile
          }
          this.props.dispatch(login(payload))
      }
    }

    return (
      <div className="App">
        <Approuter />
      </div>
    );
  }
}


const mapStateToProps=(state)=>({
  auth:state.payload
})
export default connect(mapStateToProps)(App)
