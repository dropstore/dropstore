import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FadeImage from '../FadeImage';
import ScaleView from '../ScaleView';
import Price from '../Price';
import { getScreenWidth } from '../../common/Constant';
import { wPx2P } from '../../utils/ScreenUtil';

export default class ListItem extends PureComponent {
  onPress = () => {
    const { item, onPress } = this.props;
    onPress(item);
  }

  render() {
    const { item, notShowCount, showPrice } = this.props;
    return (
      <ScaleView onPress={this.onPress} style={styles.container}>
        <Text numberOfLines={2} style={{ fontSize: 12, textAlign: 'justify' }}>{item.goods_name}</Text>
        <FadeImage source={{ uri: item.image }} style={styles.shoe} />
        {
          showPrice && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              {
              item.price > 0 ? (
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Price offsetBottom={2} price={item.price} />
                  <Text style={{
                    fontSize: 9, color: '#C20000', marginLeft: 3, fontWeight: '500',
                  }}
                  >
                    {'起'}
                  </Text>
                </View>
              ) : <Text style={{ fontSize: 11, color: '#666' }}>暂无报价</Text>
            }
              {
              !notShowCount && <Text style={{ fontSize: 11 }}>{`${item.buy_num}人已购买`}</Text>
            }
            </View>
          )
        }
      </ScaleView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginRight: 8,
    marginTop: 7,
    width: (getScreenWidth() - 27) / 2,
    borderRadius: 2,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  shoe: {
    width: wPx2P(113),
    height: wPx2P(65),
    alignSelf: 'center',
    marginVertical: 10,
  },
});
