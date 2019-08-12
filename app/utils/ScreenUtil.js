/*
 * @Author: Lsfern
 * @Date: 2019-08-10 21:48:21
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 11:22:05
 * @Description: 屏幕适配
 */

import React from 'react';
import {
  Dimensions,
  Platform,
  PixelRatio
} from 'react-native';
const {
  width,
  height
} = Dimensions.get('window');

//设计图宽度
const basePx = Platform.OS === 'ios' ? 750 : 720;

/**
 * 界面适配
 * @param {Number} px 设计图尺寸 
 * @return {Number} 适配后的尺寸
 */
export const px2Dp = function px2dp(px) {
  const layoutSize = (px / basePx) * width;
  return PixelRatio.roundToNearestPixel(layoutSize);
};
