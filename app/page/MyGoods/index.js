import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import List from './List';
import { TabBar } from '../../components';
import { getScreenWidth } from '../../common/Constant';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';
import HeaderRight from './HeaderRight';
import { showShare } from '../../utils/MutualUtil';

class MyGoods extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.routeType = navigation.getParam('title') === '我的商品' ? 'Goods' : 'Warehouse';
    const routes = this.routeType === 'Goods' ? [
      { key: 'onSale', title: '销售中', apiType: 'goodsOnSale' },
      { key: 'selled', title: '已卖出', apiType: 'goodsSelled' },
    ] : [
      { key: 'warehouse', title: '库房', apiType: 'warehouse' },
      { key: 'uncomplete', title: '未付款', apiType: 'uncomplete' },
      { key: 'sendOut', title: '已出库', apiType: 'sendOut' },
    ];
    this.state = {
      routes,
      index: Math.max(routes.findIndex(v => v.key === navigation.getParam('type')), 0),
    };
    navigation.setParams({
      headerRight: (
        <TouchableOpacity onPress={this.onPress} style={styles.rightWrapper}>
          <Text>{navigation.getParam('title') === '我的商品' ? '分享' : '我要出售'}</Text>
        </TouchableOpacity>
      ),
    });
  }

  onIndexChange = (index) => {
    this.setState({ index });
  }

  onPress = () => {
    if (this.routeType === 'Warehouse') {
      const { navigation } = this.props;
      navigation.navigate('FreeTradePublish', {
        title: '选择',
      });
    } else {
      showShare({
        text: '正文',
        img: '',
        url: '',
        title: '',
      });
    }
  }

  renderScene = ({ route }) => {
    const { navigation } = this.props;
    return <List navigation={navigation} apiType={route.apiType} route={this.routeType} type={route.key} />;
  }

  renderTabBar = (props) => {
    this.indexScrollPosition = props.position;
    return null;
  }

  render() {
    const { routes, index } = this.state;
    return (
      <View style={styles.tabView}>
        <View style={styles.header}>
          <TabBar
            style={styles.tabBar}
            routes={routes}
            position={this.indexScrollPosition}
            onIndexChange={this.onIndexChange}
          />
          {
            (this.routeType === 'Goods' || index === 0) && (
              <HeaderRight
                color={index === 0 ? Colors.RED : '#37B6EB'}
                prefix={`${this.routeType === 'Goods' ? (index === 0 ? '销售中: ' : '已卖出: ') : '库存 '}`}
                apiType={routes[index].apiType}
              />
            )
          }
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
    flex: 1,
    backgroundColor: Colors.MAIN_BACK,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabBar: {
    height: 39,
    flexDirection: 'row',
    paddingTop: 12,
  },
  rightWrapper: {
    paddingRight: 12,
    height: '100%',
    paddingLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: YaHei,
  },
});

export default MyGoods;
