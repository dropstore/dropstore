import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, Clipboard,
} from 'react-native';
import {
  FadeImage, Price, Tag,
} from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';
import { showToast } from '../../utils/MutualUtil';
import Id from './component/Id';
import TitleWithTag from './component/TitleWithTag';
import { formatDate } from '../../utils/commonUtils';
import { YaHei } from '../../res/FontFamily';

export default class ListItem extends PureComponent {
  copy = () => {
    const { item } = this.props;
    Clipboard.setString(item.yundanhao);
    showToast('运单号已复制');
  }

  render() {
    const { item } = this.props;
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
            <TitleWithTag text={goods_name} type={item.is_stock} />
            <View style={styles.middle}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                {item.buy_price && <Price price={item.buy_price} /> }
                {item.buy_price && <Tag style={{ marginLeft: 3, marginBottom: 1 }} text="买入价" />}
              </View>
              <View style={{ flexDirection: 'row', marginTop: 2 }}>
                <Text style={{ fontSize: 11, color: '#858585' }}>出库时间</Text>
                <Text style={{ fontSize: 11, fontFamily: YaHei, marginLeft: 2 }}>
                  {formatDate(item.out_stock_time, 'yyyy-MM-dd')}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Text style={{ fontSize: 11, color: '#333' }}>{`SIZE：${item.size}`}</Text>
            {
              item.express_id ? <Text onPress={this.copy} style={[styles.yundanhao, { textDecorationLine: 'underline' }]}>{`运单号：${item.express_id}`}</Text>
                : <Text onPress={this.copy} style={[styles.yundanhao, { color: '#858585' }]}>等待寄出</Text>
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
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 5,
  },
  text: {
    color: '#fff',
    fontSize: 10,
  },
  yundanhao: {
    color: '#0A8CCF',
    fontSize: 10,
    textAlign: 'right',
  },
});
