/**
 * @file 商品列表组件
 * @date 2019/8/17 19:38
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import ScaleView from '../../../components/ScaleView';
import Image from '../../../components/Image';
import { debounce } from '../../../utils/commonUtils';
import Colors from '../../../res/Colors';
import Images from '../../../res/Images';
import { Mario, YaHei } from '../../../res/FontFamily';
import ShopConstant from '../../../common/ShopConstant';
import { MARGIN_HORIZONTAL } from '../../../common/Constant';
import { checkTime, countDown, submitFormat } from '../../../utils/TimeUtils';

class ShopListItemCom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDownTime: '',
      endDownTime: '',
    };
  }

  componentDidMount() {
    this._setBuyTimeDOM();
    this._timer = setInterval(() => {
      this._setBuyTimeDOM();
    }, 1000);
  }

  componentWillUnmount() {
    this._timer && clearInterval(this._timer);
  }

  toShopDetailPage = () => {
    const { navigation, item } = this.props;
    navigation.navigate('shopDetail', {
      title: '商品详情',
      rate: '+25',
      shopId: item.id,
      type: item.type,
    });
  };

  _setTimeDOM = (item) => {
    this._setBuyTimeDOM();
    return <Text style={_styles.time}>{submitFormat(item.l_time)}</Text>;
  };

  _setBuyTimeDOM = () => {
    const { item } = this.props;
    const { startDownTime, endDownTime } = this.state;
    if (item.type === ShopConstant.SELF_SUPPORT) {
      if (item.b_type === ShopConstant.BUY) {
        // 活动开始时间
        const start_time = item.start_time;
        // 活动结束时间
        const end_time = item.end_time;
        const sTimeStamp = checkTime(start_time);
        const eTimeStamp = checkTime(end_time);
        if (sTimeStamp > 0) {
          this.setState({ startDownTime: countDown(sTimeStamp) }, () => this._setBuyDOM('距开始：', startDownTime));
        } else if (eTimeStamp > 0) {
          this.setState({ endDownTime: countDown(eTimeStamp) }, () => this._setBuyDOM('距结束：', endDownTime));
        } else {
          this._timer && clearInterval(this._timer);
          return <Text style={_styles.time}>{submitFormat(item.l_time)}</Text>;
        }
      }
    }
  };

  _setBuyDOM = (text, time) => (
    <View style={_styles.overView}>
      <Text style={_styles.overTitle}>{text}</Text>
      <Text style={_styles.overTime}>{time}</Text>
    </View>
  );

  _setBTypeDOM = (item) => {
    if (item.type === ShopConstant.SELF_SUPPORT) {
      if (item.b_type === ShopConstant.BUY) {
        return <Image style={_styles.statusImage} resizeMode="cover" source={Images.qe} />;
      } if (item.b_type === ShopConstant.DRAW) {
        return <Image style={_styles.statusImage} resizeMode="cover" source={Images.qr} />;
      }
    }
  };

  render() {
    const { item } = this.props;
    return (
      <ScaleView style={_styles.scaleView} onPress={debounce(this.toShopDetailPage)}>
        <Image style={_styles.plusIcon} source={Images.xh} />
        <View style={_styles.middle}>
          <View style={{ flex: 1 }}>
            <Text style={_styles.shopTitle}>{item.activity_name}</Text>
            <Text style={_styles.price}>{`${item.price / 100}￥`}</Text>
            {
              this._setTimeDOM(item)
            }
          </View>
          {/* <Image resizeMode="contain" style={_styles.imageShoe} source={item.image}/> */}
          <Image resizeMode="contain" style={_styles.imageShoe} source={Images.shoe} />
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
    marginHorizontal: MARGIN_HORIZONTAL,
    backgroundColor: Colors.WHITE_COLOR,
    flexDirection: 'row',
    marginTop: 7,
    paddingVertical: 9,
    borderRadius: 2,
    overflow: 'hidden',
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
    marginTop: 3,
  },
  shopTitle: {
    fontSize: 13,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
  },
  imageShoe: {
    width: 92,
    height: 49,
    marginRight: 30,
  },
  statusImage: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 6,
    top: 7,
  },
  price: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,1)',
    marginLeft: 3,
    marginTop: 13,
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
