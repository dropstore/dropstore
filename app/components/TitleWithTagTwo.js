import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { YaHei } from '../res/FontFamily';

export default class TitleWithTagTwo extends PureComponent {
  render() {
    const { text, type } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.tagText, {
          backgroundColor: type === '1' ? '#FFA700' : ['3', '4', '5'].includes(type) ? '#EF4444' : '#B4DE2A',
        }]}
        >
          {type === '1' ? '现货' : ['3', '4', '5'].includes(type) ? '发布' : '期货'}
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
    top: 2,
  },
  shopTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    textAlign: 'justify',
  },
});
