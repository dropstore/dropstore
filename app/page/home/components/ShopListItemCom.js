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
import { formatDateNoYear } from '../../../utils/commonUtils';

export default class ShopListItemCom extends PureComponent {
  constructor(props) {
    super(props);
    const { item } = this.props;
    const now = Date.now() / 1000;
    this.state = {
      showText: (parseInt(item.end_time) - now < MAX_TIME && item.end_time > now)
        || (parseInt(item.start_time) - now < MAX_TIME && item.start_time > now),
      isStart: item.start_time - Date.now() / 1000 < 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { item } = this.props;
    if (item !== nextProps.item) {
      const now = Date.now() / 1000;
      this.setState({
        showText: (parseInt(nextProps.item.end_time) - now < MAX_TIME && nextProps.item.end_time > now)
        || (parseInt(nextProps.item.start_time) - now < MAX_TIME && nextProps.item.start_time > now),
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
    const { showText, isStart } = this.state;
    return (
      <ScaleView style={styles.scaleView} onPress={this.toShopDetailPage}>
        <FadeImage resizeMode="contain" style={styles.imageShoe} source={{ uri: item.image }} />
        <View style={styles.right}>
          <TitleWithTag text={item.activity_name} bType={item.b_type} sType={item.is_stock} />
          <View style={styles.rightBottom}>
            <Price price={item.price} offsetBottom={3} />
            <Text style={styles.xiegang}>/</Text>
            {
              isStart ? (
                <CountdownCom
                  offset={Platform.OS === 'ios' ? null : -1.8}
                  time={item.end_time}
                  style={styles.time}
                  endTimerText="已结束"
                  notStartTimerText={`${formatDateNoYear(item.end_time)} 结束`}
                />
              ) : (
                <CountdownCom
                  offset={Platform.OS === 'ios' ? null : -1.8}
                  time={item.start_time}
                  finish={this.activityStart}
                  style={styles.time}
                  hasNextTimer
                  notStartTimerText={`${formatDateNoYear(item.start_time)} 开始`}
                />
              )
            }
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
