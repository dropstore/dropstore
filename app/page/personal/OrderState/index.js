import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { STATUSBAR_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../common/Constant';
import { wPx2P } from '../../../utils/ScreenUtil';
import OrderList from './OrderList';


export default class OrderState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        { key: 'uncomplete', title: '未完成' },
        { key: 'intoWarehouse', title: '已入库' },
        { key: 'deliverted', title: '已发货' },
        { key: 'completed', title: '已完成' },
      ],
      index: 2,
    };
  }

  onIndexChange = (index) => {
    this.setState({ index });
  }

  renderScene = ({ route }) => <OrderList />;

  renderTabBar = () => null;

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
        // renderTabBar={this.renderTabBar}
        onIndexChange={this.onIndexChange}
        useNativeDriver
        initialLayout={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT - STATUSBAR_HEIGHT }}
        lazy
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: '#c20000',
    alignItems: 'center',
  },
  headerTitle: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
  frameHead: {
    height: wPx2P(59),
    width: wPx2P(61),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    paddingHorizontal: wPx2P(22),
    justifyContent: 'space-between',
  },
});
