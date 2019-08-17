/**
 * @file 交互
 * @date 2019/8/17 10:56
 * @author ZWW
 */
import { Alert } from 'react-native';
import { Toast } from 'teaset';
import { TOAST_DURATION, TOAST_POSITON } from '../common/Constant';

/**
 * 吐司
 * @param {String} message 提示
 */
export const showToast = (message) => {
  Toast.message(message, TOAST_DURATION, TOAST_POSITON);
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
