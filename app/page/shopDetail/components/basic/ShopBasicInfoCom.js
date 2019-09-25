/**
 * @file 商品基本信息组件
 * @date 2019/8/18 16:46
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, View, Platform,
} from 'react-native';
import { FadeImage, CountdownCom } from '../../../../components';
import { YaHei, Mario } from '../../../../res/FontFamily';
import ShopConstant from '../../../../common/ShopConstant';
import { wPx2P } from '../../../../utils/ScreenUtil';
import Colors from '../../../../res/Colors';

export default class ShopBasicInfoCom extends PureComponent {
  constructor(props) {
    super(props);
    const { activityInfo } = this.props;
    this.startTime = Date.now() / 1000 + 5;
    this.endTime = this.startTime + 5;
    this.state = {
      isStart: this.startTime - Date.now() / 1000 < 1,
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
          time={this.endTime}
          prefix="距结束时间:"
          prefixStyle={{ ...styles.overTitle, color: Colors.OTHER_BACK }}
        />
      );
    }
    return (
      <CountdownCom
        finish={this.activityStart}
        style={styles.overTime}
        time={this.startTime}
        prefix={activityInfo.activity.type === ShopConstant.ORIGIN_CONST ? '距发售时间:' : '距开始时间:'}
        prefixStyle={{ ...styles.overTitle, color: '#0084FF' }}
      />
    );
  };

  render() {
    const { activityInfo } = this.props;
    return (
      <View style={styles.mainView}>
        <FadeImage resizeMode="contain" style={styles.imageShoe} source={{ uri: activityInfo.activity.image }} />
        { this.setTimeDOM(activityInfo) }
        <Text style={styles.shopTitle}>{activityInfo.goods.goods_name}</Text>
        <Text style={styles.price}>{`${activityInfo.activity.price / 100}￥`}</Text>
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
  explainText: {
    color: 'rgba(107,107,107,1)',
    fontSize: 9,
    marginLeft: 3,
  },
  mainView: {
    paddingTop: 19,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageShoe: {
    width: wPx2P(251),
    height: wPx2P(135),
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
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: YaHei,
  },
  overTime: {
    fontSize: 16,
    fontFamily: Mario,
    color: 'rgba(0,0,0,1)',
    marginLeft: 6,
    width: 16 * 6.44,
    marginBottom: Platform.OS === 'android' ? 0 : 2,
  },
  price: {
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: YaHei,
    color: 'rgba(0,0,0,1)',
    marginTop: 21,
  },
});
