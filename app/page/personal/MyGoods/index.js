import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, StatusBar,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import List from './List';
import TabBar from '../../../components/TabBar';
import { SCREEN_WIDTH } from '../../../common/Constant';
import Colors from '../../../res/Colors';
import { YaHei } from '../../../res/FontFamily';

class MyGoods extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    navigation.setParams({
      customBack: this.customBack,
    });
    this.routeType = navigation.getParam('title') === '我的商品' ? 'Goods' : 'Warehouse';
    const routes = this.routeType === 'Goods' ? [
      { key: 'onSale', title: '销售中' },
      { key: 'selled', title: '已卖出' },
    ] : [
      {
        key: 'warehouse', title: '库房', api: '/order/order_goods_list', params: { goods_status: 1 },
      },
      {
        key: 'uncomplete', title: '未完成', api: '/order/order_list', params: { status: 0 },
      },
      {
        key: 'sendOut', title: '已出库', api: '/order/order_goods_list', params: { goods_status: 2 },
      },
    ];
    this.state = {
      routes,
      index: Math.max(routes.findIndex(v => v.key === navigation.getParam('type')), 0),
    };
    // navigation.setParams({
    //   headerRight: (
    //     <TouchableOpacity onPress={this.add} style={styles.rightWrapper}>
    //       <Text style={{ color: '#fff', fontSize: 13 }}>发布</Text>
    //     </TouchableOpacity>
    //   ),
    // });
  }

  customBack = () => {
    const { navigation } = this.props;
    navigation.navigate('BottomNavigator', { index: 4 });
  }

  onIndexChange = (index) => {
    this.setState({ index });
  }

  add = () => {
    // const { navigation } = this.props;
    // navigation.navigate('OrderState', {
    //   url: 'http://m.dropstore.cn/index.html#/help',
    //   title: '我的库房',
    //   type: 'warehouse',
    // });
  }

  renderScene = ({ route }) => <List api={route.api} params={route.params} route={this.routeType} type={route.key} />;

  render() {
    const { routes, index } = this.state;
    const isMyGoods = this.routeType === 'Goods';
    return (
      <View style={styles.tabView}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <View style={styles.header}>
          <TabBar
            style={{ ...styles.tabBar, width: isMyGoods ? 140 : 180 }}
            routes={routes}
            index={index}
            onIndexChange={this.onIndexChange}
          />
          {
            isMyGoods && (
              <View style={styles.textWrapper}>
                <Text style={styles.text1}>{`${index === 0 ? '销售中: ' : '已卖出: '}`}</Text>
                <Text style={[styles.text2, { color: index === 0 ? '#C81919' : '#37B6EB' }]}>5722</Text>
                <Text style={styles.text1}> 双</Text>
              </View>
            )
          }
        </View>

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
    flex: 1,
    backgroundColor: Colors.MAIN_BACK,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabBar: {
    height: 50,
    flexDirection: 'row',
    paddingBottom: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 9,
  },
  rightWrapper: {
    paddingRight: 12,
    height: '100%',
    paddingLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    color: '#272727',
    fontSize: 12,
    fontFamily: YaHei,
    marginBottom: 3.5,
  },
  text2: {
    fontSize: 20,
    fontFamily: YaHei,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 8,
  },
});

export default MyGoods;
