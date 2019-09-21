import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, StatusBar, TouchableOpacity,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import List from './List';
import TabBar from '../../components/TabBar';
import { SCREEN_WIDTH } from '../../common/Constant';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';

class MyGoods extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.routeType = navigation.getParam('title') === '我的商品' ? 'Goods' : 'Warehouse';
    const routes = this.routeType === 'Goods' ? [
      {
        key: 'onSale', title: '销售中', apiType: 'goods', params: { stauts: 0 },
      },
      {
        key: 'selled', title: '已卖出', apiType: 'goods', params: { stauts: 1 },
      },
    ] : [
      {
        key: 'warehouse', title: '库房', apiType: 'warehouse', params: { goods_status: 1 },
      },
      {
        key: 'uncomplete', title: '未完成', apiType: 'uncomplete', params: { status: 0 },
      },
      {
        key: 'sendOut', title: '已出库', apiType: 'warehouse', params: { goods_status: 2 },
      },
    ];
    this.state = {
      routes,
      index: Math.max(routes.findIndex(v => v.key === navigation.getParam('type')), 0),
    };
    if (this.routeType === 'Warehouse') {
      navigation.setParams({
        headerRight: (
          <TouchableOpacity onPress={this.add} style={styles.rightWrapper}>
            <Text style={{ color: '#fff', fontSize: 13 }}>发布</Text>
          </TouchableOpacity>
        ),
      });
    }
  }

  onIndexChange = (index) => {
    this.setState({ index });
  }

  add = () => {
    const { navigation } = this.props;
    navigation.navigate('FreeTradePublish', {
      title: '选择',
    });
  }

  renderScene = ({ route }) => {
    const { navigation } = this.props;
    return <List navigation={navigation} apiType={route.apiType} params={route.params} route={this.routeType} type={route.key} />;
  }

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
