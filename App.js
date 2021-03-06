import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { View, StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { Router, store } from './app/router/Router';
import { wxPayModule, wxAppId } from './app/native/module';
import { ShareCom, Modalbox, Global } from './app/components';

/**
 * Js程序异常处理
 * @param {Object} error - 错误信息
 * @param {boolean} isFatal - 是否一定是致命错误：程序崩溃
 */
const jsErrorHandler = (error, isFatal) => {
  if (isFatal) {
    // TODO 记录错误日志到本地文件中，
    // 每次启动创建session成功后判断本地是否有错误日志，上传到服务器，上传成功后删除这个错误日志
  } else {
    // TODO 建议和致命错误一样上传到服务器
  }
};

export default class App extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    }
    // global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
    wxPayModule.registerApp(wxAppId); // 向微信注册
    if (!__DEV__) {
      // 全局控制log语句
      global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
      };
      // 全局控制异常
      global.ErrorUtils.setGlobalHandler(jsErrorHandler);
    }

    /**
     * 开启网络监听
     * 防止iOS有时无法正常获取网络状态
     * @type {NetInfoSubscription}
     */
    this.unsubscribe = NetInfo.addEventListener((state) => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <Router />
          {/* <ShareCom /> */}
          <Modalbox />
          <Global />
        </View>
      </Provider>
    );
  }
}
