import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Image, CountdownCom, ImageBackground } from '../../components';
import { YaHei } from '../../res/FontFamily';
import Colors from '../../res/Colors';
import { wPx2P } from '../../utils/ScreenUtil';
import TitleWithTag from './TitleWithTag';
import { formatDate } from '../../utils/commonUtils';

class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      text: item.type === '3' ? '佣金已入账'
        : item.pay_status == '1' ? '已完成'
          : item.end_time <= Date.now() / 1000 ? '超时' : null,
    };
  }

  finish = () => {
    this.setState({ text: '超时' });
  }

  toPay = () => {
    const { item, navigation } = this.props;
    if (item.type === '1') {
      navigation.navigate('pay', {
        title: '选择支付账户',
        type: '1',
        payData: {
          order_id: item.order_id,
          price: item.order_price,
        },
      });
    } else if (['8', '9'].includes(item.type)) {
      navigation.navigate('shopDetail', {
        title: '商品详情',
        rate: '+25',
        shopId: item.activity_id,
        type: item.b_type,
      });
    } else {
      navigation.navigate('RestPay', {
        title: '尾款支付',
        order: item,
      });
    }
  }

  render() {
    const { item } = this.props;
    const { text } = this.state;
    return (
      <View>
        <Text style={styles.date}>{formatDate(item.add_time, '/')}</Text>
        <View style={styles.container}>
          <View style={{ justifyContent: 'space-between', marginRight: 15 }}>
            <ImageBackground useFadeImage source={{ uri: item.image }} style={styles.shoe}>
              { item.type === '2' && <Image source={require('../../res/image/zhongqian.png')} style={styles.zhongqian} /> }
            </ImageBackground>
            { item.size ? <Text numberOfLines={1} style={styles.size}>{`SIZE: ${item.size}`}</Text> : null }
          </View>
          <View style={{ flex: 1, justifyContent: item.type !== '6' ? 'space-between' : 'center' }}>
            <TitleWithTag text={item.activity_name} type={item.type} />
            {

              ['1', '2'].includes(item.type) && !text && (
                <View style={styles.timeWrapper}>
                  <Text style={styles.time}>待付款</Text>
                  <CountdownCom
                    finish={this.finish}
                    style={{ ...styles.time, width: 55 }}
                    time={item.end_time}
                  />
                </View>
              )
            }
            {
              ['1', '2', '8', '9'].includes(item.type) && !text && (
                <TouchableOpacity onPress={this.toPay} style={styles.btn}>
                  <Text style={styles.fukuan}>
                    {['1', '2'].includes(item.type) ? '付款' : '查看详情'}
                  </Text>
                </TouchableOpacity>
              )
            }
            { !!text && <Text style={styles.yongjin}>{text}</Text> }
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
    flexDirection: 'row',
  },
  date: {
    color: '#B6B6B6',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 2,
  },
  shoe: {
    width: wPx2P(113),
    height: wPx2P(65),
    justifyContent: 'center',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    marginLeft: 9,
    backgroundColor: '#EF4444',
    width: 115,
    height: 25,
    alignSelf: 'flex-end',
  },
  fukuan: {
    fontSize: 10,
    color: '#fff',
    fontFamily: YaHei,
  },
  time: {
    fontSize: 11,
    color: Colors.OTHER_BACK,
  },
  timeWrapper: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
    alignItems: 'center',
  },
  size: {
    fontSize: 12,
    marginTop: 3,
    width: wPx2P(113),
  },
  zhongqian: {
    width: 74,
    height: 74,
    marginLeft: 3,
  },
  yongjin: {
    fontSize: 12,
    color: Colors.OTHER_BACK,
    textAlign: 'right',
  },
});

export default withNavigation(ListItem);
