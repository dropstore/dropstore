/*
 * @Author: Lsfern
 * @Date: 2019-08-11 00:20:56
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 18:34:55
 * @Description: 路由管理
 */
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import {
  Platform, StyleSheet, TouchableOpacity, Animated, Easing,
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import store from '../redux/configureStore';
import Image from '../components/Image';
import {
  NAV_HEIGHT, IS_IPHONE_X, STATUSBAR_HEIGHT, STATUSBAR_AND_NAV_HEIGHT,
} from '../common/Constant';

import AuthLoading from '../page/auth';
import HomePage from '../page/home';
import ShoeKoiFishPage from '../page/koifish/ShoeKoiFishPage';
import MessageCenterPage from '../page/message/MessageCenterPage';
import PersonalCenterPage from '../page/personal/PersonalCenterPage';
import WalletPage from '../page/wallet/WalletPage';
import vendorDetail from '../page/vendorDetail';

const hotSelest = <Feather name="activity" size={26} color="red" />;
const hotUnSelest = <Feather name="activity" size={26} />;
const pointSelect = <Feather name="thumbs-up" size={26} color="red" />;
const pointUnSelect = <Feather name="thumbs-up" size={26} />;
const mineSelect = <Feather name="user" size={26} color="red" />;
const mineUnSelect = <Feather name="user" size={26} />;

const AuthStack = createStackNavigator({
  AuthLoading,
});

const BottomNavigator = createBottomTabNavigator({
  personalCenterPage: {
    screen: PersonalCenterPage,
    navigationOptions: {
      tabBarLabel: '个人中心',
      tabBarIcon: ({ focused }) => (focused ? mineSelect : mineUnSelect),
    },
  },
  shoeKoiFishPage: {
    screen: ShoeKoiFishPage,
    navigationOptions: {
      tabBarLabel: '搜素',
      tabBarIcon: ({ focused }) => (focused ? pointSelect : pointUnSelect),
    },
  },
  homePage: {
    screen: HomePage,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({ focused }) => (focused ? hotSelest : hotUnSelest),
    },
  },
  walletPage: {
    screen: WalletPage,
    navigationOptions: {
      tabBarLabel: '钱包',
      tabBarIcon: ({ focused }) => (focused ? mineSelect : mineUnSelect),
    },
  },
  messageCenterPage: {
    screen: MessageCenterPage,
    navigationOptions: {
      tabBarLabel: '消息中心',
      tabBarIcon: ({ focused }) => (focused ? mineSelect : mineUnSelect),
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: '#f00',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#fff',
    },
  },
  // 是否可以滑动切换
  swipeEnabled: true,
  // 切换是否有动画
  animationEnabled: true,
  // 进入App的首页面
  initialRouteName: 'homePage',
  lazy: true,
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
          backgroundColor: '#FFFFFF',
          height: NAV_HEIGHT,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      },
    }),
    headerTintColor: '#333333',
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
          source={require('../res/image/ic-back-gray.png')}
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
