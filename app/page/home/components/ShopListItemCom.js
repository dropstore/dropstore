import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, View, Platform,
} from 'react-native';
import {
  ScaleView, FadeImage, Price, CountdownCom, Image,
} from '../../../components';
import { wPx2P } from '../../../utils/ScreenUtil';
import { showToast } from '../../../utils/MutualUtil';
import Colors from '../../../res/Colors';
import { Aldrich, RuiXian } from '../../../res/FontFamily';
import { getScreenWidth, MAX_TIME } from '../../../common/Constant';
import { formatDate } from '../../../utils/commonUtils';

export default class ShopListItemCom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isStartState: null,
    };
  }

  toShopDetailPage = () => {
    const { navigation, item, onPress } = this.props;
    if (Date.now() / 1000 - item.end_time > -1) {
      showToast('活动已结束');
      return;
    }
    if (onPress) {
      onPress();
      return;
    }
    navigation.navigate('shopDetail', {
      title: '商品详情',
      rate: '+25',
      shopId: item.id,
      type: item.type,
    });
  };

  activityStart = () => {
    this.setState({
      isStartState: true,
    });
  }

  render() {
    const { item, index } = this.props;
    const { isStartState } = this.state;
    const now = Date.now() / 1000;
    const isStart = isStartState || item.start_time - now < 1;
    const showText = (parseInt(item.end_time) - now < MAX_TIME && item.end_time > now)
    || (parseInt(item.start_time) - now < MAX_TIME && item.start_time > now);

    return (
      <ScaleView style={{ ...styles.scaleView, marginLeft: index % 2 === 0 ? 8 : 9 }} onPress={this.toShopDetailPage}>
        <Text style={styles.shopTitle} numberOfLines={2}>{item.activity_name}</Text>
        <View>
          <View>
            <FadeImage resizeMode="contain" style={styles.imageShoe} source={{ uri: item.icon }} />
            <Image
              style={styles.qian}
              source={item.b_type === '2' ? require('../../../res/image/tag-qiang.png') : require('../../../res/image/tag-qian.png')}
            />
          </View>
          <View style={styles.bottom}>
            <View style={styles.rightBottom}>
              {
                showText && (
                  <View style={[styles.biankuang, { borderColor: isStart ? Colors.YELLOW : '#0084FF' }]}>
                    <Text style={{ color: isStart ? Colors.YELLOW : '#0084FF', fontSize: 7 }}>
                      {`${isStart ? '距活动结束' : '距活动开始'}`}
                    </Text>
                  </View>
                )
              }
              {
                isStart ? (
                  <CountdownCom
                    offset={Platform.OS === 'ios' ? null : -1.8}
                    time={item.end_time}
                    style={{ ...styles.time, color: '#C51616' }}
                    endTimerText="已结束"
                    notStartTimerText={`${formatDate(item.end_time, 'MM月dd日')} 结束`}
                  />
                ) : (
                  <CountdownCom
                    offset={Platform.OS === 'ios' ? null : -1.8}
                    time={item.start_time}
                    finish={this.activityStart}
                    style={{ ...styles.time, color: '#0084FF' }}
                    hasNextTimer
                    notStartTimerText={`${formatDate(item.start_time, 'MM月dd日')}开始`}
                  />
                )
              }
            </View>
            <Price price={item.price} offsetBottom={3} />
          </View>
        </View>
      </ScaleView>
    );
  }
}

const styles = StyleSheet.create({
  rightBottom: {
    justifyContent: 'flex-end',
  },
  scaleView: {
    backgroundColor: Colors.WHITE_COLOR,
    marginTop: 7,
    padding: 10,
    paddingBottom: 7,
    borderRadius: 2,
    overflow: 'hidden',
    width: (getScreenWidth() - 26) / 2,
    justifyContent: 'space-between',
  },
  shopTitle: {
    fontSize: 13,
    fontFamily: RuiXian,
    textAlign: 'justify',
    lineHeight: 14,
  },
  time: {
    fontFamily: Aldrich,
    fontSize: 12,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qian: {
    height: wPx2P(18),
    width: wPx2P(63),
    position: 'absolute',
    right: 0,
  },
  imageShoe: {
    width: wPx2P(129),
    height: wPx2P(80),
    alignSelf: 'center',
  },
  xiegang: {
    marginLeft: 5,
    fontSize: Platform.OS === 'ios' ? 10 : 11,
    lineHeight: 17,
    fontWeight: 'bold',
  },
  biankuang: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    paddingHorizontal: 1,
    alignSelf: 'flex-start',
  },
});
