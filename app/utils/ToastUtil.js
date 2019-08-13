/*
 * @Author: Lsfern
 * @Date: 2019-08-12 10:37:31
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 15:04:20
 * @Description: 土司及弹框工具类
 */

import { Alert } from 'react-native';
import { Toast } from 'teaset';
import Constant from '../common/Constant';

/**
 * 吐司
 * @param {String} message 提示
 */
export const showToast = (message) => {
  Toast.message(message, Constant.TOAST_DURATION, Constant.TOAST_POSITON);
};

/**
 * 提示框
 * @param {String} title 标题
 * @param {String} content 内容
 * @param {String} cancelText
 * @param {String} confirmText
 * @param cancelCallBack
 * @param confirmCallBack
 */
export const showModal = (title, content, cancelText, confirmText, cancelCallBack, confirmCallBack) => {
  Alert.alert(
    title || '',
    content,
    [
      cancelText ? {
        text: cancelText,
        onPress: () => cancelCallBack(),
      } : '',
      {
        text: confirmText,
        onPress: () => confirmCallBack(),
      },
    ], {
      cancelable: false,
    },
  );
};
