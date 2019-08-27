import { createAction } from 'redux-actions';

const closeShare = createAction('CLOSE_SHARE');
const showShare = createAction('SHOW_SHARE');
const shareCallback = createAction('SHARE_CALLBACK');

export { closeShare, showShare, shareCallback };
