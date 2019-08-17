/**
 * @file Teaset主题设置
 * @date 2019/8/17 10:50
 * @author ZWW
 */

import { Theme } from 'teaset';
import Colors from '../res/Colors';

const setTeasetTheme = () => {
  Theme.set({
    // Toast
    toastColor: 'rgb(88, 88, 88)',
    toastTextColor: Colors.WHITE_COLOR,
    toastFontSize: 15,

    // NavigationBar
    navColor: Colors.WHITE_COLOR,
    navSeparatorColor: Colors.WHITE_COLOR,
    btnColor: Colors.WHITE_COLOR,
    btnPrimaryColor: Colors.WHITE_COLOR,
  });
};

export default {
  setTeasetTheme,
};
