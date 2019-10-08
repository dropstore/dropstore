import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  FadeImage, Price, TitleWithTagTwo, AvatarWithShadow,
} from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';

export default class SelledItem extends PureComponent {
  render() {
    const { item } = this.props;
    const image = (item.goods || item).image;
    const goods_name = (item.goods || item).goods_name;

    return (
      <View style={styles.container}>
        <FadeImage source={{ uri: image }} style={styles.shoe} />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <TitleWithTagTwo text={goods_name} type={item.is_stock} />
            <Price price={item.order_price || item.price} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <AvatarWithShadow source={{ uri: image }} size={27} />
            <Text style={styles.name}>sssssss</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 13,
    marginLeft: 5,
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginHorizontal: 9,
    marginTop: 7,
    flexDirection: 'row',
  },
  shoe: {
    width: wPx2P(113),
    height: wPx2P(65),
  },
  text: {
    color: '#fff',
    fontSize: 10,
  },
});
