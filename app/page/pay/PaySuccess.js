/* eslint-disable react/no-array-index-key */
// 支付成功页面，支付失败直接在支付页显示弹窗，不跳转到该页面
import React, { PureComponent } from 'react';
import {
  ScrollView, StyleSheet, Text, View, TouchableOpacity, Clipboard,
} from 'react-native';
import { BottomBtnGroup, CountdownCom, FadeImage } from '../../components';
import Image from '../../components/Image';
import Colors from '../../res/Colors';
import { YaHei, RuiXian } from '../../res/FontFamily';
import ShopConstant from '../../common/ShopConstant';
import { debounce } from '../../utils/commonUtils';
import { showShare, showToast } from '../../utils/MutualUtil';
import { hPx2P, wPx2P } from '../../utils/ScreenUtil';
import { STATUSBAR_HEIGHT } from '../../common/Constant';

const TestShopInfo = {};
// const TestShopInfo = {
//   goods: {
//     image: 'http://image.dropstore.cn/tower/goods/image/5da4222a0ff4a433907.jpg?x-oss-process=image/resize,m_lfit,w_197',
//     goods_name: 'Air Jordan 2 BHM黑人月 2019 现货原价购',
//   },
//   activity: {
//     b_type: '1',
//     end_time: Date.now() / 1000 + 5000,
//   },
//   user_activity: {
//     commission: 1,
//   },
//   is_join: true,
// };
// commission支付佣金 buyGoods购买商品 buyActivityGoods 购买活动商品 postage支付邮费 service支付服务费 management库管费
const TestPayType = '';

export default class PaySuccess extends PureComponent {
  showShare = () => {
    const { navigation } = this.props;
    const shopInfo = navigation.getParam('shopInfo') || TestShopInfo;
    const payType = navigation.getParam('payType') || TestPayType;
    const is_join = shopInfo.is_join;
    const aId = shopInfo.activity?.id;
    const uAId = shopInfo.user_activity?.id;
    const uId = shopInfo.user_activity?.user_id;
    const baseUrl = {
      buyActivityGoods: ShopConstant.SHARE_BYU_SUCCESS_URL,
      commission: is_join === ShopConstant.NOT_JOIN ? ShopConstant.SHARE_BASE_URL_BUYED : ShopConstant.SHARE_BASE_URL,
    }[payType];
    const url = {
      buyActivityGoods: `${baseUrl}?id=${shopInfo.order_id}`,
      commission: `${baseUrl}?id=${aId}&u_a_id=${uAId}&activity_id=${aId}&inviter=${uId}`,
    }[payType];
    const title = payType === 'buyActivityGoods' ? '差购买成功文案' : shopInfo.activity?.b_type === '2'
      ? `快来炒饭APP帮我助攻抢购，成功可立获${shopInfo.user_activity.commission / 100}元现金`
      : `快来炒饭APP帮我抽一支幸运签，中签后你可立获${shopInfo.user_activity.commission / 100}元现金`;
    showShare({
      text: shopInfo.goods.goods_name,
      img: shopInfo.goods.image,
      url,
      title,
    }).then(() => {
      // 分享成功回调
    });
  };

  confirm = () => {
    const { navigation } = this.props;
    const payType = navigation.getParam('payType') || TestPayType;
    if (payType === 'commission') {
      navigation.navigate('shopDetail');
    } else if (['buyGoods', 'buyActivityGoods', 'management'].includes(payType)) {
      navigation.navigate({ routeName: 'BottomNavigator', params: { index: 4 } });
      navigation.navigate({ routeName: 'MyGoods', params: { type: 'warehouse' } });
    } else if (payType === 'postage') {
      navigation.navigate({ routeName: 'BottomNavigator', params: { index: 4 } });
      navigation.navigate({ routeName: 'MyGoods', params: { type: 'sendOut' } });
    } else if (payType === 'service') {
      navigation.navigate({ routeName: 'BottomNavigator', params: { index: 4 } });
      navigation.navigate({ routeName: 'MyGoods', params: { type: 'onSale', title: '我的商品' } });
    }
  };

  toFreeTrade = () => {
    const { navigation } = this.props;
    navigation.navigate({ routeName: 'BottomNavigator', params: { index: 0 } });
  }

  toWarehouse = (type) => {
    const { navigation } = this.props;
    navigation.push('MyGoods', {
      title: '我的库房',
      type,
    });
  }

  toMyGoods = (type) => {
    const { navigation } = this.props;
    navigation.push('MyGoods', {
      title: '我的商品',
      type,
    });
  }

  toCopy = () => {
    Clipboard.setString(`收件人：北京酱爆潮流科技有限公司
手机号码：18888888888
邮寄地址：北京市朝阳区朝外SOHO0823`);
    showToast('邮寄信息已复制');
  }

  renderBottom = () => {
    const { navigation } = this.props;
    const payType = navigation.getParam('payType') || TestPayType;
    const shopInfo = navigation.getParam('shopInfo') || TestShopInfo;
    if (payType === 'commission' && shopInfo?.activity?.b_type) {
      return (
        <Text style={styles.share} onPress={this.showShare}>
          {'赶快'}
          <Text style={{ color: '#0097C2', fontSize: 13 }}>分享</Text>
          {'活动链接给好友吧，'}
          {shopInfo.activity.b_type === '1'
            ? '每位好友的加入都能多一个抽中的机会' : '邀请好友来帮我抢购买资格'}
        </Text>
      );
    } if (['buyActivityGoods', 'buyGoods'].includes(payType)) {
      return (
        <Text style={styles.share} onPress={this.showShare}>
          {'商品购买成功，可在'}
          <Text onPress={() => this.toWarehouse('warehouse')} style={{ color: '#0097C2', fontSize: 13 }}>我的库房</Text>
          {'中提货或者发布到'}
          <Text onPress={this.toFreeTrade} style={{ color: '#0097C2', fontSize: 13 }}>自由交易区</Text>
        </Text>
      );
    } if (payType === 'service') {
      return (
        <Text style={styles.share} onPress={this.showShare}>
          {'商品上架成功，可在'}
          <Text onPress={() => this.toWarehouse('warehouse')} style={{ color: '#0097C2', fontSize: 13 }}>我的库房</Text>
          {'或'}
          <Text onPress={() => this.toMyGoods('onSale')} style={{ color: '#0097C2', fontSize: 13 }}>我的商品</Text>
          {'中修改价格或下架商品'}
        </Text>
      );
    } if (payType === 'postage') {
      return (
        <Text style={styles.share} onPress={this.showShare}>
          {'邮费支付成功，可在我的库房'}
          <Text onPress={() => this.toWarehouse('sendOut')} style={{ color: '#0097C2', fontSize: 13 }}>已出库</Text>
          {'中查看物流单号'}
        </Text>
      );
    } if (payType === 'management') {
      return (
        <Text style={styles.share} onPress={this.showShare}>
          {'库房管理费支付成功，可在邮寄商品后到'}
          <Text onPress={() => this.toWarehouse('warehouse')} style={{ color: '#0097C2', fontSize: 13 }}>我的库房</Text>
          {'中填写物流单号'}
        </Text>
      );
    }
    return null;
  }

  render() {
    const { navigation } = this.props;
    const shopInfo = navigation.getParam('shopInfo') || TestShopInfo;
    const payType = navigation.getParam('payType') || TestPayType;
    const btns = [{ text: '确定', onPress: debounce(this.confirm) }];
    if (payType === 'commission') {
      btns.unshift({ text: '邀请助攻', onPress: debounce(this.showShare) });
    } else if (payType === 'buyActivityGoods') {
      btns.unshift({ text: '分享', onPress: debounce(this.showShare) });
    }
    const hints = payType === 'management' ? [
      { text: '指定快递：顺丰快递', needStar: true },
      { text: '收件人：北京酱爆潮流科技有限公司' },
      { text: '手机号码：18888888888' },
      { text: '邮寄地址：北京市朝阳区朝外SOHO0823' },
    ] : [];
    const Wrapper = payType === 'management' ? TouchableOpacity : View;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', paddingTop: 10 }} showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center', marginTop: STATUSBAR_HEIGHT + 20 }}>
            <FadeImage style={styles.goodImage} source={{ uri: shopInfo.goods.image }} />
            <Image style={styles.icon} source={require('../../res/image/chaofan_hui.png')} />
            <Text style={styles.shopName}>{shopInfo.goods.goods_name}</Text>
            <View style={styles.hengxian} />
            <Text style={styles.status}>支付成功!</Text>
            {
              payType === 'commission' && (
                <CountdownCom
                  time={shopInfo.activity.end_time}
                  style={styles.time}
                  prefix="距活动结束 "
                  prefixStyle={[styles.time, { color: '#727272' }]}
                />
              )
            }
          </View>
          {this.renderBottom()}
          <Wrapper activeOpacity={1} onPress={this.toCopy} style={{ width: wPx2P(375), paddingHorizontal: 20, marginTop: 15 }}>
            {hints.map((v, i) => (
              <View key={i} style={{ flexDirection: 'row', marginTop: 2 }}>
                {v.needStar ? <Text style={styles.hint}>* </Text> : <Text style={[styles.hint, { color: 'transparent' }]}>* </Text>}
                <Text style={[styles.hint, { flex: 1 }]}>{v.text}</Text>
              </View>
            ))}
          </Wrapper>
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
    color: '#FFA700',
  },
  icon: {
    width: wPx2P(47),
    height: wPx2P(47),
    position: 'absolute',
    right: 20,
    top: 15,
  },
  bottomWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  hint: {
    fontSize: 11,
    color: '#888',
    textAlign: 'justify',
  },
});
