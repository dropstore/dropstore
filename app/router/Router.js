
import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import {
  Platform, StyleSheet, TouchableOpacity, Animated, Easing,
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import store from '../redux/configureStore';
import Image from '../components/Image';
import Images from '../res/Images';
import Colors from '../res/Colors';
import {
  NAV_HEIGHT, IS_IPHONE_X, STATUSBAR_HEIGHT, STATUSBAR_AND_NAV_HEIGHT,
} from '../common/Constant';
import BottomNavigator from './BottomNavigator';

import AuthLoading from '../page/auth';
import vendorDetail from '../page/vendorDetail';

const AuthStack = createStackNavigator({
  AuthLoading,
});

const InitNavigator = createStackNavigator({
  main: {
    screen: BottomNavigator,
    navigationOptions: {
      header: null,
    },
  },
  vendorDetail,
}, {
  initialRouteName: 'main',
  defaultNavigationOptions: ({ navigation }) => ({
    ...Platform.select({
      android: {
        headerStyle: {
          elevation: StyleSheet.hairlineWidth,
          height: STATUSBAR_AND_NAV_HEIGHT,
          borderBottomColor: 'rgb(210, 210, 210)',
          paddingTop: STATUSBAR_HEIGHT,
        },
        headerTitleContainerStyle: {
          left: 56,
          right: 56,
        },
      },
      ios: {
        headerStyle: {
          marginTop: IS_IPHONE_X ? -10 : 0,
          backgroundColor: Colors.WHITE_COLOR,
          height: NAV_HEIGHT,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      },
    }),
    headerTintColor: Colors.NORMAL_TEXT_3,
    headerTitleStyle: {
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
    },
    headerBackTitle: null,
    headerLeft: (
      <TouchableOpacity
        style={{ height: NAV_HEIGHT, justifyContent: 'center' }}
        onPress={() => {
        // eslint-disable-next-line no-unused-expressions
          typeof navigation.getParam('customBack') === 'function' ? navigation.getParam('customBack')() : navigation.pop();
        }}
      >
        <Image
          style={{
            marginLeft: 20, marginRight: 20, height: 21, width: 23,
          }}
          source={Images.ic_back_gray}
        />
      </TouchableOpacity>
    ),
    title: navigation.getParam('title'),
  }),
  ...Platform.select({
    android: {
      transitionConfig: () => ({
        transitionSpec: {
          duration: 500,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
        },
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
      }),
    },
  }),
});
const Router = createAppContainer(createSwitchNavigator({
  Auth: AuthStack,
  Main: InitNavigator,
}, {
  initialRouteName: 'Main',
}));

export { Router, store };
