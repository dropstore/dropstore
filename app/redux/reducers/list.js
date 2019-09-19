import { handleActions } from 'redux-actions';
import { receiveList, requestList, resetList } from '../actions/list';

export default handleActions({
  [requestList]: (state, action) => ({
    ...state,
    [action.payload]: {
      ...state[action.payload],
      isFetching: true,
    },
  }),
  [receiveList]: (state, action) => ({
    ...state,
    [action.meta.type]: {
      list: action.payload.currentPage === 1 ? action.payload.list : [...(state[action.meta.type].list || []), ...action.payload.list],
      isFetching: false,
      totalPages: action.payload.number,
      currentPage: action.payload.currentPage,
    },
  }),
  [resetList]: (state, action) => ({
    ...state,
    [action.payload]: {
      ...state[action.payload],
      isFetching: false,
      totalPages: -1,
      currentPage: 1,
    },
  }),
}, {});
