import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FadeImage, CountdownCom } from '../../../components';
import { YaHei } from '../../../res/FontFamily';
import ShopConstant from '../../../common/ShopConstant';
import { wPx2P } from '../../../utils/ScreenUtil';
import { formatDate } from '../../../utils/commonUtils';
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
          prefix={activityInfo.activity.b_type === 1 ? '抽签参与中:' : '距结束时间:'}
          format="dd天hh时mm分ss秒"
          notStartTimerText={`${formatDate(activityInfo.activity.end_time, 'MM/dd hh:mm:ss')} 结束`}
          endTimerText="活动已结束"
          prefixStyle={{ ...styles.overTitle, color: Colors.YELLOW }}
        />
      );
    }
    return (
      <CountdownCom
        hasNextTimer
        notStartTimerText={`${formatDate(activityInfo.activity.start_time, 'MM/dd hh:mm:ss')}
        ${activityInfo.activity.type === ShopConstant.ORIGIN_CONST ? '发售' : '开始'}`}
        finish={this.activityStart}
        style={styles.overTime}
        format="dd天hh时mm分ss秒"
        time={activityInfo.activity.start_time}
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
        <Text style={styles.price}>
          {`${activityInfo.activity.price / 100}￥`}
          <Text style={styles.shopTitle}>起</Text>
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
    width: wPx2P(375),
    height: wPx2P(300),
    marginBottom: 10,
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
    fontSize: 10,
    fontFamily: YaHei,
  },
  overTime: {
    fontSize: 17,
    fontFamily: YaHei,
    color: 'rgba(0,0,0,1)',
    marginLeft: 6,
  },
  price: {
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: YaHei,
    color: 'rgba(0,0,0,1)',
    marginTop: 21,
  },
});
