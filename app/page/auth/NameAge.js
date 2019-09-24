import React, { PureComponent } from 'react';
import {
  Text, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image, KeyboardDismiss } from '../../components';
import Images from '../../res/Images';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import { PADDING_TAB } from '../../common/Constant';
import { showToast } from '../../utils/MutualUtil';
import { receiveUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';
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
    this.nickName = userInfo.user_name;
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.pop();
  }

  goNext = () => {
    const { navigation, receiveUser } = this.props;
    if (!this.nickName) {
      showToast('请输入昵称');
      return;
    } if (!this.age) {
      showToast('请输入年龄');
      return;
    }
    receiveUser({ user_name: this.nickName, age: this.age });
    navigation.navigate('GenderSize');
  }

  onChangeName = (nickName) => {
    this.nickName = nickName;
  }

  onChangeAge = (age) => {
    this.age = age;
  }

  render() {
    const { userInfo } = this.props;
    return (
      <KeyboardDismiss style={styles.container}>
        <Image style={styles.nameAge} source={Images.nameAge} />
        <TouchableOpacity style={styles.nicknameBack}>
          <TextInput
            maxLength={12}
            placeholder="昵称"
            placeholderTextColor="#d3d3d3"
            underlineColorAndroid="transparent"
            style={styles.age}
            defaultValue={userInfo.user_name}
            clearButtonMode="while-editing"
            onChangeText={this.onChangeName}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nicknameBack}>
          <TextInput
            maxLength={3}
            keyboardType="number-pad"
            placeholder="年龄"
            placeholderTextColor="#d3d3d3"
            underlineColorAndroid="transparent"
            style={styles.age}
            clearButtonMode="while-editing"
            onChangeText={this.onChangeAge}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.frameBlack} onPress={this.goNext}>
          <Text style={styles.nextText}>下一步</Text>
        </TouchableOpacity>
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hPx2P(115),
    backgroundColor: Colors.MAIN_BACK,
  },
  nameAge: {
    width: wPx2P(307),
    height: wPx2P(91),
    marginBottom: hPx2P(32),
  },
  age: {
    flex: 1,
    marginRight: 8,
    marginLeft: 16,
    color: '#666',
    padding: 0,
    includeFontPadding: false,
  },
  nicknameBack: {
    width: wPx2P(244),
    height: wPx2P(40),
    marginTop: hPx2P(13),
    backgroundColor: '#fff',
  },
  frameBlack: {
    flexDirection: 'row',
    bottom: hPx2P(34 + PADDING_TAB),
    position: 'absolute',
    height: wPx2P(48),
    width: wPx2P(244),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: Colors.OTHER_BACK,
  },
  bottom: {
    flexDirection: 'row',
    bottom: hPx2P(24 + PADDING_TAB),
    position: 'absolute',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NameAge);
