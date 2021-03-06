/**
 * @file 商品基本信息组件
 * @date 2019/8/18 16:46
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, DeviceEventEmitter,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Image from '../../../../components/Image';
import FadeImage from '../../../../components/FadeImage';
import Images from '../../../../res/Images';
import { YaHei, Mario } from '../../../../res/FontFamily';
import ShopConstant from '../../../../common/ShopConstant';
import { getShopDetailInfo } from '../../../../redux/reselect/shopDetailInfo';
import { checkTime, countDown } from '../../../../utils/TimeUtils';

function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
  });
}

class ShopBasicInfoCom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDownTime: '',
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
    const { shopDetailInfo } = this.props;
    const shopInfo = shopDetailInfo.data;
    const sTimeStamp = this._getTimeStamp(shopInfo).sTimeStamp;
    const eTimeStamp = this._getTimeStamp(shopInfo).eTimeStamp;
    if (sTimeStamp > 0) {
      this.setState({ startDownTime: countDown(sTimeStamp) });
    } else if (eTimeStamp > 0) {
      this.setState({ endDownTime: countDown(eTimeStamp) });
    } else {
      this._timer && clearInterval(this._timer);
    }
  };

  _setTimeDOM = (shopInfo) => {
    const startText = this._getTimeStamp(shopInfo).startText;
    const sTimeStamp = this._getTimeStamp(shopInfo).sTimeStamp;
    const eTimeStamp = this._getTimeStamp(shopInfo).eTimeStamp;
    if (sTimeStamp > 0) {
      return (
        <View style={_styles.overView}>
          <Text style={_styles.overTitle}>{startText}</Text>
          <Text style={_styles.overTime}>{this.state.startDownTime}</Text>
        </View>
      );
    }
    if (eTimeStamp > 0) {
      return (
        <View style={_styles.overView}>
          <Text style={_styles.overTitle}>距结束时间:</Text>
          <Text style={_styles.overTime}>{this.state.endDownTime}</Text>
        </View>
      );
    }
    return <View />;
  };

  _getTimeStamp = (shopInfo) => {
    // 活动类型
    const type = shopInfo.activity.type;
    const startText = (type === ShopConstant.ORIGIN_CONST ? '距发售时间:' : '距开始时间:');
    // 活动开始时间
    const start_time = shopInfo.activity.start_time;
    // 活动结束时间
    const end_time = shopInfo.activity.end_time;
    const sTimeStamp = checkTime(start_time);
    const eTimeStamp = checkTime(end_time);
    return { startText, sTimeStamp, eTimeStamp };
  };

  render() {
    const { shopDetailInfo, navigation } = this.props;
    const shopInfo = shopDetailInfo.data;
    return (
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          hitSlop={{
            top: 50, bottom: 50, left: 50, right: 50,
          }}
          onPress={() => navigation.navigate('Web', { title: '活动说明', url: 'http://m.dropstore.cn/index.html#/autarkyRule' })}
        >
          <View style={_styles.explainView}>
            <Image resizeMode="contain" style={_styles.explainImage} source={Images.jth} />
            <Text style={_styles.explainText}>查看活动说明</Text>
          </View>
        </TouchableOpacity>

        <View style={_styles.mainView}>
          <FadeImage resizeMode="contain" style={_styles.imageShoe} source={{ uri: shopInfo.activity.image }} />
          {
            this._setTimeDOM(shopInfo)
          }
          <Text style={_styles.shopTitle}>
            `
            {shopInfo.goods.goods_name}
            `
          </Text>
          <Text style={_styles.price}>{`${shopInfo.activity.price / 100}￥`}</Text>
        </View>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  explainView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    top: 12,
  },
  explainImage: {
    width: 12,
    height: 10,
  },
  explainText: {
    color: 'rgba(107,107,107,1)',
    fontSize: 9,
    marginLeft: 3,
  },
  mainView: {
    marginTop: 19,
    alignItems: 'center',
  },
  imageShoe: {
    width: 251,
    height: 135,
    right: 20,
  },
  shopTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    marginTop: 9,
  },
  overView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 21,
  },
  overTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: YaHei,
    color: 'rgba(194,0,0,1)',
  },
  overTime: {
    fontSize: 12,
    fontFamily: Mario,
    color: 'rgba(0,0,0,1)',
    marginLeft: 6,
  },
  price: {
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: YaHei,
    color: 'rgba(0,0,0,1)',
    marginTop: 21,
    // textDecorationLine: 'line-through',
    // textDecorationColor: 'rgba(0,0,0,1)',
  },
});
export default connect(mapStateToProps())(withNavigation(ShopBasicInfoCom));
