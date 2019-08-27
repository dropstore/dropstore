/**
 * @file 佣金设定界面
 * @date 2019/8/22 22:26
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from "react-redux";
import ImageBackground from '../../components/ImageBackground';
import NavigationBarCom from '../../components/NavigationBarCom';
import {SCREEN_WIDTH, STATUSBAR_AND_NAV_HEIGHT} from '../../common/Constant';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import {Normal, YaHei} from '../../res/FontFamily';
import {debounce} from '../../utils/commonUtils';
import {getShopDetailInfo} from "../../redux/reselect/shopDetailInfo";
import {bottomStyle} from "../../res/style/BottomStyle";
import {showToast} from "../../utils/MutualUtil";

function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
  });
}

class Commission extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0
    }
  }

  _toPay = () => {
    const {shopDetailInfo, navigation} = this.props;
    const min_price = shopDetailInfo.data.activity.min_price;
    if (this.state.totalPrice < min_price) {
      return showToast(`总价不得低于${min_price}元`);
    }
    navigation.push('pay', {navigation: navigation,shopDetailInfo:shopDetailInfo});
  };

  onChange = (event) => {
    const singlePrice = event.nativeEvent.text;
    this.setState({totalPrice: singlePrice * (6 - 1)})
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={_styles.container}>
        <NavigationBarCom
          headerTitle="助攻佣金设定"
          isShowLeftView={true}
          navigation={navigation}
          bgColor={Colors.OTHER_BACK}
        />
        <View style={_styles.mainView}>
          <Text style={_styles.countTitle}>合计数量
            <Text style={_styles.count}> 6</Text> 双
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
            <Text style={_styles.price}>{this.state.totalPrice}￥</Text>
          </View>
          <ImageBackground
            style={bottomStyle.buttonOnlyOneChildView}
            source={Images.bg_right}
            onPress={debounce(this._toPay)}
          >
            <Text style={bottomStyle.buttonText}>确认</Text>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR
  },
  mainView: {
    flex: 1,
    marginTop: 177 + STATUSBAR_AND_NAV_HEIGHT,
    marginLeft: 74
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
    height: 60
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

export default connect(mapStateToProps)(withNavigation(Commission));
