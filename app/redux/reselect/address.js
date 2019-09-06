import { createSelector } from 'reselect';

const getAddress = createSelector(
  state => state.address.list,
  value => value,
);

export { getAddress };
