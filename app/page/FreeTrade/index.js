import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { NavigationBarCom, FreeTradeList } from '../../components';
import { STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';

export default class FreeTrade extends PureComponent {
  itemOnPress = (item) => {
    const { navigation } = this.props;
    navigation.navigate('FreeTradeDetail', {
      title: '商品详情',
      item,
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FreeTradeList
          itemOnPress={this.itemOnPress}
          style={{ flex: 1, marginTop: STATUSBAR_AND_NAV_HEIGHT }}
          type="freeTradeIndex"
          params={{ type: 1 }}
          showPrice
        />
        <NavigationBarCom title="自由交易" />
      </View>
    );
  }
}
