/**
 * @file 通用导航栏组件
 * @date 2019/8/17 10:40
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { STATUSBAR_AND_NAV_HEIGHT, STATUSBAR_HEIGHT, getScreenWidth } from '../common/Constant';
import { YaHei } from '../res/FontFamily';
import Image from './Image';

export default class NavigationBarCom extends PureComponent {
  render() {
    const { title, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {
          navigation && (
            <TouchableOpacity
              onPress={() => navigation.navigate('FreeTradeSearch', { title: '搜索' })}
              style={{ position: 'absolute', right: 16, top: 12 + STATUSBAR_HEIGHT }}
            >
              <Image source={require('../res/image/search-index.png')} style={{ height: 19, width: 19 }} />
            </TouchableOpacity>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: STATUSBAR_AND_NAV_HEIGHT,
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: getScreenWidth(),
    top: 0,
    position: 'absolute',
  },
  title: {
    color: '#010101',
    fontSize: 16,
    fontFamily: YaHei,
  },
});
