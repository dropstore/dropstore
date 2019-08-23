import {combineReducers} from 'redux';
import test from './test';
import userInfo from './userInfo';
import shopDetailInfo from './shopDetailInfo';

export default combineReducers({
  test,
  userInfo,
  shopDetailInfo
});
