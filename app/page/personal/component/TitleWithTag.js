import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { YaHei } from '../../../res/FontFamily';

export default class Address extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.tagText, {
          backgroundColor: item.type === 0 ? '#B4DE2A' : [2, 3, 4].includes(item.type) ? '#EF4444' : '#FFA700',
        }]}
        >
          {item.type === 0 ? '期货 ' : [2, 3, 4].includes(item.type) ? '发布 ' : '现货 '}
        </Text>
        <Text style={styles.shopTitle}>
&emsp;&emsp;
          {item.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagText: {
    color: '#fff',
    fontSize: 10.5,
    height: 13,
    width: 23.5,
    overflow: 'hidden',
    borderRadius: 2,
    top: 2,
    position: 'absolute',
    textAlign: 'center',
    lineHeight: 13.5,
  },
  shopTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    textAlign: 'justify',
  },
});
