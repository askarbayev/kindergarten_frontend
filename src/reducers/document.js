import {
  DOC_CREATE_PENDING,
  DOC_CREATE_SUCCESS,
  DOC_CREATE_FAILURE,
  GET_DOCCONTENT_PENDING,
  GET_DOCCONTENT_SUCCESS,
  GET_DOCCONTENT_FAILURE
} from "../constants/actionTypes";

export const docReducer = (state = {}, action) => {
  switch (action.type) {
    case DOC_CREATE_PENDING:
      return {
        ...state,
        pending: true
      };
    case DOC_CREATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false
      };
    case DOC_CREATE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      };

    case GET_DOCCONTENT_PENDING:
      return {
        ...state,
        pending: true
      };
    case GET_DOCCONTENT_SUCCESS:
      return {
        ...state,
        pending: true,
        data: action.payload.getDocContent
      };
    case GET_DOCCONTENT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      };

    default:
      return state;
  }
};
