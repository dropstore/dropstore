/**
 * @file 锦鲤列表item
 * @date 2019/9/6
 * @author YDD
 */
import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, View, Platform,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { debounce } from '../../../utils/commonUtils';
import {
  ScaleView, Image, CountdownCom, Price,
} from '../../../components';
import { MARGIN_HORIZONTAL } from '../../../common/Constant';

class LuckyItem extends PureComponent {
  toLuckDetailPage = () => {
    const { navigation, item } = this.props;
    navigation.navigate('luckDetail', {
      title: '商品详情',
      rate: '+25',
      shopId: item.id,
      type: item.type,
    });
  }

  render() {
    const { item } = this.props;
    return (
      <ScaleView
        style={styles.scaleView}
        onPress={debounce(this.toLuckDetailPage)}
      >
        <Image
          resizeMode="cover"
          style={styles.imageShoe}
          source={{ uri: item.img }}
        />
      </ScaleView>
    );
  }
}
const styles = StyleSheet.create({
  scaleView: {
    marginHorizontal: MARGIN_HORIZONTAL,
    marginTop: 10,
    borderRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
  },
  imageShoe: {
    width: 359,
    height: 150,
  },
});
export default withNavigation(LuckyItem);
