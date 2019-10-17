import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Modal from '../page/MyGoods/Modal';
import store from '../redux/configureStore';
import { request } from '../http/Axios';

function triggerEvent(type, params, isShow) {
  DeviceEventEmitter.emit('dropstoreGlobal', {
    dropstoreEventType: type,
    params,
    isShow,
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
  triggerEvent('share', params, true);
  addCallbackListener('share', resolve, reject);
});

/**
 * 弹窗react-native-modalbox
 * @param {element} element - react-native Dom元素/组件
 * @param {Object} options - react-native-modalbox的props
 */
export const showModalbox = ({ element, options }) => {
  triggerEvent('modalbox', { element, options }, true);
};
export const closeModalbox = (immediately) => {
  triggerEvent('modalbox', immediately);
};

// Toast加载框
export const showToastLoading = (options = { duration: 5000, text: '加载中' }) => {
  triggerEvent('toastLoading', options, true);
};
export const hideToastLoading = (immediately) => {
  triggerEvent('toastLoading', immediately);
};

// Toast提示
export const showToast = (text: String) => {
  text && triggerEvent('toast', text, true);
};

export const MyGoodsItemOnPress = (type, route, navigation, item, refresh) => {
  if (['express', 'edit', 'cancel'].includes(type)) {
    showModalbox({
      element: (<Modal
        route={route}
        navigation={navigation}
        closeModalbox={closeModalbox}
        type={type}
        item={item}
        successCallback={(value, type) => new Promise((resolve) => {
          if (type === 'express') {
            request('/order/do_add_express', { params: { to_express_id: value, order_id: item.order_id } }).then(() => {
              refresh();
              resolve();
            });
          } else if (type === 'edit') {
            request('/free/edit_price', { params: { price: value, id: item.free_id } }).then((res) => {
              const { order_id } = res.data;
              navigation.navigate('PayDetail', {
                title: '支付服务费',
                api: {
                  type: 'freeTradeToRelease',
                  params: { order_id: this.item.order_id, price: value },
                },
                type: 5,
                payType: 'service',
                goodsInfo: {
                  ...item,
                  price: value,
                  order_id,
                },
              });
              resolve();
            });
          } else if (type === 'cancel') {
            request('/free/off_shelf', { params: { id: item.free_id } }).then(() => {
              refresh();
              resolve();
            });
          }
        })}
      />),
      options: {
        style: {
          height: 287,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    });
  } else if (['pickUp', 'sendBack'].includes(type)) {
    navigation.navigate('PickUp', {
      title: '支付运费',
      item,
    });
  } else if (type === 'pay') {
    navigation.navigate('pay', {
      title: '选择支付账户',
      type: '1',
      payType: 'buyGoods',
      payData: {
        order_id: item.order_id,
        price: item.order_price,
        management: item.order_type === '1' ? store.getState().simpleData?.appOptions?.data?.management : null,
      },
      shopInfo: {
        goods: item.goods,
        order_id: item.order_id,
      },
      noTimer: true,
      noShareBtn: true,
    });
  } else if (type === 'publish') {
    navigation.navigate('PutOnSale', {
      title: '发布商品',
      item,
    });
  }
};
