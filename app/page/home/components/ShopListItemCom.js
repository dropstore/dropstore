/**
 * @file 商品列表组件
 * @date 2019/8/17 19:38
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import ScaleView from '../../../components/ScaleView';
import Image from '../../../components/Image';
import {debounce} from '../../../utils/commonUtils';
import Colors from '../../../res/Colors';
import Images from '../../../res/Images';
import {Mario, YaHei} from '../../../res/FontFamily';
import ShopConstant from '../../../common/ShopConstant';
import {checkTime, countDown, submitFormat} from "../../../utils/TimeUtils";

class ShopListItemCom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDownTime: '',
      endDownTime: '',
    }
  }

  componentDidMount() {
    this._setBuyTimeDOM();
    this._timer = setInterval(() => {
      this._setBuyTimeDOM();
    }, 1000)
  }

  componentWillUnmount() {
    this._timer && clearInterval(this._timer);
  }

  toShopDetailPage = () => {
    const {navigation, item} = this.props;
    navigation.push('shopDetail', {
      rate: '+25',
      shopId: item.id,
      type: item.type,
    });
  };

  _setTimeDOM = (item) => {
    this._setBuyTimeDOM();
    return <Text style={_styles.time}>{submitFormat(item.l_time)}</Text>
  };

  _setBuyTimeDOM = () => {
    const {item} = this.props;
    if (item.type === ShopConstant.SELF_SUPPORT) {
      if (item.b_type === ShopConstant.BUY) {
        // 活动开始时间
        let start_time = item.start_time;
        // 活动结束时间
        let end_time = item.end_time;
        let sTimeStamp = checkTime(start_time);
        let eTimeStamp = checkTime(end_time);
        if (sTimeStamp > 0) {
          this.setState({startDownTime: countDown(sTimeStamp)}, () => {
            return this._setBuyDOM('距开始：', this.state.startDownTime)
          })
        } else if (eTimeStamp > 0) {
          this.setState({endDownTime: countDown(eTimeStamp)}, () => {
            return this._setBuyDOM('距结束：', this.state.endDownTime)
          })
        } else {
          this._timer && clearInterval(this._timer);
          return <Text style={_styles.time}>{submitFormat(item.l_time)}</Text>
        }
      }
    }
  };

  _setBuyDOM = (text, time) => {
    return (
      <View style={_styles.overView}>
        <Text style={_styles.overTitle}>{text}</Text>
        <Text style={_styles.overTime}>{time}</Text>
      </View>
    )
  };

  _setBTypeDOM = (item) => {
    if (item.type === ShopConstant.SELF_SUPPORT) {
      if (item.b_type === ShopConstant.BUY) {
        return <Image style={_styles.statusImage} resizeMode="cover" source={Images.qe}/>
      }
      return <Image style={_styles.statusImage} resizeMode="cover" source={Images.qr}/>
    }
  };

  render() {
    const {item} = this.props;
    return (
      <ScaleView style={_styles.scaleView} onPress={debounce(this.toShopDetailPage)}>
        <Image style={_styles.plusIcon} source={item.leftImage}/>
        <View style={_styles.middle}>
          <View style={{flex: 1}}>
            <Text style={_styles.shopTitle}>{item.activity_name}</Text>
            <Text style={_styles.price}>{`${item.price}￥`}</Text>
            {
              this._setTimeDOM(item)
            }
          </View>
          <Image resizeMode="contain" style={_styles.imageShoe} source={item.image}/>
        </View>
        {
          this._setBTypeDOM(item)
        }
      </ScaleView>
    );
  }
}

const _styles = StyleSheet.create({
  scaleView: {
    marginHorizontal: 10,
    marginBottom: 3,
    backgroundColor: Colors.WHITE_COLOR,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 9,
  },
  middle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  plusIcon: {
    width: 13,
    height: 13,
    marginRight: 9,
    marginLeft: 6,
    marginTop: 4,
  },
  shopTitle: {
    fontSize: 10,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
  },
  imageShoe: {
    width: 92,
    height: 49,
    marginRight: 20,
  },
  statusImage: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 6,
    top: 4,
  },
  price: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,1)',
    marginLeft: 3,
    marginTop: 23,
  },
  time: {
    fontSize: 10,
    color: 'rgba(0,0,0,1)',
    marginTop: 6,
    marginLeft: 2,
  },
  overView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
    marginTop: 6,
  },
  overTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: YaHei,
    color: 'rgba(194,0,0,1)',
  },
  overTime: {
    fontSize: 8,
    fontFamily: Mario,
    color: 'rgba(0,0,0,1)',
    marginLeft: 6,
  },
});

export default withNavigation(ShopListItemCom);
