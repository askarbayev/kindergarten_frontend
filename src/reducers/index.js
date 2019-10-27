import {combineReducers} from 'redux'
import {docReducer} from './document'


const todoApp = combineReducers({
    document: docReducer
  })
  
export default todoApp