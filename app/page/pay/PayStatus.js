import React, { PureComponent } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { BottomBtnGroup, CountdownCom, FadeImage } from '../../components';
import Image from '../../components/Image';
import Colors from '../../res/Colors';
import { YaHei, RuiXian } from '../../res/FontFamily';
import ShopConstant from '../../common/ShopConstant';
import { debounce } from '../../utils/commonUtils';
import { showShare } from '../../utils/MutualUtil';
import { hPx2P, wPx2P } from '../../utils/ScreenUtil';
import { STATUSBAR_HEIGHT } from '../../common/Constant';

const ShopInfo = {
  goods: {
    image: '',
    goods_name: '',
  },
  activity: {
    b_type: '1',
  },
};

class PayStatus extends PureComponent {
  showShare = () => {
    const { navigation } = this.props;
    const shopInfo = navigation.getParam('shopInfo');
    const is_join = shopInfo.is_join;
    const aId = shopInfo.activity?.id;
    const uAId = shopInfo.user_activity?.id;
    const uId = shopInfo.user_activity?.user_id;
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
      img: shopInfo.goods.image,
      url,
      title: shopInfo.goods.goods_name,
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

  toFreeTrade = () => {
    const { navigation } = this.props;
    navigation.navigate({ routeName: 'BottomNavigator', params: { index: 0 } });
  }

  toKufang = () => {
    const { navigation } = this.props;
    navigation.push('MyGoods', {
      title: '我的库房',
      type: 'warehouse',
    });
  }

  render() {
    const { navigation } = this.props;
    const shopInfo = navigation.getParam('shopInfo') || ShopInfo;
    // commission支付佣金 buyGoods购买商品 buyActivityGoods 购买活动商品 postage支付邮费 service支付服务费 management库管费
    const payType = navigation.getParam('payType') || 'buyActivityGoods';
    const PayStatus = navigation.getParam('PayStatus');
    const btns = [{ text: '确定', onPress: debounce(this.confirm) }];
    if (PayStatus && payType === 'commission') {
      btns.unshift({ text: '邀请助攻', onPress: debounce(this.showShare) });
    } else if (PayStatus && payType === 'buyActivityGoods') {
      btns.unshift({ text: '分享', onPress: debounce(this.showShare) });
    }

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', paddingTop: 10 }} showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center' }}>
            <FadeImage style={styles.goodImage} source={{ uri: shopInfo.goods.image }} />
            <Image style={styles.icon} source={require('../../res/image/chaofan_hui.png')} />
            <Text style={styles.shopName}>{shopInfo.goods.goods_name}</Text>
            <View style={styles.hengxian} />
            <Text style={[styles.status, { color: PayStatus ? '#FFA700' : '#909090' }]}>{PayStatus ? '支付成功!' : '支付失败!'}</Text>
            {
              PayStatus && payType === 'commission' && (
                <CountdownCom
                  time={shopInfo.activity.end_time}
                  style={styles.time}
                  prefix="距活动结束 "
                  prefixStyle={[styles.time, { color: '#727272' }]}
                />
              )
            }
            {
              payType === 'commission' && shopInfo?.activity?.b_type && (
                <Text style={styles.share} onPress={this.showShare}>
                  {'赶快'}
                  <Text style={{ color: '#0097C2', fontSize: 13 }}>分享</Text>
                  {'活动链接给好友吧，'}
                  {shopInfo.activity.b_type === '1'
                    ? '每位好友的加入都能多一只签' : '邀请好友来帮我抢购买资格'}
                </Text>
              )
            }
            {
              ['buyActivityGoods', 'buyGoods'].includes(payType) && (
                <Text style={styles.share} onPress={this.showShare}>
                  {'商品购买成功，可在'}
                  <Text onPress={this.toKufang} style={{ color: '#0097C2', fontSize: 13 }}>我的库房</Text>
                  {'中提货或者发布到'}
                  <Text onPress={this.toFreeTrade} style={{ color: '#0097C2', fontSize: 13 }}>自由交易区</Text>
                </Text>
              )
            }
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
  hengxian: {
    backgroundColor: '#E2E2E2',
    height: StyleSheet.hairlineWidth,
    width: wPx2P(345),
    marginVertical: 10,
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
  share: {
    fontSize: 13,
    color: '#696969',
    marginTop: 20,
    marginHorizontal: 15,
  },
  time: {
    fontFamily: YaHei,
    color: Colors.YELLOW,
  },
  goodImage: {
    width: wPx2P(258),
    height: wPx2P(160),
    marginBottom: 10,
  },
  shopName: {
    justifyContent: 'center',
    fontSize: 13,
    fontFamily: RuiXian,
    marginHorizontal: 17,
    textAlign: 'justify',
  },
  status: {
    fontSize: 20,
    fontFamily: YaHei,
    marginBottom: 5,
  },
  icon: {
    width: wPx2P(47),
    height: wPx2P(47),
    position: 'absolute',
    right: 20,
    top: 15,
  },
});
export default PayStatus;
