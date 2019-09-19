import { handleActions } from 'redux-actions';
import { receiveSimpleData, requestSimpleData } from '../actions/simpleData';

export default handleActions({
  [requestSimpleData]: (state, action) => ({
    ...state,
    [action.payload]: {
      ...state[action.payload],
      isFetching: true,
    },
  }),
  [receiveSimpleData]: (state, action) => ({
    ...state,
    [action.meta.type]: {
      isFetching: false,
      data: action.payload,
    },
  }),
}, {});
