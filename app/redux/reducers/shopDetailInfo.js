import { handleActions } from 'redux-actions';
import {
  requestShopDetailInfo,
  receiveShopDetailInfo,
  notReceiveShopDetailInfo,
  receiveShoesList,
} from '../actions/shopDetailInfo';

const initShopInfo = {
  shopData: {
    isFetching: false,
    error: false,
    data: {},
  },
  shoesData: {
    shoesList: [],
  },
};
const actions = {};
actions[requestShopDetailInfo] = state => ({
  ...state,
  shopData: { ...state.shopData, isFetching: true },
});
actions[receiveShopDetailInfo] = (state, action) => ({
  ...state,
  shopData: {
    isFetching: false,
    error: false,
    data: action.payload,
  },
});
actions[notReceiveShopDetailInfo] = state => ({
  ...state,
  shopData: {
    isFetching: false,
    error: true,
    data: {},
  },
});
actions[receiveShoesList] = (state, actions) => ({
  ...state,
  shoesData: {
    shoesList: actions.payload,
  },
});

const reducer = handleActions(
  actions, initShopInfo,
);
export default reducer;
