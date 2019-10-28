import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { STATUSBAR_HEIGHT, getScreenWidth, getScreenHeight } from '../../common/Constant';
import { Image, AvatarWithShadow } from '../../components';
import Images from '../../res/Images';
import { YaHei } from '../../res/FontFamily';
import { wPx2P } from '../../utils/ScreenUtil';
import { getUserInfo } from '../../redux/reselect/userInfo';
import { getUser } from '../../redux/actions/userInfo';
import Colors from '../../res/Colors';

const HEADER_HEIGHT = 44;

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser,
  }, dispatch);
}

class PersonalCenterPage extends PureComponent {
  constructor(props) {
    super(props);
    const { onIndexChange } = this.props;
    this.state = {
      refreshing: false,
    };
    this.list1 = [
      {
        title: '我的库房', icon: 'myWarehouse', route: 'MyGoods', params: { title: '我的库房', onIndexChange },
      },
      {
        title: '我的商品', icon: 'myGoods', route: 'MyGoods', params: { title: '我的商品' },
      },
      {
        title: '我的活动', icon: 'myActivity', route: 'fashounotice',
      },
      {
        title: '提现', icon: 'extract', route: 'BalanceExtract', params: { title: '提现' },
      },
    ];
    this.list2 = [
      {
        title: '我的地址', icon: 'safesetting', route: 'Address', params: { title: '我的地址' },
      },
      {
        title: '系统消息', icon: 'systemnotice', route: 'Message', params: { title: '系统通知', type: 'systemnotice' },
      },
      {
        title: '系统设置', icon: 'safesetting', route: 'Safesetting', params: { title: '系统设置', onIndexChange },
      },
    ];
  }

  onPress = (v) => {
    const { navigation, onIndexChange } = this.props;
    if (v.route === 'fashounotice') {
      onIndexChange(3);
    } else {
      navigation.navigate(v.route, v.params);
    }
  }

  onRefresh = () => {
    const { getUser } = this.props;
    this.setState({ refreshing: true });
    getUser().then(() => {
      this.setState({ refreshing: false });
    });
  }

  toBalanceDetail = () => {
    const { navigation, getUser } = this.props;
    getUser();
    navigation.navigate('BalanceDetail', { title: '明细' });
  }

  render() {
    const { navigation, userInfo } = this.props;
    const { refreshing } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={(
            <RefreshControl
              tintColor={Colors.YELLOW}
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
        )}
        >
          <View style={styles.header}>
            <View style={styles.headerWrapper}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <AvatarWithShadow
                  source={{ uri: userInfo.avatar }}
                  size={userInfo.avatar !== -1 ? wPx2P(47) : wPx2P(36)}
                />
                <View style={{ alignSelf: 'flex-end', marginLeft: wPx2P(14) }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.name}>{`${userInfo.user_name || `Droper${(userInfo.id || '').padStart(6, '100000')}`}`}</Text>
                    <Image style={{ height: 12, width: 12, marginLeft: 5 }} source={userInfo.sex === '女' ? Images.littleGirl : Images.littleBoy} />
                    {userInfo.age * 1 > 0 && <Text style={{ color: '#bbb', fontSize: 11, marginLeft: 5 }}>{`${userInfo.age}岁`}</Text>}
                  </View>
                  <Text style={styles.id}>{`ID: ${(userInfo.id || '').padStart(6, '100000')}`}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Setting', { title: '个人资料' })} style={styles.editWrapper}>
                <Text style={styles.edit}>编辑资料</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hengtiao} />
            <View style={styles.walletWrapper}>
              <TouchableOpacity style={styles.walletLeft} onPress={this.toBalanceDetail}>
                <Text style={styles.moeny}>{(userInfo.balance / 100).toFixed(2)}</Text>
                <Text style={styles.moenyText}>账户总余额(￥)</Text>
              </TouchableOpacity>
              <View style={styles.shutiao} />
              <TouchableOpacity
                style={styles.walletLeft}
                onPress={() => navigation.navigate('Web', { url: 'http://m.dropstore.cn/index.html#/drawlots', title: '中签率说明' })}
              >
                <Text style={styles.moeny}>{(userInfo.zqrate * 1).toFixed(2)}</Text>
                <Text style={styles.moenyText}>我的中签率</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: '300%', backgroundColor: Colors.MAIN_BACK, paddingTop: 7 }}>
            <View style={styles.list1}>
              {
              this.list1.map((v, i) => (
                <TouchableOpacity
                  key={v.title}
                  onPress={() => this.onPress(v)}
                  style={[styles.list1Item, {
                    borderRightWidth: i % 2 === 1 ? 0 : StyleSheet.hairlineWidth,
                    borderBottomWidth: [0, 1].includes(i) ? StyleSheet.hairlineWidth : 0,
                  }]}
                >
                  <Image style={styles.itemIcon} source={Images[v.icon]} />
                  <Text style={styles.itemTitle}>{v.title}</Text>
                </TouchableOpacity>
              ))
            }
            </View>
            <View style={styles.list2}>
              {
              this.list2.map((v, i) => (
                <TouchableOpacity
                  onPress={() => this.onPress(v)}
                  key={v.title}
                  style={styles.list2Item}
                >
                  <Image style={{ ...styles.itemIcon, marginRight: wPx2P(21) }} source={Images[v.icon]} />
                  <View
                    style={[styles.list2ItemRight, {
                      borderBottomWidth: i === this.list2.length - 1 ? 0 : StyleSheet.hairlineWidth,
                    }]}
                  >
                    <Text style={[styles.itemTitle, { marginLeft: 5 }]}>{v.title}</Text>
                    <Image source={Images.iconRight} style={styles.right} />
                  </View>

                </TouchableOpacity>
              ))
            }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: '#fff',
  },
  editWrapper: {
    height: wPx2P(25),
    paddingHorizontal: wPx2P(6),
    borderColor: '#C5C4C4',
    borderWidth: 1,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    color: '#8F8F8F',
    fontSize: wPx2P(10),
  },
  header: {
    paddingTop: wPx2P(31),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {
    paddingTop: STATUSBAR_HEIGHT,
    color: '#fff',
    fontSize: wPx2P(16),
    textAlign: 'center',
    fontFamily: YaHei,
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
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: wPx2P(27),
  },
  name: {
    fontSize: wPx2P(15),
    color: '#272727',
    fontFamily: YaHei,
  },
  id: {
    fontSize: wPx2P(10),
    color: '#C0C0C0',
    marginBottom: wPx2P(1),
    marginTop: wPx2P(1),
  },
  hengtiao: {
    height: 1,
    width: wPx2P(getScreenWidth() - 8),
    backgroundColor: '#E3E3E3',
    marginTop: wPx2P(23),
  },
  shutiao: {
    height: wPx2P(47),
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#aaa',
    marginVertical: 10,
  },
  walletWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: getScreenWidth(),
  },
  walletLeft: {
    flex: 1,
    paddingLeft: 27,
    justifyContent: 'center',
  },
  moeny: {
    fontSize: wPx2P(18),
    marginBottom: wPx2P(8),
    fontFamily: YaHei,
  },
  moenyText: {
    fontSize: wPx2P(11),
    color: '#8F8F8F',
  },
  list1Item: {
    width: (getScreenWidth() - 8) / 2,
    height: 54,
    alignItems: 'center',
    borderRightColor: '#bbb',
    borderBottomColor: '#bbb',
    flexDirection: 'row',
    paddingLeft: wPx2P(23),
  },
  containerStyle: {
    backgroundColor: '#fff',
    paddingBottom: 7.5,
  },
  groupTitleWrapper: {
    paddingLeft: 11,
    paddingVertical: 5,
    borderBottomColor: '#bbb',
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
    fontSize: 13,
  },
  itemIcon: {
    width: wPx2P(18),
    height: wPx2P(18),
    marginRight: wPx2P(26),
  },
  placeholder: {
    height: getScreenHeight(),
    width: getScreenWidth(),
    position: 'absolute',
  },
  list1: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#fff',
  },
  list2: {
    paddingLeft: 27,
    marginTop: 7,
    backgroundColor: '#fff',
  },
  list2Item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list2ItemRight: {
    borderBottomColor: '#bbb',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    flexDirection: 'row',
  },
  right: {
    height: 9,
    width: 6,
    marginRight: 27,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalCenterPage);
