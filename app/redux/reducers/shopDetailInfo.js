import {handleActions} from 'redux-actions';
import {requestShopDetailInfo, receiveShopDetailInfo, notReceiveShopDetailInfo} from '../actions/shopDetailInfo';

const initShopInfo = {
  shopData: {
    isStartRequest: false,
    isRequestSuccess: false,
    data: {},
  }
};

export default handleActions({
  [requestShopDetailInfo]: state => ({
    ...state,
    shopData: {...state.shopData, isStartRequest: true}
  }),
  [receiveShopDetailInfo]: (state, action) => ({
    ...state,
    shopData: {
      isStartRequest: false,
      isRequestSuccess: true,
      data: action.payload
    }
  }),
  [notReceiveShopDetailInfo]: state => ({
    ...state,
    shopData: initShopInfo.shopData
  })
}, initShopInfo)
