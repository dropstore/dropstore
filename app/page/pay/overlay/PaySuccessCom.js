/**
 * @file 支付状态组件
 * @date 2019/8/21 22:30
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SCREEN_HEIGHT} from "../../../common/Constant";
import ImageBackground from '../../../components/ImageBackground';
import {commonStyle} from '../../../res/style/CommonStyle';
import {bottomStyle} from '../../../res/style/BottomStyle';
import Images from '../../../res/Images';
import Colors from '../../../res/Colors';
import {Mario, YaHei} from "../../../res/FontFamily";
import {checkTime, countDown} from "../../../utils/TimeUtils";

export default class PaySuccessCom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDownTime: '',
    }
  }

  componentDidMount() {
    this._setTime();
    this._timer = setInterval(() => {
      this._setTime();
    }, 1000)
  }

  componentWillUnmount() {
    this._timer && clearInterval(this._timer);
  }

  _setTime = () => {
    let sTimeStamp = this._getStartTime();
    if (sTimeStamp > 0) {
      this.setState({startDownTime: countDown(sTimeStamp)})
    }
  };

  _getStartTime = () => {
    const {shopDetailInfo} = this.props;
    const data = shopDetailInfo.data;
    // 活动开始时间
    let start_time = data.activity.start_time;
    return checkTime(start_time);
  };

  render() {
    const {navigation, closeOver} = this.props;
    return (
      <View style={_style.container}>
        <View style={_style.mainView}>
          <Text style={_style.statusText}>支付成功</Text>
          {
            this._getStartTime() > 0 ? <View style={[commonStyle.row, {marginTop: 26}]}>
              <Text style={_style.waitLeft}>等待发布：</Text>
              <Text style={_style.time}>{this.state.startDownTime}</Text>
            </View> : <View/>
          }
        </View>
        <View style={bottomStyle.bottomView}>
          {
            this._getStartTime() > 0 ? <ImageBackground style={bottomStyle.buttonNormalView} source={Images.bg_left}
                                                        onPress={() => alert('分享')}>
              <Text style={bottomStyle.buttonText}>分享邀请</Text>
            </ImageBackground> : <View/>
          }

          <ImageBackground style={bottomStyle.buttonNormalView} source={Images.bg_right}
                           onPress={() => {
                             closeOver();
                             navigation.navigate('shopDetail')
                           }}>
            <Text style={bottomStyle.buttonText}>确认</Text>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const _style = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE_COLOR,
    height: SCREEN_HEIGHT
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 66,
    fontFamily: YaHei,
    fontWeight: '400',
    color: 'rgba(0,0,0,1)'
  },
  waitLeft: {
    fontSize: 16,
    fontFamily: YaHei,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,1)'
  },
  time: {
    fontSize: 18,
    fontFamily: Mario,
    color: 'rgba(0,0,0,1)'
  },
});


