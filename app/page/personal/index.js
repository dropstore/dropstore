import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, Platform, TouchableOpacity, Animated,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { STATUSBAR_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../common/Constant';
import ImageBackground from '../../components/ImageBackground';
import Image from '../../components/Image';
import Images from '../../res/Images';
import { YaHei } from '../../res/FontFamily';
import { wPx2P } from '../../utils/ScreenUtil';
import Colors from '../../res/Colors';

const HEADER_HEIGHT = 44;

const list1 = [
  {
    title: '未完成', icon: 'uncomplete', route: 'OrderState', params: { title: '购买记录', type: 'uncomplete' },
  },
  {
    title: '待收货', icon: 'daishouhuo', route: 'OrderState', params: { title: '购买记录', type: 'daishouhuo' },
  },
  {
    title: '已完成', icon: 'completed', route: 'OrderState', params: { title: '购买记录', type: 'completed' },
  },
  // { title: '我的活动', icon: 'myActivity' },
  {
    title: '我的库房', icon: 'myWarehouse', route: 'OrderState', params: { title: '我的库房' },
  },
  // { title: '提现', icon: 'extract' },
  // { title: '我的商品', icon: 'myGoods' },
  // { title: '帮助中心', icon: 'helper' },
];

const list2 = [
  {
    title: '发售通知', icon: 'fashounotice', route: 'Notice', params: { title: '发售通知', type: 'fashounotice' },
  },
  {
    title: '活动通知', icon: 'activitynotice', route: 'Notice', params: { title: '活动通知', type: 'activitynotice' },
  },
  {
    title: '系统通知', icon: 'systemnotice', route: 'Notice', params: { title: '系统通知', type: 'systemnotice' },
  },
];

const list3 = [
  {
    title: '个人设置', icon: 'setting', route: 'Setting', params: { title: '个人设置' },
  },
  // { title: '中签率说明', icon: 'illustration' },
  {
    title: '我的地址', icon: 'address', route: 'Address', params: { title: '我的地址' },
  },
  {
    title: '安全设置', icon: 'safesetting', route: 'Safesetting', params: { title: '安全设置' },
  },
];

const list = [
  { title: '我的记录', list: list1 },
  { title: '新消息通知', list: list2 },
  { title: '设置中心', list: list3 },
];

class PersonalCenterPage extends PureComponent {
  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0);
  }

  render() {
    const translateY = this.scrollY.interpolate({
      inputRange: [STATUSBAR_HEIGHT + HEADER_HEIGHT - SCREEN_HEIGHT, 0],
      outputRange: [0, STATUSBAR_HEIGHT - SCREEN_HEIGHT + HEADER_HEIGHT],
      extrapolate: 'clamp',
    });
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.placeholder, { transform: [{ translateY }] }]} />
        <Text style={styles.headerTitle}>个人中心</Text>
        <Animated.ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
            { listener: this.onScroll, useNativeDriver: true })
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.headerWrapper}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <ImageBackground style={styles.frameHead} source={Images.frameHead}>
                  <Image source={Images.iconBoy} style={{ height: wPx2P(47.2), width: wPx2P(52.8) }} />
                </ImageBackground>
                <View style={{ alignSelf: 'flex-end', marginLeft: 10 }}>
                  <Text style={styles.name}>User Name</Text>
                  <Text style={styles.id}>ID:636574</Text>
                </View>
              </View>
              <ImageBackground style={styles.frameWallet} source={Images.frameWallet}>
                <Image source={Images.wallet} style={{ height: wPx2P(12), width: wPx2P(14), marginBottom: 1 }} />
                <Text style={{ fontSize: wPx2P(10), color: '#fff' }}>钱包</Text>
              </ImageBackground>
            </View>
            <View style={styles.hengtiao} />
            <View style={styles.walletWrapper}>
              <View style={styles.walletLeft}>
                <Text style={styles.moeny}>0.00</Text>
                <Text style={styles.moenyText}>账户余额(￥)</Text>
              </View>
              <View style={styles.shutiao} />
              <View style={styles.walletLeft}>
                <Text style={styles.moeny}>0.00</Text>
                <Text style={styles.moenyText}>中签倍数(倍)</Text>
              </View>
            </View>
          </View>
          {
            list.map(group => (
              <View key={group.title} style={styles.list}>
                <View style={styles.groupTitleWrapper}>
                  <Text style={styles.groupTitle}>{group.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: wPx2P(10) }}>
                  {
                    group.list.map(v => (
                      <TouchableOpacity onPress={() => navigation.navigate(v.route, v.params)} style={styles.itemWrapper} key={v.icon}>
                        <Image style={styles.itemIcon} source={Images[v.icon]} />
                        <Text style={styles.itemTitle}>{v.title}</Text>
                      </TouchableOpacity>
                    ))
                  }
                </View>
              </View>
            ))
          }
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: Colors.OTHER_BACK,
    marginBottom: 15,
  },
  headerTitle: {
    paddingTop: STATUSBAR_HEIGHT,
    color: '#fff',
    fontSize: wPx2P(16),
    textAlign: 'center',
    fontFamily: YaHei,
    backgroundColor: Colors.OTHER_BACK,
    height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
    lineHeight: HEADER_HEIGHT,
  },
  frameWallet: {
    height: wPx2P(17),
    width: wPx2P(53),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wPx2P(7),
    justifyContent: 'space-between',
  },
  frameHead: {
    height: wPx2P(59),
    width: wPx2P(61),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    paddingHorizontal: wPx2P(22),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: wPx2P(14),
    color: '#fff',
    fontFamily: YaHei,
  },
  id: {
    fontSize: wPx2P(12),
    color: '#fff',
  },
  hengtiao: {
    height: 2,
    width: wPx2P(SCREEN_WIDTH - 26),
    borderRadius: 2,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginTop: wPx2P(20),
  },
  shutiao: {
    height: wPx2P(49),
    width: 2,
    borderRadius: 2,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  walletWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH,
    marginVertical: wPx2P(8),
  },
  walletLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moeny: {
    fontSize: wPx2P(24),
    color: '#fff',
    fontFamily: YaHei,
  },
  moenyText: {
    fontSize: wPx2P(13),
    color: '#fff',
  },
  itemWrapper: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7.5,
  },
  list: {
    backgroundColor: '#fff',
    marginHorizontal: wPx2P(13),
    borderRadius: 5,
    paddingBottom: 7.5,
    marginBottom: wPx2P(25),
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(211, 211, 211)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
      },
      android: {
        elevation: 1.5,
        position: 'relative',
      },
    }),
  },
  groupTitleWrapper: {
    paddingLeft: 14,
    paddingVertical: 5,
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 7.5,
  },
  groupTitle: {
    color: '#010101',
    fontSize: 14,
    fontFamily: YaHei,
    fontWeight: '500',
  },
  itemTitle: {
    color: '#000',
    fontSize: 11,
  },
  itemIcon: {
    width: wPx2P(36),
    height: wPx2P(37),
  },
  placeholder: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.OTHER_BACK,
    position: 'absolute',
  },
});

export default withNavigation(PersonalCenterPage);
