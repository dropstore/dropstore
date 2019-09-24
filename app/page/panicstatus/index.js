/**
 * @file 抢购状态界面
 * @date 2019/8/31 11:09
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { Image, BottomBtnGroup, CountdownCom } from '../../components';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { Mario, YaHei } from '../../res/FontFamily';
import { showShare } from '../../utils/MutualUtil';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import ShopConstant from '../../common/ShopConstant';
import { debounce } from '../../utils/commonUtils';
import { STATUSBAR_HEIGHT, BOTTOM_BTN_HEIGHT } from '../../common/Constant';

class Panicstatus extends PureComponent {
  toShare = () => {
    const { navigation } = this.props;
    const shopInfo = navigation.getParam('shopInfo');
    const is_join = shopInfo.is_join;
    const aId = shopInfo.activity.id;
    const uAId = shopInfo.user_activity.id;
    const uId = shopInfo.user_activity.user_id;
    const title = shopInfo.goods.goods_name;
    const image = shopInfo.goods.image;
    const baseUrl = is_join === ShopConstant.NOT_JOIN ? ShopConstant.SHARE_BASE_URL_BUYED : ShopConstant.SHARE_BASE_URL;
    const url = `${baseUrl}?id=${aId}&u_a_id=${uAId}&activity_id=${aId}&inviter=${uId}`;
    showShare({
      text: ShopConstant.SHARE_TEXT,
      img: image,
      url,
      title,
    }).then(() => {
      // 分享成功回调
    });
  };

  toNext = () => {
    const { navigation } = this.props;
    const shopInfo = navigation.getParam('shopInfo');
    const Panicstatus = navigation.getParam('Panicstatus');
    const payData = navigation.getParam('payData');
    const is_join = shopInfo.is_join;
    if (Panicstatus) {
      if (is_join === ShopConstant.NOT_JOIN) {
        navigation.navigate('pay', {
          title: '选择支付账户',
          type: ShopConstant.PAY_ORDER,
          payData,
          shopInfo,
        });
      } else if (is_join === ShopConstant.LEADING) {
        const type = 'uncomplete';
        navigation.navigate('MyGoods', {
          type,
        });
      } else {
        navigation.goBack();
      }
    } else {
      navigation.goBack();
    }
  };

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('shopInfo');
    const Panicstatus = navigation.getParam('Panicstatus');
    const is_join = data.is_join;
    const btns = [{
      text: Panicstatus && (is_join === ShopConstant.NOT_JOIN || is_join === ShopConstant.LEADING) ? '去付款' : '确认',
      onPress: debounce(this.toNext),
    }];
    if (Panicstatus) {
      btns.unshift({ text: '分享邀请', onPress: debounce(this.toShare) });
    }
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.mainView} showsVerticalScrollIndicator={false} alwaysBounceVertical={false}>
          <Image style={{ width: wPx2P(250), height: wPx2P(100) }} source={Panicstatus ? Images.gm_cg : Images.qx_sb} />
          <Image style={{ width: wPx2P(200), height: wPx2P(200) }} source={Images.got_em} />
          <Image style={styles.goodImage} source={{ uri: data.goods.image }} />
          <CountdownCom
            prefix="距结束： "
            prefixStyle={{ fontSize: 16, fontFamily: YaHei, fontWeight: 'bold' }}
            time={data?.activity?.end_time}
            style={styles.time}
          />
          <Text style={styles.shopName}>{data.goods.goods_name}</Text>
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
    paddingBottom: hPx2P(20 + BOTTOM_BTN_HEIGHT),
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 18,
    fontFamily: Mario,
    color: '#000',
    width: 116,
    backgroundColor: 'red',
  },
  shopName: {
    justifyContent: 'center',
    fontSize: 17,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    fontWeight: '400',
    marginTop: 17,
    marginHorizontal: 20,
    textAlign: 'justify',
  },
  goodImage: {
    width: 294,
    height: 155,
  },
});
export default Panicstatus;
