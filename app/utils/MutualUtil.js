/**
 * @file 交互 - 除去rn自带Alert，其余全部样式均可自定义
 * @date 2019/8/17 15:56
 * @author ZWW
 */
import React from 'react';
import { Text, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import { Toast } from 'teaset';
import { TOAST_DURATION, TOAST_POSITON } from '../common/Constant';
import Colors from '../res/Colors';

let customKey = null;

function triggerEvent(type, params) {
  DeviceEventEmitter.emit('dropstoreGlobal', {
    dropstoreEventType: type,
    params,
  });
}

function addCallbackListener(type, resolve, reject) {
  const listener = DeviceEventEmitter.addListener('dropstoreCallback', (e) => {
    if (e.dropstoreEventType === type) {
      listener.remove();
      if (e.type === 'success') {
        resolve(e.data);
      } else {
        reject(e.data);
      }
    }
  });
}

// 分享弹窗
export const showShare = (params: { text: String, img:String, url: String, title: String }) => new Promise((resolve, reject) => {
  triggerEvent('share', params);
  addCallbackListener('share', resolve, reject);
});

/**
 * 弹窗react-native-modalbox
 * @param {element} element - react-native Dom元素/组件
 * @param {Object} options - react-native-modalbox的props
 */
export const showModalbox = ({ element, options }) => {
  triggerEvent('modalbox', { element, options });
};
export const closeModalbox = () => {
  triggerEvent('modalbox');
};

// Toast加载框
// export const showToastLoading = (options = { duration: 5000, text: '加载中' }) => {
//   triggerEvent('showToastLoading', options);
// };
// setTimeout(() => {
//   showToastLoading();
// }, 2000);
/**
 * 吐司
 * @param {String} message
 */
export const showToast = (message) => {
  Toast.message(message, TOAST_DURATION, TOAST_POSITON);
};

/**
 * 土司加载框
 * @param {String} text
 * @param {Number} duration 自动关闭时长
 */
export const showToastLoading = ({ text = '加载中...', duration = 10000 } = {}) => {
  if (customKey) return;
  customKey = Toast.show({
    text: textView(text),
    icon: <ActivityIndicator size="large" />,
    position: 'center',
    duration,
  });
};

/**
 * 关闭土司加载框
 */
export const hideToastLoading = () => {
  if (!customKey) return;
  Toast.hide(customKey);
  customKey = null;
};

const textView = text => (
  <Text style={{ fontSize: 15, color: Colors.WHITE_COLOR }}>{text}</Text>
);
