import { handleActions } from 'redux-actions';
import {
  receiveMessage, requestMessage, resetMessage,
} from '../actions/component';

const initialState = {
  message: {
    list: [],
    isFetching: false,
    totalPages: -1,
    currentPage: 1,
  },
  notice: {
    list: [],
    isFetching: false,
    totalPages: -1,
    currentPage: 1,
  },
};

export default handleActions({
  [requestMessage]: (state, action) => ({
    ...state,
    [action.payload]: {
      ...state[action.payload],
      isFetching: true,
    },
  }),
  [receiveMessage]: (state, action) => ({
    ...state,
    [action.meta.type]: action.payload,
  }),
  [resetMessage]: (state, action) => ({
    ...state,
    [action.payload]: {
      list: [],
      isFetching: false,
      totalPages: -1,
      currentPage: 1,
    },
  }),
}, initialState);
