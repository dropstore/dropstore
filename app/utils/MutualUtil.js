/**
 * @file 交互 - 除去rn自带Alert，其余全部样式均可自定义
 * @date 2019/8/17 15:56
 * @author ZWW
 */
import React from 'react';
import { Text, Alert, ActivityIndicator } from 'react-native';
import { ModalIndicator, Toast } from 'teaset';
import { TOAST_DURATION, TOAST_POSITON } from '../common/Constant';
import Colors from '../res/Colors';

let customKey = null;

/**
 * 吐司
 * @param {String} message
 */
export const showToast = (message) => {
  Toast.message(message, TOAST_DURATION, TOAST_POSITON);
};

/**
 * 提示框
 * 可结合实际业务，修改可选参数
 * @param {String} content - 内容
 * @param rightCallBack
 * @param {String} title - 标题
 * @param {String} leftText - 左边文字
 * @param {String} rightText - 右边边文字
 * @param {Boolean} cancelable - 是否可点击外部或Android返回键关闭
 * @param leftCallBack
 */
export const showModal = (content, rightCallBack, {
  title = '提示', leftText = '取消', rightText = '确定', cancelable = false, leftCallBack = Function,
} = {}) => {
  Alert.alert(
    title,
    content,
    [
      {
        text: leftText,
        onPress: () => leftCallBack(),
      },
      {
        text: rightText,
        onPress: () => rightCallBack(),
      },
    ], {
      cancelable,
    },
  );
};

/**
 * 全屏加载框
 * @param {String} text
 * @param {Boolean} isClose - 是否关闭
 */
export const showModalLoading = ({ text = '加载中...', isClose = false } = {}) => {
  if (isClose) {
    ModalIndicator.hide();
    return;
  }
  ModalIndicator.show(text);
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
