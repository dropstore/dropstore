import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Price, Image, TitleWithTagTwo, ScaleView, AvatarWithShadow,
} from '../../components';
import Images from '../../res/Images';
import { wPx2P } from '../../utils/ScreenUtil';

export default class ListItem extends PureComponent {
  onPress = () => {
    const { navigation, item, goods } = this.props;
    navigation.navigate('FreeTradeBuy', {
      title: '购买',
      item,
      goods,
    });
  }

  render() {
    const { item } = this.props;
    return (
      <ScaleView style={styles.container} onPress={this.onPress}>
        <AvatarWithShadow source={{ uri: item.avatar }} size={wPx2P(55)} />
        <View style={{ marginLeft: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <Text style={styles.name}>{item.user_name}</Text>
            <Image style={{ height: 12, width: 12, marginLeft: 5 }} source={item.sex === '2' ? Images.littleGirl : Images.littleBoy} />
          </View>
          <Text style={styles.size}>{`SIZE: ${item.size}`}</Text>
        </View>
        <View style={styles.right}>
          <TitleWithTagTwo text="" type={item.is_stock} />
          <Price price={item.price} />
        </View>
      </ScaleView>
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
  size: {
    fontSize: 11,
  },
  right: {
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-end',
  },
});
