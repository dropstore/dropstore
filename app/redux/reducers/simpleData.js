import { handleActions } from 'redux-actions';
import { receiveSimpleData, requestSimpleData, resetAllSimpleData } from '../actions/simpleData';

export default handleActions({
  [requestSimpleData]: (state, action) => ({
    ...state,
    [action.payload]: {
      isFetching: true,
    },
  }),
  [receiveSimpleData]: (state, action) => ({
    ...state,
    [action.meta.type]: {
      isFetching: false,
      data: action.payload.data,
      fetchedParams: action.payload.fetchedParams,
    },
  }),
  [resetAllSimpleData]: () => ({}),
}, {});
