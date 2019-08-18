/**
 * @file 商品详情
 * @date 2019/8/18 15:55
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {View,Text} from 'react-native';

export default class ShopDetail extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
        <Text>商品详情</Text></View>
    )
  }
}
