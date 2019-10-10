import { handleActions } from 'redux-actions';
import { receiveAddress, setChoosedAddress } from '../actions/address';

const initialState = {
  list: [],
  current: {},
  isChoosed: false,
};

export default handleActions({
  [receiveAddress]: (state, action) => ({
    ...state,
    list: action.payload,
    current: action.payload.find(v => v.is_default),
  }),
  [setChoosedAddress]: (state, action) => ({
    ...state,
    current: action.payload,
    isChoosed: true,
  }),
}, initialState);
