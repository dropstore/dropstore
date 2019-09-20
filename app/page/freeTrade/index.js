import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { NavigationBarCom, FreeTradeList } from '../../components';
import { STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';

export default class FreeTrade extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FreeTradeList style={{ flex: 1, marginTop: STATUSBAR_AND_NAV_HEIGHT }} type="freeTradeIndex" />
        <NavigationBarCom title="自由交易" />
      </View>
    );
  }
}
