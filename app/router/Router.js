import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Platform, Animated, Easing } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import store from '../redux/configureStore';
import BottomNavigator from './BottomNavigator';

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

const AuthStack = createStackNavigator({
  AuthLoading,
  NameAge,
  GenderSize,
  PhoneNum,
}, {
  initialRouteName: 'AuthLoading',
  defaultNavigationOptions: {
    header: null,
  },
});

const InitNavigator = createStackNavigator({
  vendorDetail,
  main: { screen: BottomNavigator },
  OrderState,
  shopDetail,
  pay,
  commission,
}, {
  initialRouteName: 'main',
  defaultNavigationOptions: { header: null },
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
