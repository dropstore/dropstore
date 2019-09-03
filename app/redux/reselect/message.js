import { createSelector } from 'reselect';

const getNotice = createSelector(
  state => state.message.notice,
  value => value,
);
const getMessage = createSelector(
  state => state.message.message,
  value => value,
);

export { getNotice, getMessage };
