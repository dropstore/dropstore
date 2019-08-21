
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
import shopDetail from '../page/shopDetail';
import ShopDetailHeaderRight from '../components/ShopDetailHeaderRight';

const AuthStack = createStackNavigator({
  AuthLoading,
}, {
  defaultNavigationOptions: {
    header: null,
  },
});

const InitNavigator = createStackNavigator({
  main: {
    screen: BottomNavigator,
    navigationOptions: {
      header: null,
    },
  },
  vendorDetail,
  shopDetail: {
    screen: shopDetail,
    navigationOptions: ({ navigation }) => ({
      headerRight: <ShopDetailHeaderRight navigation={navigation} />,
    }),
  },

}, {
  initialRouteName: 'main',
  defaultNavigationOptions: ({ navigation }) => ({
    ...Platform.select({
      android: {
        headerStyle: {
          backgroundColor: Colors.HEADER_COLOR,
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
          backgroundColor: Colors.HEADER_COLOR,
          height: NAV_HEIGHT,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      },
    }),
    headerTintColor: Colors.WHITE_COLOR,
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
            marginLeft: 12, marginRight: 20, height: 10, width: 6,
          }}
          source={Images.zjt}
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
  initialRouteName: 'Auth',
}));

export { Router, store };
