import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { FadeImage, Price, BtnGroup } from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';
import { MyGoodsItemOnPress } from '../../utils/MutualUtil';
import TitleWithTag from './component/TitleWithTag';
import { YaHei } from '../../res/FontFamily';
import { formatDate } from '../../utils/commonUtils';

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
      { text: '改价', color: '#000', onPress: () => this.onPress('edit') },
      { text: '下架', color: '#A2A2A2', onPress: () => this.onPress('cancel') },
    ];
    console.log(item);
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: showNumber ? 'space-between' : 'center', marginRight: 15 }}>
          <FadeImage source={{ uri: image }} style={styles.shoe} />
          { showNumber && <Text style={styles.id}>{`编号: ${item.order_id}`}</Text> }
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <TitleWithTag text={goods_name} type={item.is_stock} />
          <View style={styles.middle}>
            <Price price={item.price} />
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Text style={{ fontSize: 11, color: '#858585' }}>预计入库</Text>
              <Text style={{ fontSize: 11, fontFamily: YaHei, marginLeft: 2 }}>
                {formatDate(item.add_time, 'yyyy-MM-dd')}
              </Text>
            </View>
          </View>
          <BtnGroup btns={btns} />
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
    marginBottom: 7,
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
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 5,
    minHeight: 35,
    marginBottom: 5,
  },
});
