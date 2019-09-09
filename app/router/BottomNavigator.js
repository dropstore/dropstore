/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  View, StyleSheet, TouchableWithoutFeedback, StatusBar, Animated, Text, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { TabView } from 'react-native-tab-view';
import Image from '../components/Image';
import Images from '../res/Images';
import { SCREEN_WIDTH, SCREEN_HEIGHT, PADDING_TAB } from '../common/Constant';
import Colors from '../res/Colors';
import { wPx2P } from '../utils/ScreenUtil';
import Personal from '../page/personal';
import Identify from '../page/identify';
import HomePage from '../page/home';
import FreeTrade from '../page/freeTrade';
import Activity from '../page/notice/Activity';
import { getUserInfo } from '../redux/reselect/userInfo';

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}


const HOME_ICON_WIDTH = wPx2P(97);
const PADDING_HORIZONTAL = wPx2P(22);
const TAB_HEIGHT = 52;

const ROUTES = [
  { screen: FreeTrade, key: 'freeTrade', title: '交易' },
  { screen: Identify, key: 'identify', title: '鉴定' },
  { screen: HomePage, key: 'drop' },
  { screen: Activity, key: 'message', title: '消息' },
  { screen: Personal, key: 'personal', title: '我的' },
];

class BottomNavigator extends PureComponent {
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
    const { userInfo, navigation } = this.props;
    if (index === 4 && !userInfo.user_s_id) {
      navigation.navigate('Auth');
      return;
    }
    this.setState({ index });
    if ([0, 1, 3].includes(index)) {
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

  renderScene = ({ route }) => {
    const Screen = route.screen;
    return <Screen onIndexChange={this.onIndexChange} />;
  };

  renderTabBar = () => null;

  render() {
    const { routes, index: indexState } = this.state;
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
                        ? (
                          <Animated.View style={{ opacity: this.opacity[index], alignItems: 'center', paddingTop: 5 }}>
                            {
                              v.key === 'drop'
                                ? <Image style={styles.drop} source={Images.drop} />
                                : (
                                  <Image
                                    resizeMode="contain"
                                    style={{
                                      width: wPx2P(26),
                                      height: wPx2P(26),
                                    }}
                                    source={indexState === index ? Images[v.key] : Images[`${v.key}Inactive`]}
                                  />
                                )
                            }
                            {v.key !== 'drop' ? (
                              <Text
                                style={{ color: indexState === index ? '#000' : '#A7A7A7', fontSize: 10, marginTop: 4 }}
                              >
                                {v.title}
                              </Text>
                            ) : null}
                          </Animated.View>
                        )
                        : <View style={{ flex: 1, height: '100%' }} />
                    }
                </TouchableWithoutFeedback>
              );
            })
          }
        </View>
        {
          Platform.OS === 'android' && (
          <TouchableWithoutFeedback onPressIn={() => this.onPressIn(2)} onPressOut={() => this.onPressOut(2)} onPress={() => this.onIndexChange(2)}>
            <View style={styles.placeholder} />
          </TouchableWithoutFeedback>
          )
        }
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
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: PADDING_HORIZONTAL,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
  },
  placeholder: {
    height: 10,
    width: HOME_ICON_WIDTH,
    position: 'absolute',
    alignSelf: 'center',
    bottom: TAB_HEIGHT + PADDING_TAB,
  },
  drop: {
    width: HOME_ICON_WIDTH,
    height: wPx2P(51),
    // marginBottom: 27.5,
    position: 'relative',
    top: -15,
  },
});

export default connect(mapStateToProps)(BottomNavigator);
