import { handleActions } from 'redux-actions';
import {
  closeShare, setShowShare, shareCallback, closeModalbox, openModalbox,
} from '../actions/component';

const initialState = {
  share: {
    show: false,
  },
  modalbox: {
    element: null,
    options: {},
  },
};

export default handleActions({
  [closeShare]: state => ({
    ...state,
    share: {
      show: false,
      success: false,
    },
  }),
  [setShowShare]: (state, action) => ({
    ...state,
    share: {
      ...state.share,
      success: false,
      show: true,
      text: action.payload.text,
      img: action.payload.img,
      url: action.payload.url,
      title: action.payload.title,
    },
  }),
  [shareCallback]: (state, action) => ({
    ...state,
    share: {
      ...state.share,
      success: action.payload,
    },
  }),
  [closeModalbox]: state => ({
    ...state,
    modalbox: {
      element: null,
      options: {},
    },
  }),
  [openModalbox]: (state, action) => ({
    ...state,
    modalbox: action.payload,
  }),
}, initialState);
