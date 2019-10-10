import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image, Price } from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';

export default class Header extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Text style={styles.title}>{item.goods_name}</Text>
          <View style={{ alignItems: 'flex-end' }}>
            {item.price * 1 > 0 ? <Price price={item.price} /> : <Text style={{ fontSize: 12, color: '#666' }}>暂无报价</Text>}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 9,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: 8,
    flexDirection: 'row',
    padding: 12,
  },
  image: {
    height: wPx2P(97),
    width: wPx2P(166),
    marginRight: 10,
  },
  title: {
    fontSize: 12,
    textAlign: 'justify',
  },
});
