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
import { toShare, getAppOptions } from '../../utils/commonUtils';
import Modalbox from '../../components/Global/Modalbox';
import { request } from '../../http/Axios';
import Modal from './Modal';


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
      data: null,
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

  onClosed = () => {
    this.setState({
      data: null,
    });
  }

  itemAction = (type, route, navigation, item, refresh) => {
    if (['express', 'edit', 'cancel'].includes(type)) {
      this.setState({
        data: {
          type, route, item, refresh,
        },
      });
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

  render() {
    const { data } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          navigation={navigation}
          Right={(
            <TouchableOpacity
              onPress={() => {
                if (navigation.getParam('title') === '我的商品') {
                  toShare();
                } else {
                  navigation.navigate('FreeTradePublish', { title: '选择' });
                }
              }}
              style={styles.rightWrapper}
            >
              <Text>{navigation.getParam('title') === '我的商品' ? '分享' : '我要出售'}</Text>
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
        {
          data && (
            <Modalbox
              data={{
                element: (<Modal
                  route={data.route}
                  navigation={navigation}
                  closeModalbox={this.closeModalbox}
                  type={data.type}
                  item={data.item}
                  successCallback={(value, type) => new Promise((resolve) => {
                    const { item, refresh } = data;
                    if (type === 'express') {
                      request('/order/do_add_express', { params: { to_express_id: value, order_id: item.order_id } }).then(() => {
                        refresh();
                        resolve();
                      });
                    } else if (type === 'edit') {
                      request('/free/edit_price', { params: { price: value, id: item.free_id } }).then(() => {
                        if (getAppOptions()?.x_fee > 0) {
                          navigation.navigate('PayDetail', {
                            title: '支付服务费',
                            api: {
                              type: 'freeTradeToRelease',
                              params: { order_id: item.order_id, price: value },
                            },
                            type: 5,
                            payType: 'service',
                            goodsInfo: {
                              ...item,
                              image: (item.goods || item).image,
                              icon: (item.goods || item).icon,
                              goods_name: (item.goods || item).goods_name,
                              price: value * 100,
                            },
                          });
                        } else {
                          refresh();
                        }
                        resolve();
                      }).catch(() => {
                        refresh();
                        resolve();
                      });
                    } else if (type === 'cancel') {
                      request('/free/off_shelf', { params: { id: item.free_id } }).then(() => {
                        refresh();
                        resolve();
                      }).catch(() => {
                        refresh();
                        resolve(true);
                      });
                    }
                  })}
                />),
                options: {
                  style: {
                    height: 287,
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                },
              }}
              ref={(v) => { this.modalbox = v; }}
              onClosed={this.onClosed}
            />
          )
        }
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
