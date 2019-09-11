import { handleActions } from 'redux-actions';
import {
  receiveOrderStateList, resetOrderStateList, requestOrderStateList, removeOrderStateListItem,
} from '../actions/orderState';

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
    [action.meta.type]: {
      totalPages: action.payload.number,
      list: [...(state[action.meta.type].list || []), ...action.payload.order],
      currentPage: action.payload.currentPage,
    },
  }),
  [resetOrderStateList]: (state, action) => ({
    ...state,
    [action.payload]: {
      ...state[action.payload],
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
