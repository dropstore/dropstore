import { createAction } from 'redux-actions';

const closeShare = createAction('CLOSE_SHARE');
const setShowShare = createAction('SHOW_SHARE');
const shareCallback = createAction('SHARE_CALLBACK');
const closeModalbox = createAction('CLOSE_MODALBOX');
const openModalbox = createAction('OPEN_MODALBOX');

function showShare(params) {
  return (dispatch) => {
    dispatch(closeShare());
    dispatch(setShowShare(params));
  };
}

function showModalbox(element, options) {
  return (dispatch) => {
    dispatch(closeModalbox());
    dispatch(openModalbox(element, options));
  };
}

export {
  closeShare, showShare, shareCallback, setShowShare, closeModalbox, openModalbox, showModalbox,
};
