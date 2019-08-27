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
    activity_id: '',
    data: {},
  },
  shoesData: {
    activity_id: '',
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
      isRequestSuccess: true,
      // activity_id: action.payload.activity_id,
      data: action.payload.shopDetail
    }
  }
};
actions[notReceiveShopDetailInfo] = (state) => {
  return {
    ...state,
    shopData: {
      isFetching: false,
      isSuccess: false,
      activity_id: '',
      data: {},
    }
  }
};
actions[receiveShoesList] = (state, actions) => {
  return {
    ...state,
    shoesData: {
      // activity_id: action.payload.activity_id,
      shoesList: actions.payload.shoesList
    },
  }
};

const reducer = handleActions(
  actions, initShopInfo
);
export default reducer
