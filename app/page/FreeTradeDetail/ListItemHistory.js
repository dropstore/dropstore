import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AvatarWithShadow, Price, Image } from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';
import Images from '../../res/Images';
import { formatTimeAgo } from '../../utils/commonUtils';

export default class ListItem extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <AvatarWithShadow source={{ uri: item.avatar }} size={wPx2P(55)} />
        <View style={{ marginLeft: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <Text style={styles.name}>{item.user_name}</Text>
            <Image style={{ height: 12, width: 12, marginLeft: 5 }} source={item.sex === '2' ? Images.littleGirl : Images.littleBoy} />
          </View>
          <Text style={styles.time}>
            {'交易时间：'}
            <Text style={{ color: '#696969', fontSize: 11 }}>{formatTimeAgo(item.add_time)}</Text>
          </Text>
        </View>
        <View style={styles.right}>
          <Price price={item.order_price} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 9,
    marginTop: 7,
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
  name: {
    fontSize: 15,
  },
  time: {
    fontSize: 11,
  },
  right: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
  },
});
