import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import List from './List';
import { TabBar, CustomHeader } from '../../components';
import { getScreenWidth } from '../../common/Constant';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';
import HeaderRight from './HeaderRight';
import { getAppOptions, getUserInfo, getGoodsOnSale } from '../../utils/commonUtils';
import Modal from './Modal';
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
    const initIndex = Math.max(routes.findIndex(v => v.key === navigation.getParam('type')), 0);
    this.state = {
      routes,
      index: initIndex,
    };
  }

  onIndexChange = (index) => {
    this.setState({ index });
  }

  renderScene = ({ route }) => {
    const { navigation } = this.props;
    return <List itemAction={this.itemAction} navigation={navigation} apiType={route.apiType} route={this.routeType} type={route.key} />;
  }

  renderTabBar = (props) => {
    const { routes, index } = this.state;
    return (
      <View style={styles.header}>
        <TabBar
          style={styles.tabBar}
          routes={routes}
          position={props.position}
          onIndexChange={this.onIndexChange}
        />
        {
          (this.routeType === 'Goods' || index === 0) && (
            <HeaderRight
              color={index === 0 ? Colors.RED : '#FF9600'}
              prefix={`${this.routeType === 'Goods' ? (index === 0 ? '销售中: ' : '已卖出: ') : '库存 '}`}
              apiType={routes[index].apiType}
            />
          )
        }
      </View>
    );
  }

  itemAction = (type, route, item, refresh) => {
    const { navigation } = this.props;
    if (['express', 'edit', 'cancel'].includes(type)) {
      this.modalbox.open(type, item, refresh, route);
    } else if (['pickUp', 'sendBack'].includes(type)) {
      navigation.navigate('PickUp', {
        title: '支付运费',
        item,
      });
    } else if (type === 'pay') {
      navigation.navigate('pay', {
        title: '选择支付账户',
        type: '1',
        payType: item.order_type === '1' ? 'buyGoods' : 'buyActivityGoods',
        payData: {
          order_id: item.order_id,
          price: item.order_price,
          management: item.order_type === '1' ? getAppOptions()?.management : null,
        },
        shopInfo: {
          goods: item.goods,
          order_id: item.order_id,
        },
      });
    } else if (type === 'publish') {
      navigation.navigate('PutOnSale', {
        title: '发布商品',
        item,
      });
    }
  }

  toShare = () => {
    const item = {
      text: getGoodsOnSale()?.list?.[0].goods_name || '安全 简单 高效',
      img: getGoodsOnSale()?.list?.[0].icon || '',
    };
    showShare({
      text: item.text,
      img: item.img,
      url: `http://m.dropstore.cn/index.html#/shareMyShoese/${getUserInfo()?.id}`,
      title: `${getUserInfo()?.user_name}在炒饭APP上有${getGoodsOnSale()?.count}双鞋正在销售，快来看看有没有你喜欢的吧`,
    });
  };

  navRightOnPress = () => {
    const { navigation } = this.props;
    if (navigation.getParam('title') === '我的商品') {
      this.toShare();
    } else {
      navigation.navigate('FreeTradePublish', { title: '选择' });
    }
  }

  render() {
    const { navigation } = this.props;
    const rightText = navigation.getParam('title') === '我的商品' ? '分享' : '我要出售';
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          navigation={navigation}
          Right={(
            <TouchableOpacity onPress={this.navRightOnPress} style={styles.rightWrapper}>
              <Text>{rightText}</Text>
            </TouchableOpacity>
          )}
        />
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
        <Modal
          navigation={navigation}
          ref={(v) => { this.modalbox = v; }}
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
  nav: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MyGoods;
