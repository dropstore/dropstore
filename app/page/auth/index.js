import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

export default class AuthLoading extends PureComponent {
  componentDidMount() {
    const { navigation } = this.props;
    AsyncStorage.getItem('token').then((res) => {
      if (res) {
        navigation.navigate('Main');
        SplashScreen.hide();
      } else {
        SplashScreen.hide();
      }
    }).catch(() => {
      navigation.navigate('Main');
      SplashScreen.hide();
    });
  }

  render() {
    return <Text>首页</Text>;
  }
}
