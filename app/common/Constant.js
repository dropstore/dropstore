/*
 * @Author: Lsfern
 * @Date: 2019-08-10 22:30:32
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 11:12:43
 * @Description: 常量类
 */
import { Dimensions, Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

const IS_IPHONE_X = isIphoneX();
const { width, height } = Dimensions.get('screen');
const TOAST_DURATION = 2500;
const TOAST_POSITON = 'center';// top center bottom
const iOS = Platform.OS === 'ios';
const Android = Platform.OS === 'android';
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const NAV_HEIGHT = 44;
const STATUSBAR_HEIGHT = IS_IPHONE_X ? 34 : iOS ? 20 : 25;
const PADDING_TAB = IS_IPHONE_X ? 40 : 0;
const STATUSBAR_AND_NAV_HEIGHT = STATUSBAR_HEIGHT + NAV_HEIGHT;

export {
  SCREEN_WIDTH, SCREEN_HEIGHT, iOS, Android, TOAST_DURATION, TOAST_POSITON, IS_IPHONE_X,
  NAV_HEIGHT, STATUSBAR_HEIGHT, STATUSBAR_AND_NAV_HEIGHT, PADDING_TAB,
};
