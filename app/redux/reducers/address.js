import { handleActions } from 'redux-actions';
import { receiveAddress } from '../actions/address';

const initialState = {
  list: [],
};

export default handleActions({
  [receiveAddress]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
}, initialState);
