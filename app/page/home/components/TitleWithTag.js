import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, Platform,
} from 'react-native';
import { YaHei } from '../../../res/FontFamily';

export default class TitleWithTag extends PureComponent {
  render() {
    const { text, bType, sType } = this.props;
    // 1期货 2现货（已鉴定或从平台购买的） 2发布（未填写物流）3发布（已填写物流及鉴定中） 4鉴定（未通过）
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.tagText, {
          backgroundColor: bType === '2' ? '#EF4444' : '#FFA700',
          width: 12,
        }]}
        >
          {bType === '2' ? '抢' : '签'}
        </Text>
        <Text style={[styles.tagText, {
          width: 21,
          backgroundColor: sType === '2' ? '#B4DE2A' : '#FFA700',
          left: 14.5,
        }]}
        >
          {sType === '2' ? '期货 ' : '现货'}
        </Text>
        <Text style={styles.shopTitle}>
&emsp;&nbsp;&emsp;&emsp;&nbsp;
          {text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagText: {
    color: '#fff',
    fontSize: 10,
    height: 13,
    overflow: 'hidden',
    borderRadius: 2,
    position: 'absolute',
    textAlign: 'center',
    lineHeight: 13,
    top: Platform.OS === 'ios' ? 2 : 0.5,
    paddingTop: Platform.OS === 'ios' ? 0 : 0.5,
  },
  shopTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    textAlign: 'justify',
  },
});
