import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { YaHei } from '../../res/FontFamily';

export default class TitleWithTag extends PureComponent {
  render() {
    const { text, type } = this.props;
    // 1期货 2现货（已鉴定或从平台购买的） 2发布（未填写物流）3发布（已填写物流及鉴定中） 4鉴定（未通过）
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.tagText, {
          backgroundColor: type === '6' ? '#bbb' : '#FFA700',
          width: type === '6' ? 31 : 39,
        }]}
        >
          {type === '6' ? '未中签' : 'Drop 购'}
        </Text>
        {
          type === '6' ? (
            <Text style={styles.shopTitle}>
&emsp;&emsp;&emsp;&nbsp;
              {text}
            </Text>
          ) : (
            <Text style={styles.shopTitle}>
&emsp;&emsp;&emsp;&emsp;&nbsp;
              {text}
            </Text>
          )
        }
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
    top: 2,
  },
  shopTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    textAlign: 'justify',
  },
});
