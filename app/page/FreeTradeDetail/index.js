import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';
import TabBar from '../../components/TabBar';
import List from './List';
import Colors from '../../res/Colors';
import ListItemDetail from './ListItemDetail';
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';

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

  renderScene = ({ route }) => {
    if (route.key === 'freeTradeGoodsDetail') {
      return <ListItemDetail id={this.goods.id} />;
    }
    return <List type={route.key} goods={this.goods} />;
  }

  render() {
    const { routes, index } = this.state;
    return (
      <View style={styles.tabView}>
        <TabBar
          style={styles.tabBar}
          routes={routes}
          index={index}
          itemMargin={20}
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
    backgroundColor: Colors.MAIN_BACK,
  },
  tabBar: {
    height: 50,
    flexDirection: 'row',
    paddingBottom: 6,
    paddingHorizontal: 9,
  },
});

export default MyGoods;
