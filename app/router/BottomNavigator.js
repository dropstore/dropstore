import React, { PureComponent } from 'react';
import {
  View, StyleSheet, StatusBar, Platform, TouchableWithoutFeedback,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import Image from '../components/Image';
import { SCREEN_WIDTH, SCREEN_HEIGHT, PADDING_TAB } from '../common/Constant';
import { px2Dp } from '../utils/ScreenUtil';
import Personal from '../page/personal';
import Search from '../page/search';
import HomePage from '../page/home';
import Wallet from '../page/wallet';
import Message from '../page/message';

const HOME_ICON_WIDTH = px2Dp(239);
const ROUTES = [
  {
    screen: <Personal />,
    key: 'Personal',
    icon: <Image style={{ width: px2Dp(69), height: px2Dp(53) }} source={require('../res/image/personal.png')} />,
  },
  {
    screen: <Search />,
    key: 'Search',
    icon: <Image style={{ width: px2Dp(66), height: px2Dp(54) }} source={require('../res/image/search.png')} />,
  },
  {
    screen: <HomePage />,
    key: 'HomePage',
    icon: <Image style={{ width: HOME_ICON_WIDTH, height: px2Dp(130), marginBottom: 27.5 }} source={require('../res/image/drop.png')} />,
  },
  {
    screen: <Wallet />,
    key: 'Wallet',
    icon: <Image style={{ width: px2Dp(65), height: px2Dp(46) }} source={require('../res/image/wallet.png')} />,
  },
  {
    screen: <Message />,
    key: 'Message',
    icon: <Image style={{ width: px2Dp(69), height: px2Dp(52) }} source={require('../res/image/message.png')} />,
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
            routes.map((v, i) => (
              <TouchableWithoutFeedback
                hitSlop={{
                  top: 15, left: 20, bottom: 25, right: 20,
                }}
                onPress={() => this.onIndexChange(i)}
              >
                <View>
                  {v.icon}
                </View>
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
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: px2Dp(36),
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
