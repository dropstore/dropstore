/**
 * @file 佣金设定界面
 * @date 2019/8/22 22:26
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { ImageBackground, KeyboardDismiss } from '../../components';
import { SCREEN_WIDTH, PADDING_TAB } from '../../common/Constant';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { Normal, YaHei } from '../../res/FontFamily';
import { debounce } from '../../utils/commonUtils';
import { getShopDetailInfo } from '../../redux/reselect/shopDetailInfo';
import { setCommission, getPayMes } from '../../redux/actions/shopDetailInfo';
import { bottomStyle } from '../../res/style/BottomStyle';
import ShopConstant from '../../common/ShopConstant';

function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
  });
}

class Commission extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      number: 0,
      commission: 0,
    };
  }

  componentDidMount() {
    const { shopDetailInfo } = this.props;
    const shopInfo = shopDetailInfo.data;
    getPayMes(shopInfo.activity.id, shopInfo.user_activity.id).then((res) => {
      const data = res.data;
      if (data) {
        this.setState({ number: data.number, commission: data.commission });
      }
    });
  }

  _toPay = () => {
    const { shopDetailInfo, navigation } = this.props;
    const shopInfo = shopDetailInfo.data;
    // let minPrice = shopInfo.activity.min_price;
    const commission = this.state.commission;
    if (commission < 1) {
      // return showToast(`单人佣金不能低于1元`);
    }
    const acId = shopInfo.user_activity.id;
    setCommission(shopInfo.activity.id, acId, commission).then((res) => {
      if (res) {
        const payData = {
          order_id: acId,
          price: res.data / 100,
        };
        navigation.navigate('pay', {
          title: '选择支付账户',
          type: ShopConstant.PAY_COMMISSION,
          payData,
          shopInfo,
        });
      }
    });
  };

  onChange = (event) => {
    const singlePrice = event.nativeEvent.text;
    this.setState({ commission: singlePrice, totalPrice: singlePrice * this.state.number });
  };

  render() {
    return (
      <KeyboardDismiss style={_styles.container}>
        <View style={_styles.mainView}>
          <Text style={_styles.countTitle}>
            {'合计数量 '}
            <Text style={_styles.count}>{this.state.number}</Text>
            {' 双'}
          </Text>
          <ImageBackground source={Images.framePhoneInput} style={_styles.inputBg}>
            <TextInput
              maxLength={13}
              keyboardType="number-pad"
              placeholder="填写佣金..."
              placeholderTextColor="rgba(162,162,162,1)"
              underlineColorAndroid="transparent"
              style={_styles.pricePh}
              clearButtonMode="while-editing"
              onSubmitEditing={debounce(this._toPay)}
              ref={(v) => {
                this.valueInput = v;
              }}
              onChange={this.onChange}
            />
          </ImageBackground>
          <Text style={_styles.tip}>请填写单双佣金</Text>
        </View>
        <View style={_styles.bottomView}>
          <View style={_styles.bottomLeftView}>
            <Text style={_styles.payTitle}>合计金额:</Text>
            <Text style={_styles.price}>{`${this.state.totalPrice}￥`}</Text>
          </View>
          <ImageBackground
            style={_styles.buttonOnlyOneChildView}
            source={Images.bg_right}
            onPress={debounce(this._toPay)}
          >
            <Text style={bottomStyle.buttonText}>确认</Text>
          </ImageBackground>
        </View>
      </KeyboardDismiss>
    );
  }
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
  mainView: {
    flex: 1,
    marginTop: 177,
    marginLeft: 74,
  },
  countTitle: {
    fontSize: 13,
    fontFamily: YaHei,
    fontWeight: '400',
    color: 'rgba(0,0,0,1)',
  },
  count: {
    fontSize: 18,
    fontFamily: YaHei,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,1)',
  },
  payTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    marginLeft: 10,
  },
  inputBg: {
    width: 259,
    height: 60,
  },
  pricePh: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(162,162,162,1)',
    marginLeft: 22,
  },
  tip: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    alignItems: 'flex-end',
    marginLeft: 165,
  },
  bottomView: {
    width: SCREEN_WIDTH,
    height: 61 + PADDING_TAB,
    paddingBottom: PADDING_TAB,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingHorizontal: 10,
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
  buttonOnlyOneChildView: {
    width: 178,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
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

export default connect(mapStateToProps)(withNavigation(Commission));
