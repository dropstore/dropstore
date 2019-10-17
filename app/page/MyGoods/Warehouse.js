import React, { PureComponent } from 'react';
import { MyGoodsItemOnPress } from '../../utils/MutualUtil';
import ListItem from './component/ListItem';

export default class Warehouse extends PureComponent {
  onPress = (type) => {
    const {
      navigation, item, route, refresh,
    } = this.props;
    MyGoodsItemOnPress(type, route, navigation, item, refresh);
  }

  render() {
    const { item } = this.props;
    let btns = [];
    // 0尚未邮寄 1快递中 2鉴定中 3未通过鉴定 4鉴定通过 5正在出售
    if (item.goods_status === '1') {
      btns = [];
    } if (item.goods_status === '5') {
      btns = [
        { text: '改价', color: '#000', onPress: () => this.onPress('edit') },
        { text: '下架', color: '#A2A2A2', onPress: () => this.onPress('cancel') },
      ];
    } else if (item.goods_status === '4') {
      btns = [{ text: '上架', color: '#000', onPress: () => this.onPress('publish') }];
      if (item.is_stock === '1') {
        btns.push({ text: '提货', onPress: () => this.onPress('pickUp') });
      }
    } else if (item.goods_status === '0') {
      btns = [
        { text: '填写物流信息', color: '#000', onPress: () => this.onPress('express') },
      ];
    } else if (['3'].includes(item.goods_status)) {
      btns = [
        { text: '寄回', onPress: () => this.onPress('sendBack') },
      ];
    }
    return (
      <ListItem
        item={item}
        showSeal
        price={item.buy_price}
        priceTag="买入价"
        btns={btns}
        timePrefix={item.is_stock === '1' ? '入库时间' : '预计入库'}
        timeText={['4', '5'].includes(item.goods_status) ? (item.is_stock === '1' ? item.storage_time : item.add_time) : null}
      />
    );
  }
}
