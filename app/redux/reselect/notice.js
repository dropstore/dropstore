import { createSelector } from 'reselect';

const getActivity = createSelector(
  state => state.notice.activity,
  value => value,
);
const getMessage = createSelector(
  state => state.notice.message,
  value => value,
);

export { getActivity, getMessage };
