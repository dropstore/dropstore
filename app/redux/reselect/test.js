import { createSelector } from 'reselect';

const getVendors = createSelector(
  state => state.test.vendors,
  value => value,
);

export { getVendors };
