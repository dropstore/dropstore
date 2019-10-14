import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RuiXian } from '../../../res/FontFamily';
import { Image } from '../../../components';

export default class TitleWithTag extends PureComponent {
  render() {
    const { text, type } = this.props;
    // 1现货 2期货（已鉴定或从平台购买的）
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={styles.tag} source={type === '1' ? require('../../../res/image/xianhuo.png') : require('../../../res/image/qihuo.png')} />
        <Text style={styles.shopTitle} numberOfLines={2}>
          {text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tag: {
    width: 41,
    height: 23,
    marginRight: 5,
  },
  shopTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    fontFamily: RuiXian,
    textAlign: 'justify',
    flex: 1,
    lineHeight: 14,
  },
});
