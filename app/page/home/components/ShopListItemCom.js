/**
 * @file 商品列表组件
 * @date 2019/8/17 19:38
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, View, Platform,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  ScaleView, Image, CountdownCom, Price,
} from '../../../components';
import { debounce } from '../../../utils/commonUtils';
import { wPx2P } from '../../../utils/ScreenUtil';
import Colors from '../../../res/Colors';
import Images from '../../../res/Images';
import { Aldrich, YaHei } from '../../../res/FontFamily';
import { MARGIN_HORIZONTAL } from '../../../common/Constant';
import TitleWithTag from './TitleWithTag';

class ShopListItemCom extends PureComponent {
  toShopDetailPage = () => {
    const { navigation, item } = this.props;
    navigation.navigate('shopDetail', {
      title: '商品详情',
      rate: '+25',
      shopId: item.id,
      type: item.type,
    });
  };

  finish = () => {

  }

  render() {
    const { item } = this.props;
    return (
      <ScaleView style={styles.scaleView} onPress={debounce(this.toShopDetailPage)}>
        <Image resizeMode="contain" style={styles.imageShoe} source={{ uri: item.image }} />
        <View style={styles.right}>
          <TitleWithTag text={item.activity_name} type={item.b_type} />
          <View style={styles.rightBottom}>
            <Price price={item.price} offsetBottom={3} />
            <Text style={styles.xiegang}>/</Text>
            <CountdownCom finish={this.finish} style={styles.time} time={item.end_time !== '0' ? item.end_time : item.start_time} />
          </View>
        </View>
      </ScaleView>
    );
  }
}

const styles = StyleSheet.create({
  rightBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  scaleView: {
    marginHorizontal: MARGIN_HORIZONTAL,
    backgroundColor: Colors.WHITE_COLOR,
    flexDirection: 'row',
    marginTop: 7,
    padding: 10,
    paddingBottom: 7,
    borderRadius: 2,
    overflow: 'hidden',
    alignItems: 'center',
  },
  time: {
    fontFamily: Aldrich,
    fontSize: 14,
    textAlign: 'right',
  },
  right: {
    flex: 1,
  },
  shopTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    textAlign: 'justify',
  },
  imageShoe: {
    width: wPx2P(113),
    height: wPx2P(65),
    marginRight: 15,
  },
  xiegang: {
    marginLeft: 5,
    fontSize: Platform.OS === 'ios' ? 10 : 11,
    lineHeight: 17,
    fontWeight: 'bold',
  },
});

export default withNavigation(ShopListItemCom);
