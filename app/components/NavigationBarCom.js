/**
 * @file 通用导航栏组件
 * @date 2019/8/17 10:40
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { STATUSBAR_AND_NAV_HEIGHT, STATUSBAR_HEIGHT, getScreenWidth } from '../common/Constant';
import Colors from '../res/Colors';
import { YaHei } from '../res/FontFamily';

export default class NavigationBarCom extends PureComponent {
  render() {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: STATUSBAR_AND_NAV_HEIGHT,
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: Colors.OTHER_BACK,
    alignItems: 'center',
    justifyContent: 'center',
    width: getScreenWidth(),
    top: 0,
    position: 'absolute',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontFamily: YaHei,
  },
});
