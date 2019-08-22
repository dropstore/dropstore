/**
 * @file 佣金设定界面
 * @date 2019/8/22 22:26
 * @author ZWW
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ImageBackground from '../../components/ImageBackground';
import {SCREEN_WIDTH} from '../../common/Constant';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import {Normal, YaHei} from '../../res/FontFamily';
import {debounce} from '../../utils/commonUtils';
import {getShopDetailInfo} from "../../redux/reselect/shopDetailInfo";
import {getShopDetail} from "../../redux/actions/shopDetailInfo";
import {bottomStyle} from "../../res/style/BottomStyle";

function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getShopDetail,
  }, dispatch);
}

class Commission extends Component {
  _toPay = () => {
    this.props.navigation.push('pay', {
      title: '选择支付账户',
    });
  };

  render() {
    const {shopDetailInfo, navigation} = this.props;
    const shopInfo = shopDetailInfo.shopData.data;
    return (
      <View style={_styles.container}>
        <View style={_styles.mainView}>
          <Text style={_styles.countTitle}>以选数量
            <Text style={_styles.count}>6</Text>双
          </Text>
        </View>
        <View style={_styles.bottomView}>
          <View style={_styles.bottomLeftView}>
            <Text style={_styles.payTitle}>合计金额:</Text>
            <Text style={_styles.price}>10000￥</Text>
          </View>
          <ImageBackground style={bottomStyle.buttonNormalView} source={Images.bg_right}
                           onPress={debounce(this._toPay)}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  countTitle: {
    fontSize: 13,
    fontFamily: YaHei,
    fontWeight: '400',
    color: 'rgba(0,0,0,1)',
    marginLeft: 10
  },
  count: {
    fontSize: 18,
    fontFamily: YaHei,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,1)',
    marginLeft: 10
  },
  payTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    marginLeft: 21,
  },
  bottomView: {
    width: SCREEN_WIDTH,
    height: 61,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(215, 215, 215, 1)',
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Commission));
