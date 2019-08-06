import authreducer from './Auth'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    authentication : authreducer
})

export default authreducer