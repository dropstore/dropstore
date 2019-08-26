import { handleActions } from 'redux-actions';
import { closeShare, showShare } from '../actions/component';

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
    },
  }),
  [showShare]: state => ({
    ...state,
    share: {
      show: true,
    },
  }),
}, initialState);
