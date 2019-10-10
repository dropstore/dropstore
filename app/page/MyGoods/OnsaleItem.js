import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  FadeImage, Price, TitleWithTagTwo,
} from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';
import { MyGoodsItemOnPress } from '../../utils/MutualUtil';

export default class ListItem extends PureComponent {
  onPress = (type) => {
    const {
      navigation, item, route, refresh,
    } = this.props;
    MyGoodsItemOnPress(type, route, navigation, item, refresh);
  }

  render() {
    const { item } = this.props;
    const image = (item.goods || item).image;
    const goods_name = (item.goods || item).goods_name;
    const showNumber = !!item.order_id;
    const btns = [
      { title: '编辑', backgroundColor: '#FFA700', key: 'edit' },
      { title: '取消', backgroundColor: '#EF4444', key: 'cancel' },
    ];

    return (
      <View style={styles.container}>
        <View style={{ justifyContent: showNumber ? 'space-between' : 'center', marginRight: 15 }}>
          <FadeImage source={{ uri: image }} style={styles.shoe} />
          { showNumber && <Text style={styles.id}>{`编号: ${item.order_id}`}</Text> }
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <TitleWithTagTwo text={goods_name} type={item.is_stock} />
          <Price price={item.price} />
          <View style={[styles.btnGroup, { marginTop: 9 }]}>
            {
              btns.map(v => (
                <TouchableOpacity key={v.key} onPress={() => this.onPress(v.key)} style={[styles.btn, { backgroundColor: v.backgroundColor }]}>
                  <Text style={styles.text}>{v.title}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  id: {
    fontSize: 8,
    marginTop: 15,
    letterSpacing: -0.1,
  },
  btnGroup: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    width: 115,
    height: 25,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    marginLeft: 9,
  },
  text: {
    color: '#fff',
    fontSize: 10,
  },
});
