/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clear from 'react-native-clear-cache';
import Image from '../../components/Image';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { updateUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';

const bottomList = [
  { title: '切换账号', name: 'changeAccount' },
  { title: '退出登录', name: 'logout' },
];

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser,
  }, dispatch);
}

class Safesetting extends PureComponent {
  constructor(props) {
    super(props);
    const { userInfo } = this.props;
    this.state = {
      cache: 0,
      unit: '',
      list: [
        [
          { title: '交易密码', name: 'name' },
        ], [
          { title: '绑定微信', name: 'wx', value: userInfo.wx_openid },
        ], [
          { title: '清理内存', name: 'clearCache' },
          { title: '关于Drop store', name: 'age' },
          { title: '帮助与反馈', name: 'size' },
        ],
      ],
    };
  }

  componentDidMount() {
    clear.getCacheSize((cache, unit) => {
      this.setState({ cache, unit });
    });
  }

  onPress = (type) => {
    if (type === 'clearCache') {
      clear.runClearCache(() => {
        clear.getCacheSize((cache, unit) => {
          this.setState({ cache, unit });
        });
      });
    }
  }

  render() {
    const { list, cache, unit } = this.state;
    return (
      <View style={styles.container}>
        <View>
          {
            list.map((group, i) => (
              <View key={`group${i}`} style={{ marginBottom: 15 }}>
                {
                  group.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => this.onPress(item.name)}
                      key={item.name}
                      style={[styles.itemWrapper, { marginBottom: item.name === 'avatar' ? 7 : 2 }]}
                    >
                      <Text style={styles.text}>{item.title}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {item.name === 'wx' && <Text style={{ color: '#BDBDBD', fontSize: 12 }}>{item.value ? '已绑定' : '未绑定'}</Text>}
                        {item.name === 'clearCache' && <Text style={{ color: '#BDBDBD', fontSize: 12 }}>{cache + unit}</Text>}
                        <Image source={Images.iconRight} style={styles.right} />
                      </View>
                    </TouchableOpacity>
                  ))
                }
              </View>
            ))
          }
        </View>
        <View style={{ marginBottom: 50 }}>
          {
            bottomList.map(item => (
              <TouchableOpacity key={item.name} style={[styles.itemWrapper, { marginBottom: 15 }]}>
                <Text style={styles.text}>{item.title}</Text>
                {
                  item.name === 'changeAccount' && <Image source={Images.iconRight} style={styles.right} />
                }
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BACK,
    justifyContent: 'space-between',
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  text: {
    color: '#333',
    fontSize: 13,
  },
  frameAvatar: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    height: 15,
    width: 10,
    marginLeft: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Safesetting);
