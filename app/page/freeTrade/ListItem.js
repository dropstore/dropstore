import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { FadeImage, Price, ScaleView } from '../../components';
import { SCREEN_WIDTH } from '../../common/Constant';
import { wPx2P } from '../../utils/ScreenUtil';

class ListItem extends PureComponent {
  onPress = () => {
    const { navigation, item } = this.props;
    navigation.navigate('FreeTradeDetail', {
      title: '商品详情',
      item,
    });
  }

  render() {
    const { item } = this.props;
    return (
      <ScaleView onPress={this.onPress} style={styles.container}>
        <Text numberOfLines={3} style={{ fontSize: 12, textAlign: 'justify' }}>{item.goods_name}</Text>
        <FadeImage source={{ uri: item.image }} style={styles.shoe} />
        {/* <TitleWithTagTwo numberOfLines={3} text={item.goods.goods_name} type={item.is_stock} /> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Price price={item.price} />
          <Text style={{ fontSize: 11 }}>{`${item.buy_num} 库存`}</Text>
        </View>
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
    width: (SCREEN_WIDTH - 27) / 2,
    borderRadius: 2,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  shoe: {
    width: wPx2P(113),
    height: wPx2P(65),
    alignSelf: 'center',
  },
});

export default withNavigation(ListItem);
