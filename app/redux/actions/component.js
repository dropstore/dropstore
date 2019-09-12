import { createAction } from 'redux-actions';

const closeShare = createAction('CLOSE_SHARE');
const setShowShare = createAction('SHOW_SHARE');
const shareCallback = createAction('SHARE_CALLBACK');

function showShare(params) {
  return (dispatch, getState) => {
    if (getState().component.share.show) {
      dispatch(closeShare());
      setTimeout(() => {
        dispatch(setShowShare(params));
      });
    } else {
      dispatch(setShowShare(params));
    }
  };
}

export {
  closeShare, showShare, shareCallback, setShowShare,
};
