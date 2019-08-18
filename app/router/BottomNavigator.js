/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  View, StyleSheet, StatusBar, Platform, TouchableWithoutFeedback,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import Image from '../components/Image';
import Images from '../res/Images';
import { SCREEN_WIDTH, SCREEN_HEIGHT, PADDING_TAB } from '../common/Constant';
import { px2Dp } from '../utils/ScreenUtil';
import Personal from '../page/personal';
import Search from '../page/search';
import HomePage from '../page/home';
import Wallet from '../page/wallet';
import Message from '../page/message';

const HOME_ICON_WIDTH = px2Dp(239);
const PADDING_HORIZONTAL = 18;

const ROUTES = [
  {
    screen: <Personal />,
    key: 'Personal',
    icon: <Image resizeMode="contain" style={{ width: px2Dp(69), height: '100%' }} source={Images.personal} />,
  },
  {
    screen: <Search />,
    key: 'Search',
    icon: <Image resizeMode="contain" style={{ width: px2Dp(66), height: '100%' }} source={Images.search} />,
  },
  {
    screen: <HomePage />,
    key: 'HomePage',
    icon: <Image style={{ width: HOME_ICON_WIDTH, height: px2Dp(130), marginBottom: 27.5 }} source={Images.drop} />,
  },
  {
    screen: <Wallet />,
    key: 'Wallet',
    icon: <Image resizeMode="contain" style={{ width: px2Dp(65), height: '100%' }} source={Images.wallet} />,
  },
  {
    screen: <Message />,
    key: 'Message',
    icon: <Image resizeMode="contain" style={{ width: px2Dp(69), height: '100%' }} source={Images.message} />,
  },
];

export default class BottomNavigator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      routes: ROUTES,
      index: 2,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    }
  }

  onIndexChange = (index) => {
    this.setState({ index });
  }

  renderScene = ({ route }) => route.screen;

  renderTabBar = () => null;

  render() {
    const { routes, index } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <TabView
          style={{ flex: 1 }}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={this.onIndexChange}
          useNativeDriver
          initialLayout={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
          lazy
        />
        <View style={styles.tabBar}>
          {
            routes.reduce((arr, v) => [...arr, false, false, v], []).slice(2).map((v, i, arr) => (
              <TouchableWithoutFeedback
                key={`v.key${i}`}
                hitSlop={{
                  bottom: px2Dp(PADDING_TAB),
                  left: i === 0 ? PADDING_HORIZONTAL : 0,
                  right: i === arr.length - 1 ? PADDING_HORIZONTAL : 0,
                }}
                onPress={() => this.onIndexChange((i + 1) / 3 | 0)}
              >
                {
                  v ? <View>{v.icon}</View> : <View style={{ flex: 1, height: '100%' }} />
                }
              </TouchableWithoutFeedback>
            ))
          }
        </View>
        <TouchableWithoutFeedback onPress={() => this.onIndexChange(2)}>
          <View style={styles.placeholder} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  tabBar: {
    height: px2Dp(101 + PADDING_TAB),
    paddingBottom: px2Dp(PADDING_TAB),
    alignItems: 'center',
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: PADDING_HORIZONTAL,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
  },
  placeholder: {
    height: 20,
    width: HOME_ICON_WIDTH,
    position: 'absolute',
    alignSelf: 'center',
    bottom: px2Dp(101 + PADDING_TAB),
  },
});
