import { createSelector } from 'reselect';

const getListData = createSelector(
  (state, type) => state.listData[type] || {},
  value => value,
);

export { getListData };
