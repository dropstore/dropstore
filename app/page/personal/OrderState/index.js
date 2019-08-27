import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import { STATUSBAR_AND_NAV_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../common/Constant';
import OrderList from './OrderList';

export default class OrderState extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const routes = navigation.getParam('title') === '购买记录' ? [
      { key: 'uncomplete', title: '未完成' },
      { key: 'daishouhuo', title: '待收货' },
      { key: 'completed', title: '已完成' },
    ] : [
      { key: 'uncomplete', title: '未完成' },
      { key: 'intoWarehouse', title: '已入库' },
      { key: 'deliverted', title: '已发货' },
      { key: 'completed', title: '已完成' },
    ];
    this.state = {
      routes,
      index: Math.max(routes.findIndex(v => v.key === navigation.getParam('type')), 0),
    };
  }

  onIndexChange = (index) => {
    this.setState({ index });
  }

  renderScene = ({ route }) => <OrderList type={route.key} />;

  renderTabBar = () => {
    const { routes, index } = this.state;
    return (
      <View style={styles.tabBar}>
        {
          routes.map((route, i) => (
            <TouchableOpacity key={route.key} style={[styles.tab, { backgroundColor: index === i ? '#E86868' : '#fff' }]} onPress={() => this.onIndexChange(i)}>
              <Text style={{ fontSize: 13, color: index === i ? '#fff' : '#000' }}>{route.title}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.onIndexChange}
        useNativeDriver
        initialLayout={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT - STATUSBAR_AND_NAV_HEIGHT }}
        lazy
      />
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: 37,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
