/**
 * @file 支付界面
 * @date 2019/8/21 20:07
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Overlay} from "teaset";
import Image from '../../components/Image';
import NavigationBarCom from '../../components/NavigationBarCom';
import ImageBackground from '../../components/ImageBackground';
import PaySuccessCom from "./overlay/PaySuccessCom";
import PayFailCom from "./overlay/PayFailCom";
import {STATUSBAR_AND_NAV_HEIGHT, SCREEN_WIDTH} from '../../common/Constant';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import {Normal, YaHei} from '../../res/FontFamily';
import {commonStyle} from '../../res/style/CommonStyle';
import {showToast} from '../../utils/MutualUtil';
import {debounce} from '../../utils/commonUtils';
import {hideOlView} from "../../utils/ViewUtils";
import {bottomStyle} from "../../res/style/BottomStyle";

class Pay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      overPayStatusKey: -1,
      payData: [{
        'type': 1,
        'subImage': Images.pay_zfb,
        'name': '支付宝',
        'isSelect': false,
        'bgColor': Colors.PAY_ZFB_BG
      }, {
        'type': 2,
        'subImage': Images.pay_wx,
        'name': '微信钱包',
        'isSelect': false,
        'bgColor': Colors.PAY_WX_BG
      }, {
        'type': 3,
        'subImage': Images.pay_drop,
        'name': 'Drop账户',
        'isSelect': false,
        'bgColor': Colors.NORMAL_TEXT_C2
      }]
    }
  }

  /**
   * 支付方式改变事件
   * @param index
   * @private
   */
  _changePayStatus = (index) => {
    let payData = JSON.parse(JSON.stringify(this.state.payData));
    for (let i = 0; i < payData.length; i++) {
      if (index === i) {
        let _payData = payData[i];
        _payData.isSelect = !_payData.isSelect;
      } else {
        payData[i].isSelect = false;
      }
    }
    this.setState({payData: payData})
  };
  /**
   * @private
   */
  _pay = () => {
    const {navigation} = this.props;
    const shopDetailInfo = navigation.getParam('shopDetailInfo');
    let payData = this.state.payData;
    let isChoosePayWay = false;
    for (let i = 0; i < payData.length; i++) {
      isChoosePayWay = payData[i].isSelect;
      if (isChoosePayWay) {
        break;
      }
    }
    if (!isChoosePayWay) {
      return showToast('请选择付款方式');
    }
    this.showOver(navigation, shopDetailInfo, false)
  };

  /**
   * 显示支付状态浮层
   * @param navigation
   * @param shopDetailInfo
   * @param isSuccess
   */
  showOver = (navigation, shopDetailInfo, isSuccess) => {
    let olView = (
      <Overlay.PullView modal={true}>
        {
          isSuccess
            ? <PaySuccessCom navigation={navigation} shopDetailInfo={shopDetailInfo}
                             closeOver={this.closeOver.bind(this)}/>
            : <PayFailCom navigation={navigation} shopDetailInfo={shopDetailInfo}
                             closeOver={this.closeOver.bind(this)}/>
        }
      </Overlay.PullView>
    );
    let key = Overlay.show(
      olView
    );
    this.setState({overPayStatusKey: key})
  };

  // 关闭浮层
  closeOver() {
    hideOlView(this.state.overPayStatusKey);
  };

  render() {
    const {payData} = this.state;
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <NavigationBarCom
          headerTitle="选择支付账户"
          isShowLeftView={true}
          navigation={navigation}
          bgColor={Colors.OTHER_BACK}
        />
        <View style={_styles.container}>
          <Text style={_styles.alSel}>请选择付款方式:</Text>
          <View style={{flex: 1}}>
            {
              payData.map((item, index) => (
                <View key={index}
                      style={[_styles.mainView, {marginTop: index === 0 ? 17 : 27, backgroundColor: item.bgColor}]}>
                  <View style={[commonStyle.row, {flex: 1}]}>
                    <Image style={_styles.payImage} source={item.subImage}/>
                    <Text style={_styles.payTitle}>{item.name}</Text>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity onPress={() => this._changePayStatus(index)}>
                      <Image style={_styles.paySel} source={item.isSelect ? Images.sel : Images.unSel}/>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            }
          </View>
          <View style={_styles.bottomView}>
            <View style={_styles.bottomLeftView}>
              <Text style={_styles.price}>10000￥</Text>
              <Text style={_styles.yj}>(已减300)</Text>
            </View>
            <ImageBackground style={bottomStyle.buttonNormalView} source={Images.bg_right}
                             onPress={debounce(this._pay)}>
              <Text style={bottomStyle.buttonText}>支付</Text>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
    marginTop: STATUSBAR_AND_NAV_HEIGHT
  },
  alSel: {
    fontSize: 16,
    color: 'rgba(0,0,0,1)',
    marginLeft: 20,
    marginTop: 17,
    fontFamily: Normal
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
    marginRight: 15
  },
  bottomView: {
    width: SCREEN_WIDTH,
    height: 61,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(215, 215, 215, 1)',
  },
  bottomLeftView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    fontSize: 29,
    fontFamily: YaHei,
    fontWeight: '400',
    color: 'rgba(0,0,0,1)',
    marginLeft: 10
  },
  yj: {
    fontSize: 12,
    fontFamily: YaHei,
    fontWeight: '400',
    color: 'rgba(139,139,139,1)',
    marginLeft: 10
  },
  bottomRightView: {
    width: 178,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    marginRight: 7,
    marginLeft: 23
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Normal,
    color: 'rgba(255,255,255,1)'
  }
});

export default withNavigation(Pay);
