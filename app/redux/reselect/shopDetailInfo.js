import {createSelector} from 'reselect';

const getShopDetailInfo = createSelector(
  state => state.shopDetailInfo,
  value => value,
);

export {
  getShopDetailInfo
}
