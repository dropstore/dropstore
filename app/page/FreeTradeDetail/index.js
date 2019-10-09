import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TabView } from 'react-native-tab-view';
import TabBar from '../../components/TabBar';
import List from './List';
import Colors from '../../res/Colors';
import ListItemDetail from './ListItemDetail';
import { getScreenWidth, getScreenHeight, STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';
import Header from './Header';

class MyGoods extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const routes = [
      { key: 'freeTradeGoodsPrice', title: '询价' },
      { key: 'freeTradeGoodsDetail', title: '概述' },
      { key: 'freeTradeHistory', title: '交易历史' },
    ];
    this.state = {
      routes,
      index: 0,
    };
    this.goods = navigation.getParam('item');
  }

  onIndexChange = (index) => {
    this.setState({ index });
  }

  onScroll = (e) => {
    // console.log(e.nativeEvent.contentOffset.y);
  }

  renderScene = ({ route }) => {
    const { navigation } = this.props;
    if (route.key === 'freeTradeGoodsDetail') {
      return <ListItemDetail onScroll={this.onScroll} navigation={navigation} id={this.goods.id} />;
    }
    return <List onScroll={this.onScroll} navigation={navigation} type={route.key} goods={this.goods} />;
  }

  render() {
    const { routes, index } = this.state;
    return (
      <View style={styles.tabView}>
        {/* <Header /> */}
        <TabBar
          style={styles.tabBar}
          routes={routes}
          index={index}
          itemMargin={20}
          onIndexChange={this.onIndexChange}
        />
        <TabView
          style={{ width: getScreenWidth(), height: getScreenHeight() - STATUSBAR_AND_NAV_HEIGHT }}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={() => null}
          onIndexChange={this.onIndexChange}
          useNativeDriver
          initialLayout={{ width: getScreenWidth(), height: getScreenHeight() - STATUSBAR_AND_NAV_HEIGHT }}
          lazy
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    height: getScreenHeight() - STATUSBAR_AND_NAV_HEIGHT,
    width: getScreenWidth(),
    backgroundColor: Colors.MAIN_BACK,
  },
  tabBar: {
    height: 50,
    flexDirection: 'row',
    paddingBottom: 6,
    paddingHorizontal: 9,
  },
  top: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
});

export default MyGoods;
