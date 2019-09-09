import { createSelector } from 'reselect';

const getActivity = createSelector(
  state => state.notice['1'],
  value => value,
);
const getMessage = createSelector(
  state => state.notice.message,
  value => value,
);

export { getActivity, getMessage };
