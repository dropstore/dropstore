import {createSelector} from 'reselect';

const getActivityInfo = createSelector(
  state => state.activityList,
  value => value,
);

export {
  getActivityInfo
}
