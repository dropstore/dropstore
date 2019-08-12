import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'mobx-react';
import store from './app/mobx';
import Router from './app/router/Router';
import Theme from './app/utils/Theme';

Theme.setTeasetTheme();

/**
 * Js程序异常处理
 * @param {Object} error - 错误信息
 * @param {boolean} isFatal - 是否一定是致命错误：程序崩溃
 */
const jsErrorHandler = (error, isFatal) => {
  if (isFatal) {
    //TODO 记录错误日志到本地文件中，
    // 每次启动创建session成功后判断本地是否有错误日志，上传到服务器，上传成功后删除这个错误日志
  } else {
    //TODO 建议和致命错误一样上传到服务器
  }
};

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
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
  }

  render() {
    return (
        <Provider {...store}>
            <Router/>
        </Provider>
    );
  }
}
