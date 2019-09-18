import { handleActions } from 'redux-actions';
import { receiveMoneyStream, requestMoneyStream, resetMoneyStream } from '../actions/moneyStream';

const initialState = {
  totalPages: -1,
  currentPage: 1,
  list: [],
  isFetching: false,
};

export default handleActions({
  [requestMoneyStream]: state => ({
    ...state,
    isFetching: true,
  }),
  [receiveMoneyStream]: (state, action) => ({
    ...state,
    list: action.payload.currentPage === 1 ? action.payload.list : [...(state.list || []), ...action.payload.list],
    isFetching: false,
    totalPages: action.payload.number,
    currentPage: action.payload.currentPage,
  }),
  [resetMoneyStream]: state => ({
    ...state,
    isFetching: false,
    totalPages: -1,
    currentPage: 1,
  }),
}, initialState);
