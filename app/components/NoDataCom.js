/**
 * @file 无数据视图
 * @date 2019/8/29 11:45
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import Colors from "../res/Colors";

export default class NoDataCom extends PureComponent {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: Colors.NORMAL_TEXT_6, fontSize: 16,}}>暂无数据</Text>
      </View>
    );
  }
}

