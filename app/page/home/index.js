import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import { TabBar } from '../../components';
import { getScreenWidth, STATUSBAR_HEIGHT } from '../../common/Constant';
// import LuckyCharm from './luckyCharm';
import OriginalCost from './originalCost';
import SelfSupport from './selfSupport';

const ROUTES = [
  { key: 'originalCost', title: '原价发售', screen: OriginalCost },
  {
    key: 'selfSupport', title: 'Drop自营', screen: SelfSupport, width: 52,
  },
  // { key: 'luckyCharm', title: '球鞋锦鲤',screen: LuckyCharm },
  // { key: 'reserve', title: '球鞋预定',screen: Reserve },
];

class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    const initIndex = 0;
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      index: initIndex,
      routes: ROUTES,
    };
    this.indexScrollPosition = new Animated.Value(initIndex);
  }

  onIndexChange = (index) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ index });
  }

  renderScene = ({ route }) => {
    const { navigation } = this.props;
    const Screen = route.screen;
    return <Screen navigation={navigation} />;
  }

  renderTabBar = (props) => {
    this.indexScrollPosition = props.position;
    return null;
  }

  render() {
    const { routes } = this.state;
    return (
      <View style={styles.tabView}>
        <View style={styles.header}>
          <TabBar
            style={styles.tabBar}
            routes={routes}
            position={this.indexScrollPosition}
            onIndexChange={this.onIndexChange}
          />
          {/* <Image onPress={this.toSearch} style={styles.search} source={require('../../res/image/search-index.png')} /> */}
        </View>
        <TabView
          style={{ flex: 1 }}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={this.onIndexChange}
          useNativeDriver
          initialLayout={{ width: getScreenWidth() }}
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
    height: 50,
    flexDirection: 'row',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  search: {
    width: 19,
    height: 19,
    right: 16,
    top: 20,
    marginLeft: 20,
  },
});

export default HomePage;
