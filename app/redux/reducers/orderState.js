import { handleActions } from 'redux-actions';
import {
  receiveOrderStateList, resetOrderStateList, requestOrderStateList, removeOrderStateListItem,
} from '../actions/component';

const initialState = {

};

export default handleActions({
  [requestOrderStateList]: (state, action) => ({
    ...state,
    [action.payload]: {
      ...state[action.payload],
      isFetching: true,
    },
  }),
  [receiveOrderStateList]: (state, action) => ({
    ...state,
    [action.meta.type]: action.payload,
  }),
  [resetOrderStateList]: (state, action) => ({
    ...state,
    [action.payload]: {
      list: [],
      isFetching: false,
      totalPages: -1,
      currentPage: 1,
    },
  }),
  [removeOrderStateListItem]: (state, action) => ({
    ...state,
    [action.meta.type]: {
      ...state[action.payload],
      list: state[action.payload].list.filter(v => v.id === action.payload),
    },
  }),
}, initialState);
