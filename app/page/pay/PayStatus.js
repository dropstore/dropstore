/**
 * @file 支付状态组件
 * @date 2019/8/21 22:30
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  DeviceEventEmitter, StyleSheet, Text, View,
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
    const aId = shopInfo.activity.id;
    const uAId = shopInfo.user_activity.id;
    const uId = shopInfo.user_activity.user_id;
    const title = shopInfo.goods.goods_name;
    const image = shopInfo.goods.image;
    const url = `${ShopConstant.SHARE_BASE_URL}?id=${aId}&u_a_id=${uAId}&activity_id=${aId}&inviter=${uId}`;
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
      const type = payStatus ? 'payStatus' : 'uncomplete';
      navigation.navigate('MyGoods', {
        type,
      });
    }
  };

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('shopInfo');
    const payStatus = navigation.getParam('payStatus');
    return (
      <View style={_style.container}>
        <View style={_style.mainView}>
          <Image source={payStatus ? Images.zf_cg : Images.zf_sb} />
          <Image source={Images.got_em} />
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
    paddingTop: 27,
    backgroundColor: Colors.NORMAL_TEXT_F2,
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
