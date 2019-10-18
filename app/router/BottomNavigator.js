/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  View, StyleSheet, TouchableWithoutFeedback, Animated, Text, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabView } from 'react-native-tab-view';
import Image from '../components/Image';
import Images from '../res/Images';
import { getScreenWidth, getScreenHeight, PADDING_TAB } from '../common/Constant';
import Colors from '../res/Colors';
import { wPx2P } from '../utils/ScreenUtil';
import Personal from '../page/personal';
import Identify from '../page/identify';
import HomePage from '../page/home';
import FreeTrade from '../page/FreeTrade';
import Activity from '../page/notice/Activity';
import { getUserInfo } from '../redux/reselect/userInfo';
import { fetchSimpleData } from '../redux/actions/simpleData';

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSimpleData,
  }, dispatch);
}

const HOME_ICON_WIDTH = wPx2P(70);
const PADDING_HORIZONTAL = wPx2P(22);
const TAB_HEIGHT = 46;
const ROUTES = [
  { screen: FreeTrade, key: 'freeTrade', title: '交易' },
  { screen: Identify, key: 'identify', title: '鉴定' },
  { screen: HomePage, key: 'home' },
  { screen: Activity, key: 'message', title: '消息' },
  { screen: Personal, key: 'personal', title: '我的' },
];

class BottomNavigator extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      routes: ROUTES,
      index: navigation.state?.params?.index === 0 ? 0 : (navigation.state?.params?.index || 2),
    };
    this.opacity = [
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
    ];
  }

  componentDidMount() {
    const { navigation, userInfo, fetchSimpleData } = this.props;
    fetchSimpleData('appOptions', { user_id: userInfo.id });
    this.didBlurSubscription = navigation.addListener(
      'willFocus',
      (payload) => {
        if (payload.action.type === 'Navigation/NAVIGATE') {
          const nextIndex = payload?.state?.params?.index;
          nextIndex && this.onIndexChange(nextIndex);
        }
      },
    );
  }

  componentWillUnmount() {
    this.didBlurSubscription && this.didBlurSubscription.remove();
  }

  onIndexChange = (index) => {
    const { userInfo, navigation } = this.props;
    if (index === 4 && !userInfo.user_s_id) {
      navigation.navigate('Auth');
      return;
    }
    this.setState({ index });
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
    const { navigation } = this.props;
    const Screen = route.screen;
    return <Screen navigation={navigation} onIndexChange={this.onIndexChange} />;
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
          initialLayout={{ width: getScreenWidth(), height: getScreenHeight() }}
          lazy
        />
        <View style={styles.tabBar}>
          <View style={styles.homeIcon} />
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
                          <Animated.View style={{
                            opacity: this.opacity[index], alignItems: 'center', paddingTop: 3, paddingBottom: 6, justifyContent: 'space-between',
                          }}
                          >
                            {
                              v.key === 'home'
                                ? <Image style={styles.drop} source={indexState === index ? Images[v.key] : Images[`${v.key}Inactive`]} />
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
                            {v.key !== 'home' ? (
                              <Text
                                style={{ color: indexState === index ? '#000' : '#A7A7A7', fontSize: 10 }}
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
    width: getScreenWidth(),
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: PADDING_HORIZONTAL,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
  },
  placeholder: {
    height: 25,
    width: HOME_ICON_WIDTH,
    position: 'absolute',
    alignSelf: 'center',
    bottom: TAB_HEIGHT + PADDING_TAB,
  },
  drop: {
    width: HOME_ICON_WIDTH,
    height: wPx2P(70),
    position: 'relative',
    top: -33,
  },
  homeIcon: {
    width: HOME_ICON_WIDTH,
    height: wPx2P(70),
    position: 'absolute',
    bottom: PADDING_TAB + 6,
    zIndex: -1,
    backgroundColor: '#fff',
    left: (getScreenWidth() - wPx2P(70)) / 2,
    borderRadius: wPx2P(35),
    overflow: 'hidden',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavigator);
