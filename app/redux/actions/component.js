import { createAction } from 'redux-actions';

const closeShare = createAction('CLOSE_SHARE');
const setShowShare = createAction('SHOW_SHARE');
const shareCallback = createAction('SHARE_CALLBACK');
const closeModalbox = createAction('CLOSE_MODALBOX');
const openModalbox = createAction('OPEN_MODALBOX');

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

function showModalbox(element, options) {
  return (dispatch, getState) => {
    if (getState().component.modalbox.element) {
      dispatch(closeModalbox());
      setTimeout(() => {
        dispatch(openModalbox(element, options));
      });
    } else {
      dispatch(openModalbox(element, options));
    }
  };
}

export {
  closeShare, showShare, shareCallback, setShowShare, closeModalbox, openModalbox, showModalbox,
};
