import React, { Component } from 'react';
import {
  View, StatusBar, Platform, DeviceEventEmitter,
} from 'react-native';
import { Provider } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
import fundebug from 'fundebug-reactnative';
// import SplashScreen from 'react-native-splash-screen';
import { Router, store } from './app/router/Router';
import { wxPayModule, wxAppId } from './app/native/module';
import { Global, Keyboard } from './app/components';
import { removeNetListener } from './app/http/Axios';
import { SCREEN_WIDTH, setScreenHeight } from './app/common/Constant';

const GlobalWithKeyboard = ['toastLoading', 'toast'];
const GlobalWithoutKeyboard = ['share', 'modalbox'];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { flex: 1 },
    };
  }

  componentDidMount() {
    if (!__DEV__) {
      fundebug.init({
        apikey: 'fd759507ed752cf8057174abf891536d5d71809de6c85bd05c519382e62f18bc',
        appVersion: require('./app.json').versionName,
      });
    }
    // SplashScreen.hide();
    console.disableYellowBox = true;
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    }
    // global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
    wxPayModule.registerApp(wxAppId); // 向微信注册

    this.listener = DeviceEventEmitter.addListener('dropstoreGlobal', (e) => {
      if (GlobalWithKeyboard.includes(e.dropstoreEventType)) {
        if (e.params) {
          this.keyboardCom.show(e.dropstoreEventType, e.params);
        } else {
          this.keyboardCom.hide(e.dropstoreEventType);
        }
      } else if (GlobalWithoutKeyboard.includes(e.dropstoreEventType)) {
        if (e.params) {
          this.globalCom.show(e.dropstoreEventType, e.params);
        } else {
          this.globalCom.hide(e.dropstoreEventType);
        }
      }
    });
  }

  componentWillUnmount() {
    removeNetListener();
    this.listener.remove();
  }

  onLayout = (e) => {
    if (Platform.OS === 'ios') {
      return;
    }
    setScreenHeight(e.nativeEvent.layout.height);
    this.setState({
      style: {
        width: SCREEN_WIDTH,
        height: e.nativeEvent.layout.height,
      },
    });
  }

  render() {
    const { style } = this.state;
    return (
      <Provider store={store}>
        <MenuProvider backHandler>
          <View onLayout={this.onLayout} style={style}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Router />
            <Global ref={(v) => { this.globalCom = v; }} />
            <Keyboard ref={(v) => { this.keyboardCom = v; }} />
          </View>
        </MenuProvider>
      </Provider>
    );
  }
}
