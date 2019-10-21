import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import {
  Image, CountdownCom, ImageBackground, Price, BtnGroup, ScaleView,
} from '../../components';
import { YaHei, RuiXian } from '../../res/FontFamily';
import Colors from '../../res/Colors';
import { wPx2P } from '../../utils/ScreenUtil';
import { formatDate } from '../../utils/commonUtils';
import Styles from '../../res/style';

export default class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      text: ['3'].includes(item.type) ? '佣金已入账'
        : item.end_time <= Date.now() / 1000 ? '活动已结束'
          : item.pay_status == '1' ? '已购买' : null,
    };
  }

  finish = () => {
    this.setState({ text: '活动已结束' });
  }

  toPay = () => {
    const { item, navigation } = this.props;
    if (item.type === '7') {
      navigation.navigate('pay', {
        title: '选择支付账户',
        type: '1',
        payType: 'buyActivityGoods',
        payData: {
          order_id: item.order_id,
          price: item.order_price,
        },
        shopInfo: {
          goods: {
            image: item.goods_image,
            goods_name: item.goods_name,
          },
          order_id: item.order_id,
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
        title: '支付',
        order: item,
      });
    }
  }

  render() {
    const { item } = this.props;
    const { text } = this.state;
    const btns = [
      { onPress: this.toPay, text: ['1', '2', '7'].includes(item.type) ? '付款' : '查看详情' },
    ];
    const Wrapper = ['1', '2', '7', '8', '9'].includes(item.type) && !text ? ScaleView : View;
    return (
      <View>
        <Text style={styles.date}>{formatDate(item.add_time)}</Text>
        <Wrapper onPress={this.toPay} style={styles.container}>
          <View style={{ justifyContent: 'space-between', marginRight: 15 }}>
            <ImageBackground useFadeImage source={{ uri: item.image }} style={styles.shoe}>
              { item.type === '2' && <Image source={require('../../res/image/zhongqian.png')} style={styles.zhongqian} /> }
            </ImageBackground>
            { item.size ? <Text numberOfLines={1} style={styles.size}>{`SIZE: ${item.size}`}</Text> : null }
          </View>
          <View style={{ flex: 1, justifyContent: item.type !== '6' ? 'space-between' : 'center' }}>
            <Text style={Styles.listTitle}>{item.activity_name}</Text>
            {['1', '2', '7'].includes(item.type) && item.order_price && <Price price={item.order_price} /> }
            {

              ['1', '2'].includes(item.type) && !text && (
                <View style={styles.timeWrapper}>
                  <CountdownCom
                    finish={this.finish}
                    style={styles.time}
                    time={item.end_time}
                    prefix="待付款 "
                    prefixStyle={[styles.time, { color: Colors.RED }]}
                  />
                </View>
              )
            }
            { ['1', '2', '7', '8', '9'].includes(item.type) && !text && <BtnGroup btns={btns} />}
            { !!text && <Text style={styles.yongjin}>{text}</Text> }
          </View>
        </Wrapper>
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
  btn: {
    alignSelf: 'flex-end',
  },
  date: {
    color: '#B6B6B6',
    fontSize: 10,
    textAlign: 'center',
    marginVertical: 10,
  },
  shoe: {
    width: wPx2P(129 * 0.87),
    height: wPx2P(80 * 0.87),
    justifyContent: 'center',
    paddingLeft: wPx2P(17),
    paddingTop: wPx2P(12),
  },
  fukuan: {
    fontSize: 10,
    color: Colors.RED,
    fontFamily: YaHei,
  },
  time: {
    fontSize: 11,
    fontFamily: YaHei,
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
    width: wPx2P(129 * 0.87),
  },
  zhongqian: {
    width: 52,
    height: 52,
  },
  yongjin: {
    fontSize: 10,
    color: Colors.DISABLE,
    textAlign: 'right',
  },
});
