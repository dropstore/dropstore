/**
 * @file 屏幕适配
 * @date 2019/8/17 10:56
 * @author ZWW
 */
import { PixelRatio } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../common/Constant';

// 设计图宽度
// const basePx = Platform.OS === 'ios' ? 750 : 720;
const basePx = 750;

/**
 * 界面适配
 * @param {Number} px 设计图尺寸
 * @return {Number} 适配后的尺寸
 */
export const px2Dp = function px2dp(px) {
  const layoutSize = (px / basePx) * SCREEN_WIDTH;
  return PixelRatio.roundToNearestPixel(layoutSize);
};

export const wPx2P = function wPx2P(px) {
  return px / 375 * SCREEN_WIDTH; // design for height 375
};

export const hPx2P = function hPx2P(px) {
  return px / 667 * SCREEN_HEIGHT; // design for height 667
};
