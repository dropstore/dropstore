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
import { PADDING_TAB } from '../../common/Constant';
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
      gender: userInfo.sex,
    };
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.pop();
  }

  goNext = () => {
    const { navigation, userInfo, updateUser } = this.props;
    const { size, gender } = this.state;
    if (gender) {
      const user = {
        size, sex: gender, user_name: userInfo.user_name, age: userInfo.age,
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
    if (size * 1 === 48) {
      return;
    }
    this.setState({ size: (size * 1 + 0.5).toFixed(1) });
  }

  downSize = () => {
    const { size } = this.state;
    if (size * 1 === 35.5) {
      return;
    }
    this.setState({ size: (size - 0.5).toFixed(1) });
  }

  chooseGender = (gender) => {
    this.setState({ gender });
  }

  render() {
    const { size, gender } = this.state;
    const hitSlop = {
      top: 20, left: 50, right: 50, bottom: 20,
    };
    return (
      <KeyboardDismiss style={styles.container}>
        <Image style={styles.sizeGender} source={Images.sizeGender} />
        <TouchableOpacity style={styles.arrowUp} onPress={this.upSize} hitSlop={hitSlop} />
        <View style={styles.sizeWrapper}>
          <Text style={styles.sizeText}>{size}</Text>
        </View>
        <TouchableOpacity style={styles.arrowDown} onPress={this.downSize} hitSlop={hitSlop} />
        <Image style={styles.sexText} source={Images.sexText} />
        <View style={[styles.genderWrapper]}>
          <TouchableOpacity onPress={() => this.chooseGender(1)}>
            <View style={[styles.gender, { opacity: parseInt(gender) === 1 ? 1 : 0.35 }]}>
              <Image style={styles.iconBoy} source={Images.iconBoy} />
              <Image style={styles.boy} source={Images.boy} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.chooseGender(2)}>
            <View style={[styles.gender, { opacity: parseInt(gender) === 2 ? 1 : 0.35 }]}>
              <Image style={styles.iconBoy} source={Images.iconGirl} />
              <Image style={styles.boy} source={Images.girl} />
            </View>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: hPx2P(50),
    backgroundColor: Colors.MAIN_BACK,
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
  gender: {
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
