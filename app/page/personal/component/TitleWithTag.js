import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, Platform,
} from 'react-native';
import { YaHei } from '../../../res/FontFamily';

export default class TitleWithTag extends PureComponent {
  render() {
    const { text, type } = this.props;
    // 1期货 2现货（已鉴定或从平台购买的） 2发布（未填写物流）3发布（已填写物流及鉴定中） 4鉴定（未通过）
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.tagText, {
          backgroundColor: type === 1 ? '#B4DE2A' : [3, 4, 5].includes(type) ? '#EF4444' : '#FFA700',
        }]}
        >
          {type === 1 ? '期货 ' : [3, 4, 5].includes(type) ? '发布' : '现货'}
        </Text>
        <Text style={styles.shopTitle}>
&emsp;&emsp;&nbsp;
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
    width: 21,
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
