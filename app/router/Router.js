/* eslint-disable import/no-unresolved */
import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import {
  Platform, Animated, Easing, TouchableOpacity, StyleSheet,
} from 'react-native';
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import store from '../redux/configureStore';
import BottomNavigator from './BottomNavigator';
import {
  NAV_HEIGHT, STATUSBAR_AND_NAV_HEIGHT, STATUSBAR_HEIGHT, IS_IPHONE_X,
} from '../common/Constant';
import Image from '../components/Image';
import Colors from '../res/Colors';
import { YaHei } from '../res/FontFamily';
import Images from '../res/Images';
import Web from '../page/Web';

import AuthLoading from '../page/auth';
import NameAge from '../page/auth/NameAge';
import GenderSize from '../page/auth/GenderSize';
import PhoneNum from '../page/auth/PhoneNum';

import shopDetail from '../page/shopDetail';
// import luckDetail from '../page/home/luckyCharm/Luckydetail';
import pay from '../page/pay';
import PayStatus from '../page/pay/PayStatus';
import commission from '../page/commission';
import Panicstatus from '../page/Panicstatus';
import drawStatus from '../page/drawstatus';

import Setting from '../page/personal/Setting';
import Safesetting from '../page/personal/Safesetting';
import AddressEdit from '../page/Address/AddressEdit';
import Message from '../page/notice/Message';
import BalanceExtract from '../page/personal/BalanceExtract';
import BalanceDetail from '../page/personal/BalanceDetail';
import Password from '../page/Password';
import MyGoods from '../page/MyGoods';
import PickUp from '../page/PickUp';
import ChooseAddress from '../page/Address/ChooseAddress';
import RestPay from '../page/notice/RestPay';

import FreeTradeDetail from '../page/FreeTradeDetail';
import FreeTradePublish from '../page/FreeTradePublish';
import ChooseSize from '../page/FreeTradePublish/ChooseSize';
import FreeTradeBuy from '../page/FreeTradeBuy';
import PutOnSale from '../page/FreeTradePublish/PutOnSale';
import ImagePage from '../page/ImagePage';
import FreeTradeSearch from '../page/FreeTradeSearch';
import BrandListPage from '../page/FreeTradeSearch/BrandListPage';
import PayDetail from '../page/pay/PayDetail';

const styles = {
  btnWrapper: {
    height: NAV_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 40,
  },
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        height: STATUSBAR_AND_NAV_HEIGHT,
        paddingTop: STATUSBAR_HEIGHT,
        elevation: 0,
      },
      ios: {
        marginTop: IS_IPHONE_X ? -4 : 0,
        height: NAV_HEIGHT,
      },
    }),
  },
  headerTitleStyle: {
    flex: 1,
    textAlign: 'center',
    color: '#010101',
    fontSize: 16,
    fontFamily: YaHei,
  },
};

const defaultNavigationOptions = ({ navigation }) => ({
  headerStyle: styles.headerStyle,
  headerTintColor: Colors.WHITE_COLOR,
  headerTitleStyle: styles.headerTitleStyle,
  headerBackTitle: null,
  headerTitleContainerStyle: { left: 56, right: 56 },
  headerLeft: (
    <TouchableOpacity
      style={styles.btnWrapper}
      onPress={() => {
        const customBack = navigation.getParam('customBack');
        customBack ? customBack() : navigation.pop();
      }}
    >
      <Image resizeMode="contain" style={{ height: 18, width: 11 }} source={Images.back} />
    </TouchableOpacity>
  ),
  headerRight: navigation.getParam('headerRight'),
  title: navigation.getParam('title'),
});

const transition = {
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
};

const AuthStack = createStackNavigator({
  AuthLoading: { screen: AuthLoading, navigationOptions: { header: null } },
  NameAge: { screen: NameAge, navigationOptions: { headerTitle: '个人信息' } },
  GenderSize: { screen: GenderSize, navigationOptions: { headerTitle: '个人信息' } },
  PhoneNum: { screen: PhoneNum, navigationOptions: { headerTitle: '个人信息' } },
  Web: { screen: Web, navigationOptions: { headerTitle: '隐私协议' } },
}, { initialRouteName: 'AuthLoading', defaultNavigationOptions, ...transition });

// 需要导航头部的路由写在这里
const navigationOptionsWithBorderBottom = { navigationOptions: { headerStyle: { ...styles.headerStyle, borderBottomWidth: StyleSheet.hairlineWidth } } };
const routesWithHeader = {
  pay,
  Message,
  AddressEdit,
  Web: { ...navigationOptionsWithBorderBottom, screen: Web },
  Safesetting: { ...navigationOptionsWithBorderBottom, screen: Safesetting },
  BalanceDetail: { ...navigationOptionsWithBorderBottom, screen: BalanceDetail },
  shopDetail: { ...navigationOptionsWithBorderBottom, screen: shopDetail },
  Setting: { ...navigationOptionsWithBorderBottom, screen: Setting },
  PickUp: { ...navigationOptionsWithBorderBottom, screen: PickUp },
  ChooseAddress: { ...navigationOptionsWithBorderBottom, screen: ChooseAddress },
  ImagePage: { ...navigationOptionsWithBorderBottom, screen: ImagePage },
  Panicstatus: { ...navigationOptionsWithBorderBottom, screen: Panicstatus },
  commission: { ...navigationOptionsWithBorderBottom, screen: commission },
  PayStatus: { ...navigationOptionsWithBorderBottom, screen: PayStatus },
  BalanceExtract,
  Password,
  MyGoods,
  RestPay,
  FreeTradeDetail,
  FreeTradePublish,
  ChooseSize,
  FreeTradeBuy: { path: 'freetradebuy/:freeid', screen: FreeTradeBuy },
  PayDetail,
  PutOnSale,
  BrandListPage,
  FreeTradeSearch,
};
// 不需要导航头部的路由写在这里
const routesWithoutHeader = {
  BottomNavigator,
  drawStatus,
};

for (const i in routesWithoutHeader) {
  if (routesWithoutHeader[i].constructor === Object) {
    routesWithoutHeader[i] = { navigationOptions: { header: null }, ...routesWithoutHeader[i] };
  } else {
    routesWithoutHeader[i] = { screen: routesWithoutHeader[i], navigationOptions: { header: null } };
  }
}
const MainStack = createStackNavigator({ ...routesWithHeader, ...routesWithoutHeader }, {
  initialRouteName: 'BottomNavigator', defaultNavigationOptions, ...transition,
});

const Router = createAppContainer(createSwitchNavigator({
  Auth: AuthStack,
  Main: {
    screen: MainStack,
    path: 'main',
  },
}, {
  initialRouteName: 'Auth',
  ...transition,
}));

export { Router, store };
