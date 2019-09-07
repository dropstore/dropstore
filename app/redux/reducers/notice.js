import { handleActions } from 'redux-actions';
import {
  receiveNotice, requestNotice, resetNotice,
} from '../actions/notice';

const initialState = {
  // message: {
  //   list: [],
  //   isFetching: false,
  //   totalPages: -1,
  //   currentPage: 1,
  // },
  // activity: {
  //   list: [],
  //   isFetching: false,
  //   totalPages: -1,
  //   currentPage: 1,
  // },
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
    [action.meta.type]: {
      list: [],
      isFetching: false,
      totalPages: action.payload.number,
      currentPage: action.payload.currentPage,
    },
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
