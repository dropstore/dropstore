import React, { PureComponent } from 'react';
import {
  View, StyleSheet, FlatList, Text,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import TabBar from '../../components/TabBar';
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';

class MyGoods extends PureComponent {
  constructor(props) {
    super(props);
    const routes = [
      { key: 'price', title: '询价' },
      { key: 'detail', title: '概述' },
      { key: 'history', title: '交易历史' },
    ];
    this.state = {
      routes,
      index: 0,
      scrollEnabled: true,
    };
  }

  test = () => {
    this.setState({
      scrollEnabled: true,
    });
  }

  onIndexChange = (index) => {
    this.setState({ index });
  }

  renderScene = () => {
    const { scrollEnabled } = this.state;
    return (
      <FlatList
        scrollEnabled={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        style={{ flex: 1, backgroundColor: '#ddd' }}
        renderItem={({ item }) => (
          <View style={{ height: 342 }}>
            <Text>{item}</Text>
          </View>
        )}
        bounces={false}
        ref={(v) => { this.flatList = v; }}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    );
  } ;

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
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT - STATUSBAR_AND_NAV_HEIGHT }}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={() => null}
          onIndexChange={this.onIndexChange}
          useNativeDriver
          initialLayout={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT - STATUSBAR_AND_NAV_HEIGHT }}
          lazy
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    height: SCREEN_HEIGHT - STATUSBAR_AND_NAV_HEIGHT,
    width: SCREEN_WIDTH,
  },
  tabBar: {
    height: 50,
    width: 180,
    flexDirection: 'row',
    paddingBottom: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 9,
  },
});

export default MyGoods;
