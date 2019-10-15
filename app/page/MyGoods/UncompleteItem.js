import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import { CountdownCom } from '../../components';
import Colors from '../../res/Colors';
import { MyGoodsItemOnPress } from '../../utils/MutualUtil';
import { YaHei } from '../../res/FontFamily';
import ListItem from './component/ListItem';

export default class UncompleteItem extends PureComponent {
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
    const btns = [
      { text: '付款', onPress: () => this.onPress('pay') },
    ];
    return (
      <ListItem
        item={item}
        showSeal
        price={item.order_price}
        priceTag="买入价"
        btns={btns}
        CountdownCom={(
          <CountdownCom
            finish={this.finish}
            style={styles.time}
            time={item.end_time}
            prefix="待付款 "
            prefixStyle={[styles.time, { color: Colors.RED }]}
          />
        )}
        Hint={<Text style={styles.cuoguo}>{text || '请在规定时间内完成支付，错过将失去购买资格'}</Text>}
        timePrefix={item.is_stock === '1' ? '入库时间' : '预计入库'}
        timeText={['4', '5'].includes(item.goods_status) ? (item.is_stock === '1' ? item.storage_time : item.add_time) : null}
      />
    );
  }
}

const styles = StyleSheet.create({
  time: {
    fontSize: 11,
    fontFamily: YaHei,
  },
  cuoguo: {
    color: '#858585',
    fontSize: 10,
    letterSpacing: -0.2,
  },
});
