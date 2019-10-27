import {
    DOC_CREATE_PENDING,
    DOC_CREATE_SUCCESS,
    DOC_CREATE_FAILURE
} from '../constants/actionTypes'

export const docReducer = (state = {}, action) => {


    switch (action.type){
        case DOC_CREATE_PENDING:
            return {
                ...state,
                pending: true
            }
        case DOC_CREATE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                pending: false
            }
        case DOC_CREATE_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.error    
            }
        
        default:
            return state
    }
    
}
