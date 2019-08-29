import React, { PureComponent } from 'react';
import {
  View, Text, TextInput, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Image from '../../components/Image';
import KeyboardDismiss from '../../components/KeyboardDismiss';
import Images from '../../res/Images';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import ImageBackground from '../../components/ImageBackground';
import { PADDING_TAB } from '../../common/Constant';
import { showToast } from '../../utils/MutualUtil';
import { receiveUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';

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
        <ImageBackground source={Images.frameNickname} style={styles.nicknameBack}>
          <TextInput
            maxLength={12}
            placeholder="昵称_"
            placeholderTextColor="#d3d3d3"
            underlineColorAndroid="transparent"
            style={styles.age}
            defaultValue={userInfo.user_name}
            clearButtonMode="while-editing"
            onChangeText={this.onChangeName}
          />
        </ImageBackground>
        <ImageBackground source={Images.frameNickname} style={styles.nicknameBack}>
          <TextInput
            maxLength={3}
            keyboardType="number-pad"
            placeholder="年龄_"
            placeholderTextColor="#d3d3d3"
            underlineColorAndroid="transparent"
            style={styles.age}
            clearButtonMode="while-editing"
            onChangeText={this.onChangeAge}
          />
        </ImageBackground>
        <View style={styles.bottom}>
          <ImageBackground source={Images.frameBlack} style={{ ...styles.frameBlack, marginRight: wPx2P(9) }} onPress={this.goBack}>
            <Text style={styles.nextText}>上一步</Text>
          </ImageBackground>
          <ImageBackground source={Images.frameRed} style={styles.frameBlack} onPress={this.goNext}>
            <Text style={styles.nextText}>下一步</Text>
          </ImageBackground>
        </View>
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hPx2P(125),
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
  },
  nicknameBack: {
    width: wPx2P(238),
    height: wPx2P(39),
    marginTop: hPx2P(13),
  },
  frameBlack: {
    width: wPx2P(177),
    height: wPx2P(48),
    alignItems: 'center',
    justifyContent: 'center',
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
