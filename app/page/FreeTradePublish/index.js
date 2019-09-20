import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { FreeTradeList } from '../../components';
import Colors from '../../res/Colors';

export default class FreeTrade extends PureComponent {
  itemOnPress = (item) => {
    const { navigation } = this.props;
    navigation.navigate('ChooseSize', {
      title: '选择鞋码',
      item,
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.MAIN_BACK }}>
        <FreeTradeList itemOnPress={this.itemOnPress} style={{ flex: 1 }} type="freeTradeIndex" />
      </View>
    );
  }
}
