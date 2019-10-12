import React, { PureComponent } from 'react';
import {
  Text, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextInputMask from 'react-native-text-input-mask';
import { Image, KeyboardDismiss } from '../../components';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import {
  PADDING_TAB, getScreenWidth, getScreenHeight,
} from '../../common/Constant';
import { showToast } from '../../utils/MutualUtil';
import { receiveUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';
import { YaHei } from '../../res/FontFamily';
import Colors from '../../res/Colors';

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    receiveUser,
  }, dispatch);
}

class NameAge extends PureComponent {
  constructor(props) {
    super(props);
    const { userInfo } = this.props;
    this.state = {
      user_name: userInfo.user_name || '',
      age: userInfo.age || '',
    };
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.pop();
  }

  goNext = () => {
    const { navigation, receiveUser } = this.props;
    const { user_name, age } = this.state;
    if (!user_name) {
      showToast('请输入昵称');
      return;
    } if (!age) {
      showToast('请输入年龄');
      return;
    }
    receiveUser({ user_name, age });
    navigation.navigate('GenderSize');
  }

  onChangeName = (user_name) => {
    this.setState({ user_name });
  }

  onChangeAge = (age) => {
    this.setState({ age });
  }

  render() {
    const { user_name, age } = this.state;
    return (
      <KeyboardDismiss style={styles.container}>
        <Image resizeMode="contain" source={require('../../res/image/logo.png')} style={styles.logo} />
        <View style={{ height: 107.5, justifyContent: 'space-between' }}>
          <View style={styles.wrapper}>
            <Text style={{ fontSize: 12 }}>昵称</Text>
            <View style={[styles.inputWrapper, { height: 30 }]}>
              {user_name.length === 0 && <Text style={styles.placeholder}>输入昵称</Text>}
              <TextInputMask
                style={styles.phoneInput}
                clearButtonMode="while-editing"
                onChangeText={this.onChangeName}
                selectionColor="#00AEFF"
                defaultValue={user_name}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

          <View style={styles.wrapper}>
            <Text style={{ fontSize: 12 }}>年龄</Text>
            <View style={styles.inputWrapper}>
              {age.length === 0 && <Text style={styles.placeholder}>输入年龄</Text>}
              <TextInputMask
                style={styles.phoneInput}
                clearButtonMode="while-editing"
                onChangeText={this.onChangeAge}
                selectionColor="#00AEFF"
                mask="[000]"
                keyboardType="number-pad"
                defaultValue={age}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={this.goNext}
          style={[styles.frameLogin, { backgroundColor: user_name === '' || age === '' ? Colors.DISABLE : Colors.YELLOW }]}
        >
          <Text style={styles.login}>下一步</Text>
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
  placeholder: {
    color: '#E4E4EE',
    fontSize: 12,
    position: 'absolute',
    bottom: 3,
  },
  frameLogin: {
    height: wPx2P(43),
    width: wPx2P(304),
    alignItems: 'center',
    marginTop: hPx2P(34),
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
  },
  inputWrapper: {
    flex: 1,
    marginLeft: 25,
    height: 25,
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
    top: 3,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: wPx2P(304),
    paddingBottom: 3,
    borderBottomColor: '#E4E4EE',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  phoneInput: {
    flex: 1,
    padding: 0,
    includeFontPadding: false,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: YaHei,
    marginBottom: 5,
  },
  logo: {
    height: wPx2P(114),
    width: wPx2P(108),
    marginBottom: hPx2P(43.5),
    marginTop: hPx2P(55),
  },
  age: {
    flex: 1,
    marginRight: 8,
    marginLeft: 16,
    color: '#666',
    padding: 0,
    includeFontPadding: false,
  },
  bottom: {
    flexDirection: 'row',
    bottom: hPx2P(24 + PADDING_TAB),
    position: 'absolute',
  },
  login: {
    color: '#fff',
    fontSize: 16,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NameAge);
