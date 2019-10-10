import { getScreenWidth, getScreenHeight } from '../common/Constant';

export const wPx2P = function wPx2P(px) {
  return px / 375 * getScreenWidth(); // design for height 375
};

export const hPx2P = function hPx2P(px) {
  return px / 667 * getScreenHeight(); // design for height 667
};
