import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  FadeImage, CountdownCom, Price, BtnGroup,
} from '../../components';
import Colors from '../../res/Colors';
import { wPx2P } from '../../utils/ScreenUtil';
import { MyGoodsItemOnPress } from '../../utils/MutualUtil';
import Id from './component/Id';
import TitleWithTag from './component/TitleWithTag';
import { YaHei } from '../../res/FontFamily';

export default class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    const { item, type } = this.props;
    this.state = {
      text: item.end_time <= Date.now() / 1000 && type === 'uncomplete' ? '付款已超时' : null,
    };
  }

  onPress = (type) => {
    const {
      navigation, item, route, refresh,
    } = this.props;
    MyGoodsItemOnPress(type, route, navigation, item, refresh);
  }

  finish = () => {
    this.setState({ text: '付款已超时' });
  }

  render() {
    const { item } = this.props;
    const { text } = this.state;
    const image = (item.goods || item).image;
    const goods_name = (item.goods || item).goods_name;
    const btns = [
      { text: '付款', onPress: () => this.onPress('pay') },
    ];

    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'space-between', marginRight: 15 }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <FadeImage source={{ uri: image }} style={styles.shoe} />
          </View>
          <Id id={item.order_id} />
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <TitleWithTag text={goods_name} type={item.is_stock} />
            <View style={styles.middle}>
              <Price price={item.order_price} />
              <CountdownCom
                finish={this.finish}
                style={styles.time}
                time={item.end_time}
                prefix="待付款 "
                prefixStyle={[styles.time, { color: Colors.RED }]}
              />
            </View>
          </View>
          <Text style={styles.cuoguo}>{text || '请在规定时间内完成支付，错过将失去购买资格'}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
            <Text style={{ fontSize: 11, color: '#333' }}>{`SIZE：${item.size}`}</Text>
            { !text && <BtnGroup btns={btns} /> }
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
    marginBottom: 7,
    flexDirection: 'row',
    height: 110,
  },
  time: {
    fontSize: 11,
    fontFamily: YaHei,
  },
  tag: {
    width: wPx2P(74),
    height: wPx2P(74),
    position: 'absolute',
    left: wPx2P(15),
  },
  shoe: {
    width: wPx2P(113),
    height: wPx2P(65),
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 5,
  },
  btn: {
    width: 53,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    backgroundColor: '#EF4444',
    marginTop: 3,
  },
  text: {
    color: '#fff',
    fontSize: 10,
  },
  cuoguo: {
    color: '#858585',
    fontSize: 10,
    marginTop: 2,
    letterSpacing: -0.2,
    textAlign: 'right',
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
});
