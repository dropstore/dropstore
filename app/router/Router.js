import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import {
  Platform, Animated, Easing, TouchableOpacity, StyleSheet,
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
import Web from '../page/Web';

import AuthLoading from '../page/auth';
import NameAge from '../page/auth/NameAge';
import GenderSize from '../page/auth/GenderSize';
import PhoneNum from '../page/auth/PhoneNum';

import vendorDetail from '../page/vendorDetail';
import shopDetail from '../page/shopDetail';
// import luckDetail from '../page/home/luckyCharm/Luckydetail';
import pay from '../page/pay';
import payStatus from '../page/pay/PayStatus';
import commission from '../page/commission';
import panicStatus from '../page/panicstatus';
import drawStatus from '../page/drawstatus';

import Setting from '../page/personal/Setting';
import Safesetting from '../page/personal/Safesetting';
import AddressEdit from '../page/Address/AddressEdit';
import Message from '../page/notice/Message';
import Extract from '../page/personal/Extract';
import Detail from '../page/personal/Detail';
import Password from '../page/Password';
import MyGoods from '../page/MyGoods';
import PickUp from '../page/PickUp';
import ChooseAddress from '../page/Address/ChooseAddress';
import RestPay from '../page/notice/RestPay';

import FreeTradeDetail from '../page/FreeTradeDetail';

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
      <Image resizeMode="contain" style={{ height: 18, width: 10 }} source={Images.back} />
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
  NameAge: { screen: NameAge, navigationOptions: { header: null } },
  GenderSize: { screen: GenderSize, navigationOptions: { header: null } },
  PhoneNum: { screen: PhoneNum, navigationOptions: { header: null } },
  Web,
}, { initialRouteName: 'AuthLoading', defaultNavigationOptions, ...transition });

// 需要导航头部的路由写在这里
const routesWithHeader = {
  Setting,
  vendorDetail,
  Safesetting,
  shopDetail,
  // luckDetail,
  pay,
  commission,
  Message,
  AddressEdit,
  Web,
  Extract,
  Detail,
  Password,
  MyGoods,
  PickUp,
  ChooseAddress,
  RestPay,
  FreeTradeDetail,
};
// 不需要导航头部的路由写在这里
const routesWithoutHeader = {
  BottomNavigator,
  payStatus,
  panicStatus,
  drawStatus,
};

for (const i in routesWithoutHeader) {
  routesWithoutHeader[i] = { screen: routesWithoutHeader[i], navigationOptions: { header: null } };
}
const MainStack = createStackNavigator({ ...routesWithHeader, ...routesWithoutHeader }, {
  initialRouteName: 'BottomNavigator', defaultNavigationOptions, ...transition,
});

const Router = createAppContainer(createSwitchNavigator({
  Auth: AuthStack,
  Main: MainStack,
}, {
  initialRouteName: 'Auth',
  ...transition,
}));

const styles = StyleSheet.create({
  btnWrapper: {
    height: NAV_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 40,
  },
  headerStyle: {
    ...Platform.select({
      android: {
        height: STATUSBAR_AND_NAV_HEIGHT,
        borderBottomWidth: 0,
        paddingTop: STATUSBAR_HEIGHT,
        backgroundColor: Colors.OTHER_BACK,
        elevation: 0,
      },
      ios: {
        marginTop: IS_IPHONE_X ? -4 : 0,
        backgroundColor: Colors.OTHER_BACK,
        height: NAV_HEIGHT,
        borderBottomWidth: 0,
      },
    }),
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});

export { Router, store };
