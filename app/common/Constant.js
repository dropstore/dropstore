/**
 * @file 常用常量类
 * @date 2019/8/17 10:41
 * @author ZWW
 */
import { Dimensions, Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

const IS_IPHONE_X = isIphoneX();
const { width, height } = Dimensions.get('window');
const TOAST_DURATION = 2500;
const TOAST_POSITON = 'center';// top center bottom
const iOS = Platform.OS === 'ios';
const Android = Platform.OS === 'android';
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const NAV_HEIGHT = 44;
const STATUSBAR_HEIGHT = IS_IPHONE_X ? 40 : iOS ? 20 : 25;
const PADDING_TAB = IS_IPHONE_X ? 20 : 0;
const STATUSBAR_AND_NAV_HEIGHT = STATUSBAR_HEIGHT + NAV_HEIGHT;

// 适用于小图标
const hitSlop = {
  top: 12, bottom: 12, left: 8, right: 8,
};
export {
  SCREEN_WIDTH, SCREEN_HEIGHT, iOS, Android, TOAST_DURATION, TOAST_POSITON, IS_IPHONE_X,
  NAV_HEIGHT, STATUSBAR_HEIGHT, STATUSBAR_AND_NAV_HEIGHT, PADDING_TAB, hitSlop,
};
