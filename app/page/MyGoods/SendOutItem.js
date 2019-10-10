import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, Clipboard,
} from 'react-native';
import {
  FadeImage, Price, TitleWithTagTwo, Tag,
} from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';
import { showToast } from '../../utils/MutualUtil';
import Id from './component/Id';

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
            <TitleWithTagTwo text={goods_name} type={item.is_stock} />
            <View style={styles.middle}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                {item.buy_price && <Price price={item.buy_price} /> }
                {item.buy_price && <Tag style={{ marginLeft: 3, marginBottom: 1 }} text="买入价" />}
              </View>
              <Text style={{ fontSize: 12 }}>{`SIZE：${item.size}`}</Text>
            </View>
          </View>
          <Text onPress={this.copy} style={styles.yundanhao}>{`运单号：${item.express_id || '等待寄出'}`}</Text>
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
    marginTop: 8,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
});
