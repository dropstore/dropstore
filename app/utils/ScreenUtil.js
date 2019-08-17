/**
 * @file 屏幕适配
 * @date 2019/8/17 10:56
 * @author ZWW
 */
import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');

// 设计图宽度
// const basePx = Platform.OS === 'ios' ? 750 : 720;
const basePx = 750;

/**
 * 界面适配
 * @param {Number} px 设计图尺寸
 * @return {Number} 适配后的尺寸
 */
export const px2Dp = function px2dp(px) {
  const layoutSize = (px / basePx) * width;
  return PixelRatio.roundToNearestPixel(layoutSize);
};
