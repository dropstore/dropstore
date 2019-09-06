import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Image from './Image';
import Images from '../res/Images';
import { BlackItalic } from '../res/FontFamily';

export default class Price extends PureComponent {
  render() {
    const { price, offsetBottom } = this.props;
    return (
      <View style={{
        flexDirection: 'row', alignItems: 'flex-end', position: 'relative', bottom: offsetBottom || 2,
      }}
      >
        <Text style={styles.bigPrice}>{`${price[0]}`}</Text>
        <Text style={styles.price}>{`${price.slice(1) / 100}`}</Text>
        <Image resizeMode="contain" style={styles.priceImage} source={Images.price} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigPrice: {
    fontSize: 25,
    fontFamily: BlackItalic,
    color: '#C20000',
    position: 'relative',
    bottom: -5.5,
  },
  price: {
    fontSize: 14,
    fontFamily: BlackItalic,
    color: '#C20000',
    position: 'relative',
    bottom: -3.2,
  },
  priceImage: {
    height: 10,
    width: 10,
    marginLeft: 1,
  },
});
