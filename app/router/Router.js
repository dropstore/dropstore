import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import {
  Platform, Animated, Easing, TouchableOpacity,
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import store from '../redux/configureStore';
import BottomNavigator from './BottomNavigator';
import {
  NAV_HEIGHT, STATUSBAR_AND_NAV_HEIGHT, STATUSBAR_HEIGHT, IS_IPHONE_X,
} from '../common/Constant';
import Image from '../components/Image';
import Colors from '../res/Colors';
import Images from '../res/Images';

import AuthLoading from '../page/auth';
import NameAge from '../page/auth/NameAge';
import GenderSize from '../page/auth/GenderSize';
import PhoneNum from '../page/auth/PhoneNum';

import vendorDetail from '../page/vendorDetail';
import shopDetail from '../page/shopDetail';
import ShopDetailHeaderRight from '../page/shopDetail/components/basic/ShopDetailHeaderRight';
import pay from '../page/pay';
import commission from '../page/commission';

import OrderState from '../page/personal/OrderState';
import Setting from '../page/personal/Setting';
import Safesetting from '../page/personal/Safesetting';
import Address from '../page/personal/Address';
import AddressEdit from '../page/personal/Address/AddressEdit';
import Notice from '../page/personal/Notice';

const AuthStack = createStackNavigator({
  AuthLoading, NameAge, GenderSize, PhoneNum,
}, {
  initialRouteName: 'AuthLoading',
  defaultNavigationOptions: { header: null },
});

// 需要导航头部的路由写在这里
const routesWithHeader = {
  Setting, vendorDetail, OrderState, Safesetting, Address, shopDetail, pay, commission, Notice, AddressEdit,
};
// 不需要导航头部的路由写在这里
const routesWithoutHeader = {
  BottomNavigator,
};

for (const i in routesWithoutHeader) {
  routesWithoutHeader[i] = { screen: routesWithoutHeader[i], navigationOptions: { header: null } };
}
const MainStack = createStackNavigator({ ...routesWithHeader, ...routesWithoutHeader }, {
  initialRouteName: 'BottomNavigator',
  defaultNavigationOptions: ({ navigation }) => ({
    ...Platform.select({
      android: {
        headerStyle: {
          height: STATUSBAR_AND_NAV_HEIGHT,
          borderBottomWidth: 0,
          paddingTop: STATUSBAR_HEIGHT,
          backgroundColor: Colors.OTHER_BACK,
          elevation: 0,
        },
        headerTitleContainerStyle: { left: 56, right: 56 },
      },
      ios: {
        headerStyle: {
          marginTop: IS_IPHONE_X ? -10 : 0,
          backgroundColor: Colors.OTHER_BACK,
          height: NAV_HEIGHT,
          borderBottomWidth: 0,
        },
      },
    }),
    headerTintColor: Colors.WHITE_COLOR,
    headerTitleStyle: { fontWeight: 'bold', flex: 1, textAlign: 'center' },
    headerBackTitle: null,
    headerLeft: (
      <TouchableOpacity style={{ height: NAV_HEIGHT, justifyContent: 'center' }} onPress={() => navigation.pop()}>
        <Image resizeMode="contain" style={{ marginLeft: 10, height: 12, width: 12 }} source={Images.zjt} />
      </TouchableOpacity>
    ),
    headerRight: navigation.getParam('headerRight'),
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
  Main: MainStack,
}, {
  initialRouteName: 'Auth',
}));

export { Router, store };
