/**
 * @file 空布局，填充界面
 * @date 2019/8/20 20:02
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SCREEN_WIDTH} from "../common/Constant";
import Colors from '../res/Colors';

export default class EmptyViewCom extends PureComponent {
  render() {
    return (
      <View style={_styles.emptyView}/>
    );
  }
}

const _styles = StyleSheet.create({
  emptyView: {
    width: SCREEN_WIDTH,
    height: 18,
    backgroundColor: Colors.NORMAL_TEXT_F6
  },
});
