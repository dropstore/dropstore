import { createSelector } from 'reselect';

const getMoneyStream = createSelector(
  state => state.moneyStream,
  value => value,
);

export { getMoneyStream };
