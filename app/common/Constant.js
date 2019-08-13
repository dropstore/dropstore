/*
 * @Author: Lsfern
 * @Date: 2019-08-10 22:30:32
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 11:12:43
 * @Description: 常量类
 */
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('screen');
const TOAST_DURATION = 2500;
const TOAST_POSITON = 'center';// top center bottom

module.exports = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  iOS: Platform.OS === 'ios',
  Android: Platform.OS === 'android',
  TOAST_DURATION,
  TOAST_POSITON,
};
