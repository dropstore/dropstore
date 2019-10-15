import React, { PureComponent } from 'react';
import { MyGoodsItemOnPress } from '../../utils/MutualUtil';
import ListItem from './component/ListItem';

export default class OnsaleItem extends PureComponent {
  onPress = (type) => {
    const {
      navigation, item, route, refresh,
    } = this.props;
    MyGoodsItemOnPress(type, route, navigation, item, refresh);
  }

  render() {
    const { item } = this.props;
    const btns = [
      { text: '改价', color: '#000', onPress: () => this.onPress('edit') },
      { text: '下架', color: '#A2A2A2', onPress: () => this.onPress('cancel') },
    ];

    return (
      <ListItem
        item={item}
        btns={btns}
        price={item.price}
        timePrefix="预计入库"
        timeText={item.is_stock === '2' ? item.storage_time : null}
      />
    );
  }
}
