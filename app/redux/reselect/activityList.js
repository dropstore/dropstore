import { createSelector } from 'reselect';

const getActivityInfo = createSelector(
  (state, type) => state.activityList[type],
  value => value,
);

export {
  getActivityInfo,
};
