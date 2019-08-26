import {createSelector} from 'reselect';

const getActivityInfo = createSelector(
  state => state.activityList.activityData,
  value => value,
);

export {
  getActivityInfo
}
