/**
 * @file 支付状态组件
 * @date 2019/8/21 22:30
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  DeviceEventEmitter, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import ImageBackground from '../../components/ImageBackground';
import Image from '../../components/Image';
import { commonStyle } from '../../res/style/CommonStyle';
import { bottomStyle } from '../../res/style/BottomStyle';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { Mario, YaHei } from '../../res/FontFamily';
import { checkTime, countDown } from '../../utils/TimeUtils';
import ShopConstant from '../../common/ShopConstant';
import { debounce } from '../../utils/commonUtils';
import { showShare } from '../../utils/MutualUtil';
import { hPx2P, wPx2P } from '../../utils/ScreenUtil';
import { STATUSBAR_HEIGHT } from '../../common/Constant';

class PayStatus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDownTime: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const payStatus = navigation.getParam('payStatus');
    if (payStatus) {
      this._setTime();
      this._timer = setInterval(() => {
        this._setTime();
      }, 1000);
    }
  }


  componentWillUnmount() {
    this._timer && clearInterval(this._timer);
  }

  _setTime = () => {
    const sTimeStamp = this._getStartTime();
    if (sTimeStamp > 0) {
      this.setState({ startDownTime: countDown(sTimeStamp) });
    }
  };

  _getStartTime = () => {
    const { navigation } = this.props;
    const data = navigation.getParam('shopInfo');
    // 活动开始时间
    const start_time = data.activity.start_time;
    return checkTime(start_time);
  };

  _showShare = () => {
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

  _setConfirmOnclick = () => {
    const { navigation } = this.props;
    const type = navigation.getParam('type');
    const payStatus = navigation.getParam('payStatus');
    // 支付佣金无论成功失败都回详情界面
    if (type === ShopConstant.PAY_COMMISSION) {
      DeviceEventEmitter.emit(ShopConstant.REFRESH_SHOP_DETAIL_INFO, true);
      navigation.navigate('shopDetail');
    } else {
      // const type = payStatus ? 'payStatus' : 'uncomplete';
      // navigation.navigate('MyGoods', {
      //   type,
      // });
      const type = payStatus ? 'payStatus' : 'uncomplete';
      navigation.navigate({ routeName: 'BottomNavigator', params: { index: 4 } });
      navigation.navigate({ routeName: 'MyGoods', params: { type } });
    }
  };

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('shopInfo');
    const payStatus = navigation.getParam('payStatus');
    return (
      <View style={_style.container}>
        <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false} alwaysBounceVertical={false}>
          <View style={_style.mainView}>
            <Image style={{ width: wPx2P(250), height: wPx2P(100) }} source={payStatus ? Images.zf_cg : Images.zf_sb} />
            <Image style={{ width: wPx2P(200), height: wPx2P(200) }} source={Images.got_em} />
            <Image style={_style.goodImage} source={{ uri: data.goods.image }} />
            {
              payStatus && this._getStartTime() > 0 ? (
                <View style={[commonStyle.row, { marginTop: 26 }]}>
                  <Text style={_style.waitLeft}>等待发布：</Text>
                  <Text style={_style.time}>{this.state.startDownTime}</Text>
                </View>
              ) : <View />
            }
            <Text style={_style.shopName}>{data.goods.goods_name}</Text>
          </View>
        </ScrollView>
        {
          payStatus
            ? (
              <View style={[bottomStyle.bottomView, commonStyle.row]}>
                <ImageBackground
                  style={bottomStyle.buttonNormalView}
                  source={Images.bg_right}
                  onPress={debounce(this._setConfirmOnclick)}
                >
                  <Text style={bottomStyle.buttonText}>确定</Text>
                </ImageBackground>
                <ImageBackground
                  style={bottomStyle.buttonNormalView}
                  source={Images.bg_right}
                  onPress={debounce(this._showShare)}
                >
                  <Text style={bottomStyle.buttonText}>分享</Text>
                </ImageBackground>
              </View>
            ) : (
              <View style={[bottomStyle.bottomView, commonStyle.row]}>
                <ImageBackground
                  style={bottomStyle.buttonOnlyOneChildView}
                  source={Images.bg_right}
                  onPress={debounce(this._setConfirmOnclick)}
                >
                  <Text style={bottomStyle.buttonText}>确定</Text>
                </ImageBackground>
              </View>
            )
        }
      </View>
    );
  }
}

const _style = StyleSheet.create({
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
    fontFamily: Mario,
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
