import { handleActions } from 'redux-actions';
import { requestVendors, receiveVendors, resetVendors } from '../actions/test';

const initialState = {
  vendors: {
    currentPage: 1,
    totalPages: -1,
    isFetching: false,
    list: [],
  },
};

export default handleActions({
  [requestVendors]: state => ({
    ...state,
    vendors: { ...state.vendors, isFetching: true },
  }),
  [receiveVendors]: (state, action) => ({
    ...state,
    vendors: {
      currentPage: action.payload.current_page,
      totalPages: action.payload.total_pages,
      isFetching: false,
      list: action.payload.list,
    },
  }),
  [resetVendors]: state => ({
    ...state,
    vendors: initialState.vendors,
  }),
}, initialState);
