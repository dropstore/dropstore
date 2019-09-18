/**
 * @file 支付界面
 * @date 2019/8/21 20:07
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Image from '../../components/Image';
import ImageBackground from '../../components/ImageBackground';
import { SCREEN_WIDTH, PADDING_TAB } from '../../common/Constant';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { Normal, YaHei } from '../../res/FontFamily';
import { commonStyle } from '../../res/style/CommonStyle';
import { debounce } from '../../utils/commonUtils';
import { bottomStyle } from '../../res/style/BottomStyle';
import { showToast } from '../../utils/MutualUtil';
import { getOrderInfo, getPayStatus } from '../../redux/actions/pay';
import ShopConstant from '../../common/ShopConstant';

class Pay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      payData: [{
        type: ShopConstant.ALIPAY,
        subImage: Images.pay_zfb,
        name: '支付宝',
        isSelect: false,
        bgColor: Colors.PAY_ZFB_BG,
      },
      // {
      //   type: ShopConstant.WECHATPAY,
      //   subImage: Images.pay_wx,
      //   name: '微信钱包',
      //   isSelect: false,
      //   bgColor: Colors.PAY_WX_BG,
      // }, {
      //   type: ShopConstant.DROPPAY,
      //   subImage: Images.pay_drop,
      //   name: 'Drop账户',
      //   isSelect: false,
      //   bgColor: Colors.NORMAL_TEXT_C2,
      // }
      ],
    };
  }

  /**
   * 支付方式改变事件
   * @param index
   * @private
   */
  _changePayStatus = (index) => {
    const payData = JSON.parse(JSON.stringify(this.state.payData));
    for (let i = 0; i < payData.length; i++) {
      if (index === i) {
        const _payData = payData[i];
        _payData.isSelect = !_payData.isSelect;
      } else {
        payData[i].isSelect = false;
      }
    }
    this.setState({ payData });
  };

  /**
   * @private
   */
  _pay = async () => {
    const { navigation } = this.props;
    const data = navigation.getParam('payData');
    const type = navigation.getParam('type');
    const shopInfo = navigation.getParam('shopInfo');
    const buySuccess = navigation.getParam('buySuccess');
    const payData = this.state.payData;
    let isChoosePayWay = false;
    let chooseWay = -1;
    for (let i = 0; i < payData.length; i++) {
      isChoosePayWay = payData[i].isSelect;
      if (isChoosePayWay) {
        chooseWay = payData[i].type;
        break;
      }
    }
    if (!isChoosePayWay) {
      return showToast('请选择付款方式');
    }
    const status = await getOrderInfo(type, chooseWay, data.order_id);
    // 同步返回支付完成通知
    if (status === ShopConstant.FINISHPAY) {
      // 获取服务器返回的支付状态
      await getPayStatus(type, data.order_id, navigation, shopInfo, buySuccess);
    }
  };

  render() {
    const { payData } = this.state;
    const { navigation } = this.props;
    const data = navigation.getParam('payData');
    return (
      <View style={_styles.container}>
        <Text style={_styles.alSel}>请选择付款方式:</Text>
        <View style={{ flex: 1 }}>
          {
            payData.map((item, index) => (
              <TouchableOpacity onPress={() => this._changePayStatus(index)} key={index}>
                <View
                  style={[_styles.mainView, { marginTop: index === 0 ? 17 : 27, backgroundColor: item.bgColor }]}
                >
                  <View style={[commonStyle.row, { flex: 1 }]}>
                    <Image style={_styles.payImage} source={item.subImage} />
                    <Text style={_styles.payTitle}>{item.name}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Image style={_styles.paySel} source={item.isSelect ? Images.sel : Images.unSel} />
                  </View>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
        <View style={_styles.bottomView}>
          <View style={_styles.bottomLeftView}>
            <Text style={_styles.price}>
              {data.price / 100}
￥
            </Text>
          </View>
          <ImageBackground
            style={bottomStyle.buttonNormalView}
            source={Images.bg_right}
            onPress={debounce(this._pay)}
          >
            <Text style={bottomStyle.buttonText}>支付</Text>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },

  alSel: {
    fontSize: 16,
    color: 'rgba(0,0,0,1)',
    marginLeft: 20,
    marginTop: 17,
    fontFamily: Normal,
  },
  mainView: {
    width: SCREEN_WIDTH - 26,
    height: 84,
    marginHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  payImage: {
    width: 57,
    height: 57,
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 12,
  },
  payTitle: {
    fontSize: 17,
    color: 'rgba(255,255,255,1)',
    marginLeft: 10,
  },
  paySel: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  bottomView: {
    width: SCREEN_WIDTH,
    height: 61 + PADDING_TAB,
    paddingBottom: PADDING_TAB,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(215, 215, 215, 1)',
  },
  bottomLeftView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 29,
    fontFamily: YaHei,
    fontWeight: '400',
    color: 'rgba(0,0,0,1)',
    marginLeft: 10,
  },
  yj: {
    fontSize: 12,
    fontFamily: YaHei,
    fontWeight: '400',
    color: 'rgba(139,139,139,1)',
    marginLeft: 10,
  },
  bottomRightView: {
    width: 178,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    marginRight: 7,
    marginLeft: 23,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Normal,
    color: 'rgba(255,255,255,1)',
  },
});

export default withNavigation(Pay);
