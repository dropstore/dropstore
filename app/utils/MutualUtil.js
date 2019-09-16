import { DeviceEventEmitter } from 'react-native';

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
export const showToastLoading = (options = { duration: 5000, text: '加载中' }) => {
  triggerEvent('toastLoading', options);
};
export const hideToastLoading = () => {
  triggerEvent('toastLoading');
};

// Toast提示
export const showToast = (text: String) => {
  text && triggerEvent('toast', text);
};
