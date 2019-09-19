import { createSelector } from 'reselect';

const getList = createSelector(
  (state, type) => state.list[type] || {},
  value => value,
);

export { getList };
