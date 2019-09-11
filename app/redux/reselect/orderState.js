import { createSelector } from 'reselect';

const getOrderStateList = createSelector(
  (state, type) => state.orderState[type],
  value => value,
);

export { getOrderStateList };
