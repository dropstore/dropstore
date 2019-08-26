import { combineReducers } from 'redux';
import test from './test';
import userInfo from './userInfo';
import shopDetailInfo from './shopDetailInfo';
import component from './component';

export default combineReducers({
  test,
  userInfo,
  shopDetailInfo,
  component,
});
