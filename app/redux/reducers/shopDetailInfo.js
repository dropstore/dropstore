import {handleActions} from 'redux-actions';
import {
  requestShopDetailInfo,
  receiveShopDetailInfo,
  notReceiveShopDetailInfo,
  receiveShoesList,
} from '../actions/shopDetailInfo';

const initShopInfo = {
  shopData: {
    isFetching: false,
    isSuccess: false,
    data: {},
  },
  shoesData: {
    shoesList: [],
  },
};
const actions = {};
actions[requestShopDetailInfo] = (state) => {
  return {
    ...state,
    shopData: {...state.shopData, isFetching: true}
  }
};
actions[receiveShopDetailInfo] = (state, action) => {
  return {
    ...state,
    shopData: {
      isFetching: false,
      isSuccess: true,
      data: action.payload
    }
  }
};
actions[notReceiveShopDetailInfo] = (state) => {
  return {
    ...state,
    shopData: {
      isFetching: false,
      isSuccess: false,
      data: {},
    }
  }
};
actions[receiveShoesList] = (state, actions) => {
  return {
    ...state,
    shoesData: {
      shoesList: actions.payload
    },
  }
};

const reducer = handleActions(
  actions, initShopInfo
);
export default reducer
