import React, { PureComponent } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import List from './List';
import Colors from '../../res/Colors';
import ListItemDetail from './ListItemDetail';
import { getScreenWidth, getScreenHeight, STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';
import Header from './Header';

class MyGoods extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('ChooseSize', { title: '选择鞋码', item: navigation.getParam('item') })}>
        <Text style={{ marginRight: 12 }}>我要出售</Text>
      </TouchableOpacity>
    ),
  });

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
    this.indexScrollPosition = new Animated.Value(0);
  }

  onIndexChange = (index) => {
    this.setState({ index });
  }

  renderScene = ({ route }) => {
    const { navigation } = this.props;
    if (route.key === 'freeTradeGoodsDetail') {
      return <ListItemDetail navigation={navigation} id={this.goods.id} />;
    }
    return <List navigation={navigation} type={route.key} goods={this.goods} />;
  }

  renderTabBar = (props) => {
    this.indexScrollPosition = props.position;
    return null;
  }

  render() {
    const { routes, index } = this.state;
    return (
      <View style={styles.tabView}>
        <Header
          onIndexChange={this.onIndexChange}
          routes={routes}
          index={index}
          item={this.goods}
          indexScrollPosition={this.indexScrollPosition}
        />
        <TabView
          style={{ width: getScreenWidth(), height: getScreenHeight() - STATUSBAR_AND_NAV_HEIGHT }}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
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
