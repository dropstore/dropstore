import { handleActions } from 'redux-actions';
import { closeShare, showShare, shareCallback } from '../actions/component';

const initialState = {
  share: {
    show: false,
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
  [showShare]: (state, action) => ({
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
}, initialState);
