import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { TabBar } from '../../components';
import { getScreenWidth, STATUSBAR_HEIGHT } from '../../common/Constant';
import OriginalCost from './originalCost';
import SelfSupport from './selfSupport';

const ROUTES = [
  { key: 'originalCost', title: '原价自营', screen: OriginalCost },
  { key: 'selfSupport', title: '炒饭发售', screen: SelfSupport },
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
    const { routes } = this.state;
    return (
      <TabBar
        style={styles.tabBar}
        routes={routes}
        position={props.position}
        onIndexChange={this.onIndexChange}
      />
    );
  }

  render() {
    return (
      <TabView
        style={styles.tabView}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.onIndexChange}
        useNativeDriver
        initialLayout={{ width: getScreenWidth() }}
        lazy
      />
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
});

export default HomePage;
