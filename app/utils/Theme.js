/*
 * @Author: Lsfern
 * @Date: 2019-08-12 11:04:53
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 11:23:13
 * @Description: 主题设置
 */

import {
    Theme
} from 'teaset';
import CommonColor from '../res/color/CommonColor';
const setTeasetTheme = () => {
    Theme.set({
        // Toast
        toastColor: 'rgb(88, 88, 88)',
        toastTextColor: CommonColor.WHITE_COLOR,
        toastFontSize: 15,

        // NavigationBar
        navColor:'#fff',
        navSeparatorColor:'#fff',
        btnColor: '#fff',
        btnPrimaryColor: '#fff',
    })
};

export default{
    setTeasetTheme
}
