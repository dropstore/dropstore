/**
 * @file 支付状态组件
 * @date 2019/8/21 22:30
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ImageBackground from '../../components/ImageBackground';
import Image from '../../components/Image';
import {commonStyle} from '../../res/style/CommonStyle';
import {bottomStyle} from '../../res/style/BottomStyle';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import {Mario, YaHei} from "../../res/FontFamily";
import {checkTime, countDown} from "../../utils/TimeUtils";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {showToast} from "../../utils/MutualUtil";
import {showShare} from '../../redux/actions/component';
import {getShareSuccess} from '../../redux/reselect/component';

function mapStateToProps() {
  return state => ({
    shareSuccess: getShareSuccess(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showShare,
  }, dispatch);
}

class PayStatus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDownTime: '',
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    const payStatus = navigation.getParam('payStatus');
    if (payStatus) {
      this._setTime();
      this._timer = setInterval(() => {
        this._setTime();
      }, 1000)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {shareSuccess} = this.props;
    if (!shareSuccess && nextProps.shareSuccess) {
      showToast('分享成功');
      navigation.navigate('shopDetail');
    }
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
    const {navigation} = this.props;
    const shopDetailInfo = navigation.getParam('shopDetailInfo');
    const data = shopDetailInfo.data;
    // 活动开始时间
    let start_time = data.activity.start_time;
    return checkTime(start_time);
  };
  _showShare = () => {
    const {showShare} = this.props;
    showShare({
      text: '分享的正文',
      img: 'https://www.baidu.com/img/bd_logo1.png',
      url: 'https://www.baidu.com/',
      title: '分享的标题',
    });
  };

  render() {
    const {navigation} = this.props;
    const shopDetailInfo = navigation.getParam('shopDetailInfo');
    const payStatus = navigation.getParam('payStatus');
    const data = shopDetailInfo.data;
    return (
      <View style={_style.container}>
        <View style={_style.mainView}>
          <Image source={payStatus ? Images.zf_cg : Images.zf_sb}/>
          <Image source={Images.got_em}/>
          <Image style={_style.goodImage} source={{uri: data.goods.image}}/>
          {
            payStatus && this._getStartTime() > 0 ? <View style={[commonStyle.row, {marginTop: 26}]}>
              <Text style={_style.waitLeft}>等待发布：</Text>
              <Text style={_style.time}>{this.state.startDownTime}</Text>
            </View> : <View/>
          }
          <Text style={_style.shopName}>{data.goods.goods_name}</Text>
        </View>
        {
          payStatus ?
            <View style={bottomStyle.bottomView}>
              <ImageBackground style={bottomStyle.buttonOnlyOneChildView} source={Images.bg_right}
                               onPress={() => {
                                 this._showShare();
                               }}>
                <Text style={bottomStyle.buttonText}>分享</Text>
              </ImageBackground>
            </View> : <View style={[bottomStyle.bottomView, commonStyle.row]}>
              <ImageBackground style={bottomStyle.buttonNormalView} source={Images.bg_left}
                               onPress={() => alert('查看订单')}>
                <Text style={bottomStyle.buttonText}>查看订单</Text>
              </ImageBackground>
              <ImageBackground style={bottomStyle.buttonNormalView} source={Images.bg_right}
                               onPress={() => navigation.navigate('shopDetail')}>
                <Text style={bottomStyle.buttonText}>确认</Text>
              </ImageBackground>
            </View>
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
    backgroundColor: Colors.NORMAL_TEXT_F2
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
  shopName: {
    justifyContent: 'center',
    fontSize: 19,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    fontWeight: '400',
    marginTop: 17,
    marginHorizontal: 20
  },
  goodImage: {
    width: 294,
    height: 155
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(PayStatus);
