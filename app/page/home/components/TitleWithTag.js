import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RuiXian } from '../../../res/FontFamily';
import { Image } from '../../../components';

export default class TitleWithTag extends PureComponent {
  render() {
    const { text, bType } = this.props;
    // 1期货 2现货（已鉴定或从平台购买的） 2发布（未填写物流）3发布（已填写物流及鉴定中） 4鉴定（未通过）
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={styles.tag} source={bType === '2' ? require('../../../res/image/tag-qiang.png') : require('../../../res/image/tag-qian.png')} />
        <Text style={styles.shopTitle} numberOfLines={2}>
          {text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tag: {
    width: 23,
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
