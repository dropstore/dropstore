import { createSelector } from 'reselect';

const getShare = createSelector(
  state => state.component.share,
  value => value,
);

export { getShare };
