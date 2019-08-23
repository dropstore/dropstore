/**
 * @file Teaset主题设置
 * @date 2019/8/17 10:50
 * @author ZWW
 */

import {Theme} from 'teaset';
import Colors from './Colors';
import {NAV_HEIGHT} from '../common/Constant'
const setTeasetTheme = () => {
  Theme.set({
    //NavigationBar
    navType: 'ios', //'auto', 'ios', 'android'
    navStatusBarStyle: 'light-content', //'default', 'light-content'
    navBarContentHeight: NAV_HEIGHT,
    navColor: Colors.WHITE_COLOR,
    navTintColor: '#fff',
    navTitleColor: '#fff',
    navTitleFontSize: 18,
    navButtonFontSize: 15,
    navSeparatorColor: Colors.WHITE_COLOR,
    navSeparatorLineWidth: 0,
    btnColor: Colors.WHITE_COLOR,
    btnPrimaryColor: Colors.WHITE_COLOR,

    // Toast
    toastColor: 'rgb(88, 88, 88)',
    toastPaddingLeft: 12,
    toastPaddingRight: 12,
    toastPaddingTop: 8,
    toastPaddingBottom: 8,
    toastBorderRadius: 4,
    toastIconTintColor: '#ddd',
    toastIconWidth: 40,
    toastIconHeight: 40,
    toastIconPaddingTop: 8,
    toastIconPaddingBottom: 8,
    toastTextColor: Colors.WHITE_COLOR,
    toastFontSize: 15,
    toastScreenPaddingLeft: 40,
    toastScreenPaddingRight: 40,
    toastScreenPaddingTop: 100,
    toastScreenPaddingBottom: 80,


    // ModalIndicator
    miIndicatorColor: '#fff',
    miTextColor: '#fff',
    miFontSize: 15,
    miTextPaddingTop: 12,
    miScreenPaddingLeft: 40,
    miScreenPaddingRight: 40,
    miScreenPaddingTop: 100,
    miScreenPaddingBottom: 80,
    //Overlay
    overlayOpacity: 0.5,
    overlayRootScale: 0.93,

  });
};

export default {
  setTeasetTheme,
};
