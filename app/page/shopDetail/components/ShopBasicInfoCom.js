import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CountdownCom, ImageBackground } from '../../../components';
import { YaHei } from '../../../res/FontFamily';
import ShopConstant from '../../../common/ShopConstant';
import { wPx2P } from '../../../utils/ScreenUtil';
import Colors from '../../../res/Colors';

export default class ShopBasicInfoCom extends PureComponent {
  constructor(props) {
    super(props);
    const { activityInfo } = this.props;
    this.state = {
      isStart: activityInfo.activity.start_time - Date.now() / 1000 < 1,
    };
  }

  activityStart = () => {
    this.setState({ isStart: true });
  }

  setTimeDOM = (activityInfo) => {
    const { isStart } = this.state;
    if (isStart) {
      return (
        <CountdownCom
          style={styles.overTime}
          time={activityInfo.activity.end_time}
          prefix={activityInfo.activity.b_type === 1 ? '抽签参与中' : '距结束时间'}
          // format="dd天hh时mm分ss秒"
          format="hh : mm : ss"
          endTimerText="活动已结束"
          noMax
          prefixStyle={{ ...styles.overTitle, color: Colors.YELLOW }}
        />
      );
    }
    return (
      <CountdownCom
        hasNextTimer
        noMax
        finish={this.activityStart}
        style={styles.overTime}
        // format="dd天hh时mm分ss秒"
        format="hh : mm : ss"
        time={activityInfo.activity.start_time}
        prefix={activityInfo.activity.type === ShopConstant.ORIGIN_CONST ? '距发售时间' : '距开始时间'}
        prefixStyle={{ ...styles.overTitle, color: Colors.YELLOW }}
      />
    );
  };

  render() {
    const { activityInfo } = this.props;
    return (
      <View>
        <ImageBackground useFadeImage source={{ uri: activityInfo.activity.image }} style={styles.imageShoe}>
          {/* <Image style={styles.iconMask} source={require('../../../res/image/icon_mask.png')} /> */}
        </ImageBackground>
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={styles.shopTitle}>{activityInfo.activity.activity_name}</Text>
          { this.setTimeDOM(activityInfo) }
          <Text style={{ fontSize: 13, marginTop: 3, lineHeight: 15 }}>{activityInfo.goods.goods_name}</Text>
        </View>
        <Text style={styles.price}>
          {`${activityInfo.activity.price / 100}￥`}
          <Text style={{ fontSize: 10, color: Colors.YELLOW }}>起</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  iconMask: {
    width: 42,
    height: 42,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  explainText: {
    color: 'rgba(107,107,107,1)',
    fontSize: 9,
    marginLeft: 3,
  },
  imageShoe: {
    width: wPx2P(375),
    height: wPx2P(250),
  },
  shopTitle: {
    fontSize: 15,
    fontFamily: YaHei,
    lineHeight: 18,
  },
  overView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 21,
  },
  overTitle: {
    fontSize: 15,
    fontFamily: YaHei,
  },
  overTime: {
    fontSize: 25,
    fontFamily: YaHei,
    marginLeft: 6,
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: YaHei,
    color: Colors.YELLOW,
    alignSelf: 'flex-end',
    marginRight: 13,
    marginBottom: 15,
  },
});
