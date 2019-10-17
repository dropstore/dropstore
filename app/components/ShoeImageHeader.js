import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Image from './Image';
import Price from './Price';
import { wPx2P } from '../utils/ScreenUtil';
import { RuiXian } from '../res/FontFamily';

type Props = {
  item: Number,
  showSize?: Boolean,
  showPrice?: Boolean
};

export default class ShoeImageHeader extends PureComponent<Props> {
  static defaultProps = {
    showSize: null,
    showPrice: true,
  }

  render() {
    const { item, showSize, showPrice } = this.props;
    return (
      <View style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Text style={styles.title}>{item.goods_name}</Text>
          <View style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 11, color: '#333' }}>{showSize ? `SIZE：${item.size}` : ''}</Text>
            {
              showPrice ? (item.price * 1 > 0 ? <Price price={item.price} /> : <Text style={{ fontSize: 12, color: '#666' }}>暂无报价</Text>) : null
            }
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
    height: wPx2P(93),
    width: wPx2P(150),
    marginRight: 10,
  },
  title: {
    textAlign: 'justify',
    fontFamily: RuiXian,
    fontSize: 15,
    lineHeight: 16,
  },
});
