import React, { PureComponent } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Image, KeyboardDismiss } from '../../components';
import Images from '../../res/Images';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import {
  PADDING_TAB, getScreenWidth, getScreenHeight,
} from '../../common/Constant';
import { YaHei } from '../../res/FontFamily';
import { showToast } from '../../utils/MutualUtil';
import { updateUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';
import Colors from '../../res/Colors';


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

class GenderSize extends PureComponent {
  constructor(props) {
    super(props);
    const { userInfo } = this.props;
    this.state = {
      size: 42.5,
      sex: userInfo.sex,
    };
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.pop();
  }

  goNext = () => {
    const { navigation, userInfo, updateUser } = this.props;
    const { size, sex } = this.state;
    if (sex) {
      const user = {
        size, sex, user_name: userInfo.user_name, age: userInfo.age,
      };
      updateUser(user).then(() => {
        AsyncStorage.setItem('token', userInfo.user_s_id);
        navigation.navigate('Main');
      });
    } else {
      showToast('请选择性别');
    }
  }

  upSize = () => {
    const { size } = this.state;
    if (size * 1 >= 48) {
      return;
    }
    this.setState({ size: (size * 1 + 0.5).toFixed(1) });
  }

  downSize = () => {
    const { size } = this.state;
    if (size * 1 <= 35.5) {
      return;
    }
    this.setState({ size: (size - 0.5).toFixed(1) });
  }

  changeSex = () => {
    const { sex } = this.state;
    this.setState({ sex: sex === '男' ? '女' : '男' });
  }

  render() {
    const { size, sex } = this.state;
    return (
      <KeyboardDismiss style={styles.container}>
        <Image resizeMode="contain" source={require('../../res/image/logo.png')} style={styles.logo} />
        <View style={styles.wrapper}>
          <Text style={styles.text}>性别</Text>
          <View style={styles.inputWrapper}>
            <Text style={{ color: '#E4E4EE', fontSize: 12 }}>选择性别</Text>
            <Image
              source={sex === '女' ? Images.chooseGirl : sex === '男' ? Images.chooseBoy : Images.nosex}
              style={styles.sexBtnWrapper}
              onPress={this.changeSex}
            />
          </View>
        </View>
        <View style={[styles.wrapper, { marginTop: 50 }]}>
          <View style={styles.inputWrapper}>
            <Text style={styles.text}>鞋码</Text>
            <Text style={styles.size}>56</Text>
          </View>
          <TouchableOpacity>
            <View />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.bottom} onPress={this.goNext}>
          <Text style={styles.nextText}>开始体验</Text>
        </TouchableOpacity>
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: getScreenHeight(),
    width: getScreenWidth(),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    height: wPx2P(114),
    width: wPx2P(108),
    marginBottom: hPx2P(50),
    marginTop: hPx2P(55),
  },
  text: {
    fontSize: 12,
  },
  sexBtnWrapper: {
    width: 55,
    height: 23,
    marginLeft: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 3,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wPx2P(304),
    borderBottomColor: '#E4E4EE',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'space-between',
  },
  size: {
    fontSize: 24,
    fontFamily: YaHei,
    fontWeight: 'bold',
    position: 'relative',
    top: 5,
    marginLeft: 25,
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderBottomWidth: 16,
    borderRightWidth: 15,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: Colors.OTHER_BACK,
    borderRightColor: 'transparent',
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 16,
    borderBottomWidth: 0,
    borderRightWidth: 15,
    borderLeftWidth: 15,
    borderTopColor: Colors.OTHER_BACK,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
  },
  sizeWrapper: {
    width: wPx2P(94),
    height: wPx2P(40),
    marginVertical: wPx2P(15),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  sexText: {
    marginTop: hPx2P(67),
    width: wPx2P(41),
    height: wPx2P(25),
  },
  sizeGender: {
    width: wPx2P(307),
    height: wPx2P(91),
    marginBottom: hPx2P(32),
  },
  sex: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderText: {
    fontFamily: YaHei,
    fontWeight: 'bold',
  },
  boy: {
    width: wPx2P(130),
    height: wPx2P(40),
  },
  bottom: {
    flexDirection: 'row',
    bottom: hPx2P(34 + PADDING_TAB),
    position: 'absolute',
    height: wPx2P(48),
    width: wPx2P(244),
    backgroundColor: Colors.OTHER_BACK,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
  },
  iconUp: {
    height: wPx2P(15),
    width: wPx2P(26),
  },
  sizeText: {
    fontFamily: YaHei,
    fontSize: 21,
    padding: 0,
  },
  genderWrapper: {
    flexDirection: 'row',
    marginTop: hPx2P(13),
  },
  iconBoy: {
    height: wPx2P(59),
    width: wPx2P(66),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GenderSize);
