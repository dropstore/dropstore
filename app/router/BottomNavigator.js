/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  View, StyleSheet, TouchableWithoutFeedback, StatusBar, Animated,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import Image from '../components/Image';
import Images from '../res/Images';
import { SCREEN_WIDTH, SCREEN_HEIGHT, PADDING_TAB } from '../common/Constant';
import Colors from '../res/Colors';
import { px2Dp } from '../utils/ScreenUtil';
import Personal from '../page/personal';
import Identify from '../page/identify';
import HomePage from '../page/home';
import FreeTrade from '../page/freeTrade';
import Message from '../page/message';
import ShareUtil from '../utils/ShareUtil';
import AuthUtil from '../utils/AuthUtil';

const HOME_ICON_WIDTH = px2Dp(239);
const PADDING_HORIZONTAL = 18;
const TAB_HEIGHT = 53;

const ROUTES = [
  {
    screen: <Personal />,
    key: 'Personal',
    icon: <Image resizeMode="contain" style={{ width: px2Dp(69), height: '100%' }} source={Images.personal} />,
  },
  {
    screen: <Identify />,
    key: 'Identify',
    icon: <Image resizeMode="contain" style={{ width: px2Dp(66), height: '100%' }} source={Images.search} />,
  },
  {
    screen: <HomePage />,
    key: 'HomePage',
    icon: <Image style={{ width: HOME_ICON_WIDTH, height: px2Dp(130), marginBottom: 27.5 }} source={Images.drop} />,
  },
  {
    screen: <FreeTrade />,
    key: 'FreeTrade',
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
    this.opacity = [
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
    ];
  }

  onIndexChange = (index) => {
    this.setState({ index });
    if (index === 0) {
      // AuthUtil(200).then((res) => {
      //   console.log(res);
      // }).catch((err) => {
      //   console.log(err);
      // });
      // ShareUtil('1', '2', '', '4', 2).then((res) => {
      //   console.log(res);
      // }).catch(err => console.log(err, 'error'));
      StatusBar.setBarStyle('light-content', true);
    } else {
      StatusBar.setBarStyle('dark-content', true);
    }
  }

  onPressIn = (i) => {
    Animated.timing(
      this.opacity[i],
      {
        toValue: 0.2,
        duration: 150,
        useNativeDriver: true,
      },
    ).start();
  }

  onPressOut = (i) => {
    Animated.timing(
      this.opacity[i],
      {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      },
    ).start();
  }

  renderScene = ({ route }) => route.screen;

  renderTabBar = () => null;

  render() {
    const { routes, index } = this.state;
    return (
      <View style={styles.container}>
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
            routes.reduce((arr, v) => [...arr, false, false, v], []).slice(2).map((v, i, arr) => {
              const index = (i + 1) / 3 | 0;
              return (
                <TouchableWithoutFeedback
                  key={`v.key${i}`}
                  hitSlop={{
                    bottom: PADDING_TAB,
                    left: i === 0 ? PADDING_HORIZONTAL : 0,
                    right: i === arr.length - 1 ? PADDING_HORIZONTAL : 0,
                  }}
                  onPressIn={() => this.onPressIn(index)}
                  onPressOut={() => this.onPressOut(index)}
                  onPress={() => this.onIndexChange(index)}
                >
                  {
                      v
                        ? <Animated.View style={{ opacity: this.opacity[index] }}>{v.icon}</Animated.View>
                        : <View style={{ flex: 1, height: '100%' }} />
                    }
                </TouchableWithoutFeedback>
              );
            })
          }
        </View>
        <TouchableWithoutFeedback
          onPressIn={() => this.onPressIn(2)}
          onPressOut={() => this.onPressOut(2)}
          onPress={() => this.onIndexChange(2)}
        >
          <View style={styles.placeholder} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BACK,
  },
  tabBar: {
    height: TAB_HEIGHT + PADDING_TAB,
    paddingBottom: PADDING_TAB,
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
    bottom: TAB_HEIGHT + PADDING_TAB,
  },
});
