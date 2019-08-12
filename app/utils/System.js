/*
 * @Author: Lsfern
 * @Date: 2019-08-10 21:48:21
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 10:44:11
 * @Description: System
 */
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
    SCREEN_WIDTH: width,
    SCREEN_HEIGHT: height,
    iOS: Platform.OS === 'ios',
    Android: Platform.OS === 'android'
};
