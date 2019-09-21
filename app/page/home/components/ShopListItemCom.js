import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, View, Platform,
} from 'react-native';
import {
  ScaleView, FadeImage, Price, CountdownCom,
} from '../../../components';
import { wPx2P } from '../../../utils/ScreenUtil';
import { showToast } from '../../../utils/MutualUtil';
import Colors from '../../../res/Colors';
import { Aldrich, YaHei } from '../../../res/FontFamily';
import { MARGIN_HORIZONTAL, MAX_TIME } from '../../../common/Constant';
import TitleWithTag from './TitleWithTag';

export default class ShopListItemCom extends PureComponent {
  constructor(props) {
    super(props);
    const { item } = this.props;
    const now = Date.now() / 1000;
    const isStart = parseInt(item.start_time) < now;
    const time = isStart ? item.end_time : item.start_time;
    if (now > parseInt(item.end_time)) {
      this.end = true;
    }
    this.state = {
      showText: (isStart && now < parseInt(item.end_time)) || (parseInt(item.start_time) - now < MAX_TIME && !isStart),
      time,
      isStart,
    };
  }

  toShopDetailPage = () => {
    if (this.end) {
      showToast('活动已结束');
      return;
    }
    const { navigation, item } = this.props;
    navigation.navigate('shopDetail', {
      title: '商品详情',
      rate: '+25',
      shopId: item.id,
      type: item.type,
    });
  };

  finish = () => {
    const { item } = this.props;
    const now = Date.now() / 1000 + 1;
    const isStart = parseInt(item.start_time) < now;
    const time = isStart ? item.end_time : item.start_time;
    if (now > parseInt(item.end_time)) {
      this.end = true;
    }
    this.setState({
      showText: (isStart && now < parseInt(item.end_time)) || (parseInt(item.start_time) - now < MAX_TIME && !isStart),
      time,
      isStart,
    });
  }

  render() {
    const { item } = this.props;
    const { time, showText, isStart } = this.state;
    return (
      <ScaleView style={styles.scaleView} onPress={this.toShopDetailPage}>
        <FadeImage resizeMode="contain" style={styles.imageShoe} source={{ uri: item.image }} />
        <View style={styles.right}>
          <TitleWithTag text={item.activity_name} bType={item.b_type} sType={item.is_stock} />
          <View style={styles.rightBottom}>
            <Price price={item.price} offsetBottom={3} />
            <Text style={styles.xiegang}>/</Text>
            <CountdownCom startTime={item.start_time} endTime={item.end_time} isStart={isStart} finish={this.finish} style={styles.time} time={time} />
          </View>
          {
            showText && (
              <Text style={{ color: isStart ? Colors.OTHER_BACK : '#0084FF', fontSize: 7, textAlign: 'right' }}>
                {`${isStart ? '距活动结束' : '距活动开始'}`}
              </Text>
            )
          }
        </View>
      </ScaleView>
    );
  }
}

const styles = StyleSheet.create({
  rightBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  scaleView: {
    marginHorizontal: MARGIN_HORIZONTAL,
    backgroundColor: Colors.WHITE_COLOR,
    flexDirection: 'row',
    marginTop: 7,
    padding: 10,
    paddingBottom: 7,
    borderRadius: 2,
    overflow: 'hidden',
    alignItems: 'center',
  },
  time: {
    fontFamily: Aldrich,
    fontSize: 14,
  },
  right: {
    flex: 1,
  },
  shopTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    textAlign: 'justify',
  },
  imageShoe: {
    width: wPx2P(113),
    height: wPx2P(65),
    marginRight: 15,
  },
  xiegang: {
    marginLeft: 5,
    fontSize: Platform.OS === 'ios' ? 10 : 11,
    lineHeight: 17,
    fontWeight: 'bold',
  },
});
