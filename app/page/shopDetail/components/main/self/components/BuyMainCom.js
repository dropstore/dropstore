/**
 * @file 抢购成员信息组件
 * @date 2019/8/22 17:29
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {
  StyleSheet, TouchableOpacity, View, Text, DeviceEventEmitter
} from 'react-native';
import {withNavigation} from 'react-navigation';


export default class BuyMainCom extends PureComponent {

  render() {
    const {type, status, activityId, navigation} = this.props;
    return (
      <View>
        <Text>购买</Text>
      </View>
    );
  }
}
