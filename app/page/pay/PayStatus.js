import React, { PureComponent } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { BottomBtnGroup, CountdownCom } from '../../components';
import Image from '../../components/Image';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';
import ShopConstant from '../../common/ShopConstant';
import { debounce } from '../../utils/commonUtils';
import { showShare } from '../../utils/MutualUtil';
import { hPx2P, wPx2P } from '../../utils/ScreenUtil';
import { STATUSBAR_HEIGHT } from '../../common/Constant';

class PayStatus extends PureComponent {
  showShare = () => {
    const { navigation } = this.props;
    const shopInfo = navigation.getParam('shopInfo');
    const is_join = shopInfo.is_join;
    const aId = shopInfo.activity?.id;
    const uAId = shopInfo.user_activity?.id;
    const uId = shopInfo.user_activity?.user_id;
    const title = shopInfo.goods.goods_name;
    const image = shopInfo.goods.image;
    // commission支付佣金 buyGoods购买商品 buyActivityGoods 购买活动商品 postage支付邮费 service支付服务费 management库管费
    const payType = navigation.getParam('payType');
    const baseUrl = {
      buyActivityGoods: ShopConstant.SHARE_BYU_SUCCESS_URL,
      commission: is_join === ShopConstant.NOT_JOIN ? ShopConstant.SHARE_BASE_URL_BUYED : ShopConstant.SHARE_BASE_URL,
    }[payType];
    const url = {
      buyActivityGoods: `${baseUrl}?id=${shopInfo.order_id}`,
      commission: `${baseUrl}?id=${aId}&u_a_id=${uAId}&activity_id=${aId}&inviter=${uId}`,
    }[payType];
    showShare({
      text: ShopConstant.SHARE_TEXT,
      img: image,
      url,
      title,
    }).then(() => {
      // 分享成功回调
    });
  };

  confirm = () => {
    const { navigation } = this.props;
    const type = navigation.getParam('type');
    const PayStatus = navigation.getParam('PayStatus');
    // 支付佣金无论成功失败都回详情界面
    if (type === ShopConstant.PAY_COMMISSION) {
      navigation.navigate('shopDetail');
    } else {
      const type = PayStatus ? 'PayStatus' : 'uncomplete';
      navigation.navigate({ routeName: 'BottomNavigator', params: { index: 4 } });
      navigation.navigate({ routeName: 'MyGoods', params: { type } });
    }
  };

  render() {
    const { navigation } = this.props;
    const shopInfo = navigation.getParam('shopInfo');
    // commission支付佣金 buyGoods购买商品 buyActivityGoods 购买活动商品 postage支付邮费 service支付服务费 management库管费
    const payType = navigation.getParam('payType');
    const PayStatus = navigation.getParam('PayStatus');
    const btns = [{ text: '确定', onPress: debounce(this.confirm) }];
    if (PayStatus && ['commission', 'buyActivityGoods'].includes(payType)) {
      btns.unshift({ text: '分享', onPress: debounce(this.showShare) });
    }

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false} alwaysBounceVertical={false}>
          <View style={styles.mainView}>
            <Image style={{ width: wPx2P(250), height: wPx2P(100) }} source={PayStatus ? Images.zf_cg : Images.zf_sb} />
            <Image style={{ width: wPx2P(200), height: wPx2P(200) }} source={Images.got_em} />
            <Image style={styles.goodImage} source={{ uri: shopInfo.goods.image }} />
            {
              PayStatus && payType === 'commission' && (
                <CountdownCom
                  style={styles.time}
                  time={shopInfo.activity.end_time}
                  prefix="距活动结束："
                  prefixStyle={[styles.time, { color: Colors.RED }]}
                />
              )
            }
            <Text style={styles.shopName}>{shopInfo.goods.goods_name}</Text>
          </View>
        </ScrollView>
        <BottomBtnGroup btns={btns} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hPx2P(30 + STATUSBAR_HEIGHT),
    paddingBottom: hPx2P(20),
    justifyContent: 'space-between',
  },
  waitLeft: {
    fontSize: 16,
    fontFamily: YaHei,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,1)',
  },
  time: {
    fontSize: 18,
    fontFamily: YaHei,
    color: 'rgba(0,0,0,1)',
  },
  shopName: {
    justifyContent: 'center',
    fontSize: 17,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    fontWeight: '400',
    marginTop: 17,
    marginHorizontal: 20,
  },
  goodImage: {
    width: 294,
    height: 155,
  },
});
export default PayStatus;
