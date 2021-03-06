import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';
import TabBar from '../../components/TabBar';
import { SCREEN_WIDTH, STATUSBAR_HEIGHT } from '../../common/Constant';
import Home from './home';
import LuckyCharm from './luckyCharm';
import OriginalCost from './originalCost';
import Reserve from './reserve';
import SelfSupport from './selfSupport';

const ROUTES = [
  // { key: 'home', title: '首页' },
  { key: 'originalCost', title: '原价发售' },
  { key: 'selfSupport', title: 'Drop自营' },
  // { key: 'luckyCharm', title: '球鞋锦鲤' },
  // { key: 'reserve', title: '球鞋预定' },
];

class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: ROUTES,
    };
  }

  onIndexChange = (index) => {
    this.setState({ index });
  }

  renderScene = ({ route }) => ({
    home: <Home />,
    originalCost: <OriginalCost />,
    selfSupport: <SelfSupport />,
    luckyCharm: <LuckyCharm />,
    reserve: <Reserve />,
  }[route.key]);

  render() {
    const { routes, index } = this.state;
    return (
      <View style={styles.tabView}>
        <TabBar
          style={styles.tabBar}
          routes={routes}
          index={index}
          onIndexChange={this.onIndexChange}
        />
        <TabView
          style={{ flex: 1 }}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={() => null}
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
    width: 185, // 330
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 9,
    marginBottom: 5,
  },
});

export default HomePage;
