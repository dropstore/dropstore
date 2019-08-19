/**
 * @file 锦鲤业务模块
 * @date 2019/8/19 15:11
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class LuckyCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={_styles.container}>
        <Text>锦鲤不显示主体内容模块</Text>
      </View>
    )
  }
}
const _styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
