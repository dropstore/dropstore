import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  FadeImage, CountdownCom, TitleWithTagTwo,
} from '../../components';
import Colors from '../../res/Colors';
import { wPx2P } from '../../utils/ScreenUtil';
import { MyGoodsItemOnPress } from '../../utils/MutualUtil';
import Id from './component/Id';

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

    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'space-between', marginRight: 15 }}>
          <FadeImage source={{ uri: image }} style={styles.shoe} />
          <Id id={item.order_id} />
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <TitleWithTagTwo text={goods_name} type={item.is_stock} />
            <View style={styles.middle}>
              <View style={styles.timeWrapper}>
                <Text style={{ fontSize: 12 }}>{`SIZE：${item.size}`}</Text>
                <CountdownCom
                  finish={this.finish}
                  style={styles.time}
                  time={item.end_time}
                  prefix="待付款"
                  prefixStyle={styles.time}
                />
              </View>
            </View>
          </View>
          <Text style={styles.cuoguo}>{text || '请在规定时间内完成支付，错过将失去购买资格'}</Text>
          {
            !text && (
              <TouchableOpacity onPress={() => this.onPress('pay')} style={styles.btn}>
                <Text style={styles.text}>付款</Text>
              </TouchableOpacity>
            )
          }
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
    color: Colors.OTHER_BACK,
    fontSize: 10,
    marginTop: 2,
    letterSpacing: -0.2,
    textAlign: 'right',
  },
  time: {
    fontSize: 11,
    color: Colors.OTHER_BACK,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
});
