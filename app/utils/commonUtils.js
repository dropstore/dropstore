import {
  View, Text, TouchableOpacity, Linking, StyleSheet, Platform, ScrollView, Clipboard,
} from 'react-native';
import React from 'react';
import {
  showModalbox, closeModalbox, showShare, showToast,
} from './MutualUtil';
import Colors from '../res/Colors';
import { YaHei } from '../res/FontFamily';
import { Image } from '../components';
import store from '../redux/configureStore';
import { getScreenWidth } from '../common/Constant';

const sizes = Array(26).fill('').map((v, i) => i / 2 + 35.5);
let isChecked = false;
export const debounce = (fun, delay = 1000) => (...params) => {
  if (!fun.timer || Date.now() - fun.timer > delay) {
    fun.timer = Date.now();
    fun(...params);
  }
};

export const debounceDelay = (fun, delay = 350) => (...params) => {
  if (fun.timer) {
    clearTimeout(fun.timer);
  }
  fun.timer = setTimeout(() => {
    fun(...params);
  }, delay);
};

export const formatDate = (time, format = 'yyyy-MM-dd hh:mm:ss') => {
  if (!time) { return ''; }
  const fullTime = new Date(time * 1000);
  return format
    .replace('yyyy', fullTime.getFullYear())
    .replace('MM', `${fullTime.getMonth() + 1}`.padStart(2, 0))
    .replace('dd', `${fullTime.getDate()}`.padStart(2, 0))
    .replace('hh', `${fullTime.getHours()}`.padStart(2, 0))
    .replace('mm', `${fullTime.getMinutes()}`.padStart(2, 0))
    .replace('ss', `${fullTime.getSeconds()}`.padStart(2, 0));
};

export const formatTimeAgo = (time) => {
  const now = Date.now() / 1000;
  const diff = now - time;
  if (diff < 60) {
    return '刚刚';
  } if (diff < 3600) {
    return `${parseInt(diff / 60)}分钟前`;
  } if (diff < 3600 * 24) {
    return `${parseInt(diff / 3600)}小时前`;
  }
  return formatDate(time);
};

export const needUpdate = (appVersion, minVersion) => {
  if (isChecked) { return; }
  isChecked = true;
  const arr1 = appVersion.split('.').map(v => v * 1);
  const arr2 = minVersion.split('.').map(v => v * 1);
  let updateIsOpen = false;
  arr1.forEach((v, i) => {
    if (v < arr2[i] && !updateIsOpen) {
      updateIsOpen = true;
      showModalbox({
        element: (
          <View style={{
            backgroundColor: '#fff', height: '100%', width: '100%', borderRadius: 2, overflow: 'hidden',
          }}
          >
            <Text style={{
              fontSize: 16, fontFamily: YaHei, textAlign: 'center', marginTop: 50, lineHeight: 20,
            }}
            >
              {'版本太旧，请升级至最新版本'}
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.baidu.com')}
              style={{
                backgroundColor: Colors.YELLOW,
                alignItems: 'center',
                justifyContent: 'center',
                height: 45,
                width: '100%',
                position: 'absolute',
                bottom: 0,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>确定</Text>
            </TouchableOpacity>
          </View>
        ),
        options: {
          style: {
            height: 180,
            width: 240,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          },
          backdropPressToClose: false,
        },
      });
    }
  });
};

export const showNoPayment = (navigation) => {
  showModalbox({
    element: (
      <View style={styles.modal}>
        <Text style={styles.hint}>友情提示</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 17 }}>
          <Text style={{ fontSize: 14, fontFamily: YaHei, lineHeight: 17 }}>
            {'支付未完成，可在我的仓库'}
            <Text
              style={styles.kufang}
              onPress={() => {
                navigation.push('MyGoods', {
                  title: '我的库房',
                  type: 'warehouse',
                });
                closeModalbox();
              }}
            >
              {'未付款'}
            </Text>
            {'中继续支付'}
          </Text>
        </View>
        <TouchableOpacity
          hitSlop={{
            top: 20, left: 20, right: 20, bottom: 20,
          }}
          onPress={() => closeModalbox()}
          style={styles.cha}
        >
          <Image source={require('../res/image/close-x.png')} style={{ height: 12, width: 12 }} />
        </TouchableOpacity>
      </View>
    ),
    options: {
      style: {
        height: 185,
        width: 265,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      },
    },
  });
};

export const showChooseSize = (height, onChoosed, onClosed) => {
  showModalbox({
    element: (
      <ScrollView contentContainerStyle={styles.sizeModal}>
        {
          sizes.map(v => (
            <TouchableOpacity
              onPress={() => onChoosed(v)}
              key={v}
              style={[styles.itemWrapper, { borderRightColor: '#F2F2F2', borderBottomColor: '#F2F2F2' }]}
            >
              <Text>{v}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    ),
    options: {
      style: {
        height,
        width: getScreenWidth(),
        marginTop: 10,
        backgroundColor: '#fff',
        ...Platform.select({
          ios: {
            shadowColor: 'rgb(166, 166, 166)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.35,
            shadowRadius: 5,
          },
          android: {
            elevation: 5,
            position: 'relative',
          },
        }),
      },
      position: 'bottom',
      backdropOpacity: 0,
      onClosed,
    },
  });
};

export const shareAcyivity = (shopInfo, payType) => {
  const notPay = !payType && (shopInfo.is_join === 0 || shopInfo.user_activity.commission < 1);
  const aId = shopInfo.activity?.id;
  const uAId = shopInfo.user_activity?.id;
  const uId = shopInfo.user_activity?.user_id;
  const isDraw = shopInfo.activity.b_type === '1';
  let baseUrl = 'http://m.dropstore.cn/index.html#/panicbuyingWithFriend';
  let url = `${baseUrl}?id=${aId}&u_a_id=${uAId}&activity_id=${aId}&inviter=${uId}&pay=${notPay ? 0 : 1}`;
  let title = notPay ? `我在炒饭APP上发现了一个${isDraw ? '抽签' : '抢购'}活动，快来参与吧` : isDraw
    ? `快来炒饭APP帮我抽一支幸运签，中签可立获${shopInfo.user_activity.commission / 100}元现金`
    : `快来炒饭APP帮我助攻抢购，成功可立获${shopInfo.user_activity.commission / 100}元现金`;
  if (payType === 'buyActivityGoods') {
    baseUrl = 'http://m.dropstore.cn/index.html#/buysuccess';
    url = `${baseUrl}?id=${shopInfo.order_id}`;
    title = '快来看我在炒饭APP上抢到的潮鞋';
  }
  showShare({
    text: shopInfo.goods.goods_name,
    img: shopInfo.goods.icon,
    url,
    title,
  }).then(() => {
    // 分享成功回调
  });
};

export const getAppOptions = () => store.getState().simpleData?.appOptions?.data;

export const getUserInfo = () => store.getState().userInfo;

export const getGoodsOnSale = () => store.getState().listData?.goodsOnSale;

export const copy = (type) => {
  const text = {
    address: `收件人：${getAppOptions()?.link_name}
手机号码：${getAppOptions()?.mobile}
邮寄地址：${getAppOptions()?.address}`,
    wx: getAppOptions()?.wx,
  }[type];
  const hint = {
    address: '邮寄信息已复制',
    wx: '微信号已复制',
  }[type];
  Clipboard.setString(text);
  showToast(hint);
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 35,
    paddingBottom: 38,
  },
  kufang: {
    fontSize: 14,
    fontFamily: YaHei,
    color: '#37B6EB',
    textAlign: 'right',
  },
  cha: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  hint: {
    fontSize: 20,
    fontFamily: YaHei,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 27,
  },
  sizeModal: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  itemWrapper: {
    width: '25%',
    height: getScreenWidth() / 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
});
