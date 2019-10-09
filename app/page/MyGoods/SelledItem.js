import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  FadeImage, Price, TitleWithTagTwo, AvatarWithShadow,
} from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';
import { formatDate } from '../../utils/commonUtils';

export default class SelledItem extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <FadeImage source={{ uri: item.image }} style={styles.shoe} />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <TitleWithTagTwo text={item.goods_name} type={item.is_stock} />
            <Price price={item.order_price || item.price} />
          </View>
          <Text style={{ fontSize: 11, textAlign: 'right' }}>{formatDate(item.buy_time, 'MM/dd hh:mm:ss')}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <AvatarWithShadow source={{ uri: item.avatar }} size={27} />
            <Text style={styles.name}>{item.user_name}</Text>
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
