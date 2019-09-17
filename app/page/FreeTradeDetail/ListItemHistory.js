import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, Platform,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { FadeImage, Price, Image } from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';
import Images from '../../res/Images';

class ListItem extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <FadeImage source={{ uri: item.goods.image }} style={styles.avatar} />
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <Text style={styles.name}>茶小音</Text>
            <Image style={{ height: 12, width: 12, marginLeft: 5 }} source={true ? Images.littleGirl : Images.littleBoy} />
          </View>
          <Text style={styles.time}>
            {'交易时间：'}
            <Text style={{ color: '#696969', fontSize: 11 }}>五分钟前</Text>
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
  imageWrapper: {
    marginRight: 12,
    height: wPx2P(55),
    width: wPx2P(55),
    borderRadius: wPx2P(27.5),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(166, 166, 166)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
      },
      android: {
        elevation: 100,
        position: 'relative',
      },
    }),
  },
  avatar: {
    overflow: 'hidden',
    borderRadius: 27.5,
    width: 55,
    height: 55,
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

export default withNavigation(ListItem);
