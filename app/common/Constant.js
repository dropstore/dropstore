/**
 * @file 常用常量类
 * @date 2019/8/17 10:41
 * @author ZWW
 */
import { Dimensions, Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

const { width: width1, height: height1 } = Dimensions.get('window');
const { width: width2, height: height2 } = Dimensions.get('window');

const IS_IPHONE_X = isIphoneX();
const SCREEN_WIDTH = Math.max(width1, width2);
const SCREEN_HEIGHT = Math.max(height1, height2);
const TOAST_DURATION = 2000;
const TOAST_POSITON = 'center';// top center bottom
const iOS = Platform.OS === 'ios';
const Android = Platform.OS === 'android';
const NAV_HEIGHT = 44;
const STATUSBAR_HEIGHT = IS_IPHONE_X ? 40 : iOS ? 20 : 25;
const PADDING_TAB = IS_IPHONE_X ? 20 : 0;
const STATUSBAR_AND_NAV_HEIGHT = STATUSBAR_HEIGHT + NAV_HEIGHT;
const MARGIN_HORIZONTAL = 9;
const MAX_TIME = 24 * 3600;
const BOTTOM_BTN_HEIGHT = 66 + PADDING_TAB;

// 适用于小图标
const hitSlop = {
  top: 12, bottom: 12, left: 8, right: 8,
};
export {
  SCREEN_WIDTH, SCREEN_HEIGHT, iOS, Android, TOAST_DURATION, TOAST_POSITON, IS_IPHONE_X,
  NAV_HEIGHT, STATUSBAR_HEIGHT, STATUSBAR_AND_NAV_HEIGHT, PADDING_TAB, hitSlop, MARGIN_HORIZONTAL,
  MAX_TIME, BOTTOM_BTN_HEIGHT,
};
