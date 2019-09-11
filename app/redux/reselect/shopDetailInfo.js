import {createSelector} from 'reselect';

const getShopDetailInfo = createSelector(
  state => state.shopDetailInfo.shopData,
  value => value,
);
const getReShoesList = createSelector(
  state => state.shopDetailInfo.shoesData,
  value => value,
);
export {
  getShopDetailInfo,
  getReShoesList
}
