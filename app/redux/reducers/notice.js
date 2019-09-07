import { handleActions } from 'redux-actions';
import {
  receiveNotice, requestNotice, resetNotice,
} from '../actions/component';

const initialState = {
  message: {
    list: [],
    isFetching: false,
    totalPages: -1,
    currentPage: 1,
  },
  activity: {
    list: [],
    isFetching: false,
    totalPages: -1,
    currentPage: 1,
  },
};

export default handleActions({
  [requestNotice]: (state, action) => ({
    ...state,
    [action.payload]: {
      ...state[action.payload],
      isFetching: true,
    },
  }),
  [receiveNotice]: (state, action) => ({
    ...state,
    [action.meta.type]: action.payload,
  }),
  [resetNotice]: (state, action) => ({
    ...state,
    [action.payload]: {
      list: [],
      isFetching: false,
      totalPages: -1,
      currentPage: 1,
    },
  }),
}, initialState);
