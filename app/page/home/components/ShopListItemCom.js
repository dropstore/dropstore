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
import { Aldrich, YaHei } from '../../../res/FontFamily';
import { getScreenWidth, MAX_TIME } from '../../../common/Constant';
import TitleWithTag from './TitleWithTag';
import { formatDate } from '../../../utils/commonUtils';

export default class ShopListItemCom extends PureComponent {
  constructor(props) {
    super(props);
    const { item } = this.props;
    const now = Date.now() / 1000;
    this.state = {
      isStart: item.start_time - Date.now() / 1000 < 1,
      showText: (parseInt(item.end_time) - now < MAX_TIME && item.end_time > now)
        || (parseInt(item.start_time) - now < MAX_TIME && item.start_time > now),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { item } = this.props;
    const now = Date.now() / 1000;
    if (item !== nextProps.item) {
      this.setState({
        isStart: nextProps.item.start_time - Date.now() / 1000 < 1,
        showText: (parseInt(nextProps.item.end_time) - now < MAX_TIME && nextProps.item.end_time > now)
          || (parseInt(nextProps.item.start_time) - now < MAX_TIME && nextProps.item.start_time > now),
      });
    }
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
    const { item } = this.props;
    const now = Date.now() / 1000;
    this.setState({
      isStart: true,
      showText: (parseInt(item.end_time) - now < MAX_TIME && item.end_time > now)
          || (parseInt(item.start_time) - now < MAX_TIME && item.start_time > now),
    });
  }

  render() {
    const { item, index } = this.props;
    const { isStart, showText } = this.state;
    return (
      <ScaleView style={{ ...styles.scaleView, marginLeft: index % 2 === 0 ? 8 : 9 }} onPress={this.toShopDetailPage}>
        <TitleWithTag text={item.activity_name} bType={item.b_type} />
        <View>
          <View style={{ marginTop: 5 }}>
            <FadeImage resizeMode="contain" style={styles.imageShoe} source={{ uri: item.icon }} />
            <Image style={styles.qihuo} source={item.is_stock === '2' ? require('../../../res/image/qihuo.png') : require('../../../res/image/xianhuo.png')} />
          </View>
          <View style={styles.bottom}>
            <Price price={item.price} offsetBottom={3} />
            <View style={styles.rightBottom}>
              {
                showText && (
                  <View style={[styles.biankuang, { borderColor: isStart ? Colors.YELLOW : '#0084FF' }]}>
                    <Text style={{ color: isStart ? Colors.YELLOW : '#0084FF', fontSize: 7, textAlign: 'right' }}>
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
          </View>
        </View>
      </ScaleView>
    );
  }
}

const styles = StyleSheet.create({
  rightBottom: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
  time: {
    fontFamily: Aldrich,
    fontSize: 12,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qihuo: {
    height: 23,
    width: 41,
    position: 'absolute',
    right: 0,
  },
  shopTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    textAlign: 'justify',
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
  },
});
