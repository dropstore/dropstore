import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationBarCom from '../../components/NavigationBarCom';
import Image from '../../components/Image';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';

export default class Identify extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBarCom title="鉴定" />
        <Image style={styles.chaofan_hui} source={require('../../res/image/chaofan_hui.png')} />
        <Image style={styles.jianding_hui} source={require('../../res/image/jianding_hui.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  jianding_hui: {
    width: wPx2P(238),
    height: wPx2P(52),
    marginTop: hPx2P(20),
    marginBottom: hPx2P(50),
  },
  chaofan_hui: {
    width: wPx2P(69),
    height: wPx2P(68),
  },
});
