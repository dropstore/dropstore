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
import { getScreenWidth } from '../../../common/Constant';
import TitleWithTag from './TitleWithTag';
import { formatDate } from '../../../utils/commonUtils';

export default class ShopListItemCom extends PureComponent {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      isStart: item.start_time - Date.now() / 1000 < 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { item } = this.props;
    if (item !== nextProps.item) {
      this.setState({
        isStart: nextProps.item.start_time - Date.now() / 1000 < 1,
      });
    }
  }

  toShopDetailPage = () => {
    const { navigation, item } = this.props;
    if (Date.now() / 1000 - item.end_time > -1) {
      showToast('活动已结束');
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
    this.setState({ isStart: true });
  }

  render() {
    const { item } = this.props;
    const { isStart } = this.state;
    return (
      <ScaleView style={styles.scaleView} onPress={this.toShopDetailPage}>
        <TitleWithTag text={item.activity_name} bType={item.b_type} />
        <View style={{ marginTop: 5 }}>
          <FadeImage resizeMode="contain" style={styles.imageShoe} source={{ uri: item.icon }} />
          <Image style={styles.qihuo} source={item.is_stock === '2' ? require('../../../res/image/qihuo.png') : require('../../../res/image/xianhuo.png')} />
        </View>
        <View style={styles.bottom}>
          <Price price={item.price} offsetBottom={3} />
          <View style={styles.rightBottom}>
            <Text style={{ color: isStart || item.b_type === '1' ? Colors.OTHER_BACK : '#0084FF', fontSize: 7, textAlign: 'right' }}>
              {`${isStart ? '距活动结束' : '距活动开始'}`}
            </Text>
            {
              isStart ? (
                <CountdownCom
                  offset={Platform.OS === 'ios' ? null : -1.8}
                  time={item.end_time}
                  style={styles.time}
                  endTimerText="已结束"
                  notStartTimerText={`${formatDate(item.end_time, 'MM/dd')} 结束`}
                />
              ) : (
                <CountdownCom
                  offset={Platform.OS === 'ios' ? null : -1.8}
                  time={item.start_time}
                  finish={this.activityStart}
                  style={styles.time}
                  hasNextTimer
                  notStartTimerText={`${formatDate(item.start_time, 'MM/dd')} 开始`}
                />
              )
            }
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
    marginLeft: 8,
    paddingBottom: 7,
    borderRadius: 2,
    overflow: 'hidden',
    width: (getScreenWidth() - 26) / 2,
  },
  time: {
    fontFamily: Aldrich,
    fontSize: 14,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qihuo: {
    height: 23,
    width: 41,
    alignSelf: 'flex-end',
    position: 'absolute',
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
});
