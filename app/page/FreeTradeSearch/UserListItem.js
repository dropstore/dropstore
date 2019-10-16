import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Price, Image, ScaleView, AvatarWithShadow, NameAndGender,
} from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';

export default class UserListItem extends PureComponent {
  onPress = () => {

  }

  render() {
    const { item } = this.props;
    return (
      <ScaleView style={styles.container} onPress={this.onPress}>
        <AvatarWithShadow source={{ uri: item.avatar }} size={wPx2P(55)} />
        <View style={{ marginLeft: 10, paddingTop: 5 }}>
          <NameAndGender name={item.user_name} sex={item.sex} />
          <Text style={styles.size}>{`SIZE: ${item.size}`}</Text>
        </View>
        <View style={styles.right}>
          <Image
            style={{ height: 13, width: 25 }}
            source={item.is_stock === '2' ? require('../../res/image/qihuo_icon.png') : require('../../res/image/qihuo_icon.png')}
          />
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
