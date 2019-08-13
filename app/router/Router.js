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
import store from '../redux/configureStore';
import AuthLoading from '../page/auth';
import HomePage from '../page/home/HomePage';
import VendorDetailPage from '../page/home/VendorDetailPage';
import ShoeKoiFishPage from '../page/koifish/ShoeKoiFishPage';
import MessageCenterPage from '../page/message/MessageCenterPage';
import PersonalCenterPage from '../page/personal/PersonalCenterPage';

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
  homePage: {
    screen: HomePage,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({ focused }) => (focused ? hotSelest : hotUnSelest),
    },
  },
  shoeKoiFishPage: {
    screen: ShoeKoiFishPage,
    navigationOptions: {
      tabBarLabel: '球鞋锦鲤',
      tabBarIcon: ({ focused }) => (focused ? pointSelect : pointUnSelect),
    },
  },
  messageCenterPage: {
    screen: MessageCenterPage,
    navigationOptions: {
      tabBarLabel: '消息中心',
      tabBarIcon: ({ focused }) => (focused ? mineSelect : mineUnSelect),
    },
  },
  personalCenterPage: {
    screen: PersonalCenterPage,
    navigationOptions: {
      tabBarLabel: '个人中心',
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
  homeDetail: {
    screen: VendorDetailPage,
    navigationOptions: {
      header: null,
    },
  },
}, {});
const Router = createAppContainer(createSwitchNavigator({
  Auth: AuthStack,
  Main: InitNavigator,
}, {
  initialRouteName: 'Main',
}));

export { Router, store };
