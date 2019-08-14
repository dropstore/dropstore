import React, { PureComponent } from 'react';
import {
  View, StyleSheet, StatusBar, Platform,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { TabView } from 'react-native-tab-view';
import TabBar from '../../components/Tabbar';
import { SCREEN_WIDTH, STATUSBAR_HEIGHT } from '../../common/Constant';
import Home from './home';
import LuckyCharm from './luckyCharm';
import OriginalCost from './originalCost';
import Reserve from './reserve';
import SelfSupport from './selfSupport';

const ROUTES = [
  { key: 'home', title: '首页' },
  { key: 'originalCost', title: '原价发售' },
  { key: 'selfSupport', title: 'Drop自营' },
  { key: 'luckyCharm', title: '球鞋锦鲤' },
  { key: 'reserve', title: '球鞋预定' },
];

class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: ROUTES,
    };
    this.position = new Animated.Value(0);
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

  renderScene = ({ route }) => ({
    home: <Home />,
    originalCost: <LuckyCharm />,
    selfSupport: <OriginalCost />,
    luckyCharm: <Reserve />,
    reserve: <SelfSupport />,
  }[route.key]);

  renderTabBar = (props) => {
    this.position = props.position;
    return null;
  }

  render() {
    const { routes, index } = this.state;
    return (
      <View style={styles.tabView}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <TabBar
          style={styles.tabBar}
          position={this.position}
          contentContainerStyle={{ paddingTop: 7.5 }}
          routes={routes}
          index={index}
          onIndexChange={this.onIndexChange}
          showIndicator={false}
          activeStyle={{ fontSize: 15, color: [33, 33, 33] }}
          inactiveStyle={{ fontSize: 15, color: [153, 153, 153] }}
        />
        <TabView
          style={{ flex: 1 }}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={this.onIndexChange}
          useNativeDriver
          initialLayout={{ width: SCREEN_WIDTH }}
          lazy
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    marginTop: STATUSBAR_HEIGHT,
    flex: 1,
  },
  tabBar: {
    width: SCREEN_WIDTH,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});

export default HomePage;