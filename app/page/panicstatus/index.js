/**
 * @file 抢购状态界面
 * @date 2019/8/31 11:09
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageBackground from '../../components/ImageBackground';
import Image from '../../components/Image';
import { commonStyle } from '../../res/style/CommonStyle';
import { bottomStyle } from '../../res/style/BottomStyle';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { Mario, YaHei } from '../../res/FontFamily';
import { checkTime, countDown } from '../../utils/TimeUtils';
import { showShare } from '../../utils/MutualUtil';
import ShopConstant from '../../common/ShopConstant';
import { debounce } from '../../utils/commonUtils';

class PanicBuy extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      endDownTime: '',
    };
  }

  componentDidMount() {
    this._setTime();
    this._timer = setInterval(() => {
      this._setTime();
    }, 1000);
  }

  componentWillUnmount() {
    this._timer && clearInterval(this._timer);
  }

  _setTime = () => {
    const eTimeStamp = this._getEndTime();
    if (eTimeStamp > 0) {
      this.setState({ endDownTime: countDown(eTimeStamp) });
    }
  };

  _getEndTime = () => {
    const { navigation } = this.props;
    const data = navigation.getParam('shopInfo');
    // 活动开始时间
    const end_time = data.activity.end_time;
    return checkTime(end_time);
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

  _diffClick = () => {
    const { navigation } = this.props;
    const shopInfo = navigation.getParam('shopInfo');
    const panicStatus = navigation.getParam('panicStatus');
    const payData = navigation.getParam('payData');
    const is_join = shopInfo.is_join;
    if (panicStatus && (is_join === ShopConstant.NOT_JOIN || is_join === ShopConstant.LEADING)) {
      navigation.navigate('pay', {
        title: '选择支付账户',
        type: ShopConstant.PAY_ORDER,
        payData,
        shopInfo,
      });
    } else {
      navigation.goBack();
    }
  };

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('shopInfo');
    const panicStatus = navigation.getParam('panicStatus');
    const is_join = data.is_join;
    return (
      <View style={_style.container}>
        <View style={_style.mainView}>
          <Image source={panicStatus ? Images.gm_cg : Images.qx_sb} />
          <Image source={Images.got_em} />
          <Image style={_style.goodImage} source={{ uri: data.goods.image }} />
          {
            this._getEndTime() > 0 ? (
              <View style={[commonStyle.row, { marginTop: 26 }]}>
                <Text style={_style.waitLeft}>距结束：</Text>
                <Text style={_style.time}>{this.state.endDownTime}</Text>
              </View>
            ) : <View />
          }
          <Text style={_style.shopName}>{data.goods.goods_name}</Text>
        </View>
        <View style={[bottomStyle.bottomView, commonStyle.row]}>
          <ImageBackground
            style={bottomStyle.buttonNormalView}
            source={Images.bg_left}
            onPress={debounce(this._showShare)}
          >
            <Text style={bottomStyle.buttonText}>分享邀请</Text>
          </ImageBackground>
          <ImageBackground
            style={bottomStyle.buttonNormalView}
            source={Images.bg_right}
            onPress={debounce(this._diffClick)}
          >
            <Text
              style={bottomStyle.buttonText}
            >
              {panicStatus && (is_join === ShopConstant.NOT_JOIN || is_join === ShopConstant.LEADING) ? '去付款' : '确认'}

            </Text>
          </ImageBackground>
        </View>
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
export default PanicBuy;
