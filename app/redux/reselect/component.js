import { createSelector } from 'reselect';

const getShare = createSelector(
  state => state.component.share,
  value => value,
);
const getShareSuccess = createSelector(
  state => state.component.share.success,
  value => value,
);
const getModalbox = createSelector(
  state => state.component.modalbox,
  value => value,
);


export { getShare, getShareSuccess, getModalbox };
