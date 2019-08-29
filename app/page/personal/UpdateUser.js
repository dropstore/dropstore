import React, { PureComponent } from 'react';
import {
  View, Text, TextInput, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import KeyboardDismiss from '../../components/KeyboardDismiss';
import Images from '../../res/Images';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import ImageBackground from '../../components/ImageBackground';
import { PADDING_TAB } from '../../common/Constant';
import { showToast } from '../../utils/MutualUtil';
import { receiveUser, updateUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    receiveUser, updateUser,
  }, dispatch);
}

class UpdateUser extends PureComponent {
  constructor(props) {
    super(props);
    const { userInfo } = this.props;
    this.name = userInfo.user_name;
    this.age = userInfo.age;
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.pop();
  }

  submit = () => {
    const { navigation, updateUser } = this.props;
    const type = navigation.getParam('type');
    if (type === 'name' && this.name.length < 1) {
      showToast('请输入昵称');
    } else if (type === 'age' && this.age.length < 1) {
      showToast('请输入年龄');
    }
    if (type === 'name') {
      updateUser({ user_name: this.name }).then(() => {
        this.goBack();
      });
    } else if (type === 'age') {
      updateUser({ age: this.age }).then(() => {
        this.goBack();
      });
    } else if (type === 'sex') {
      // updateUser({ sex: this.age }).then(() => {
      //   this.goBack();
      // });
    }
  }

  render() {
    const { navigation } = this.props;
    const type = navigation.getParam('type');
    return (
      <KeyboardDismiss style={styles.container}>
        <ImageBackground source={Images.frameNickname} style={styles.nicknameBack}>
          {
            type === 'name' ? (
              <TextInput
                maxLength={12}
                placeholder="昵称_"
                placeholderTextColor="#d3d3d3"
                underlineColorAndroid="transparent"
                style={styles.age}
                defaultValue={this.name}
                clearButtonMode="while-editing"
                onChangeText={(name) => { this.name = name; }}
              />
            ) : (
              <TextInput
                maxLength={3}
                keyboardType="number-pad"
                placeholder="年龄_"
                placeholderTextColor="#d3d3d3"
                defaultValue={this.age}
                underlineColorAndroid="transparent"
                style={styles.age}
                clearButtonMode="while-editing"
                onChangeText={(age) => { this.age = age; }}
              />
            )
          }
        </ImageBackground>

        <ImageBackground source={Images.frameRed} style={styles.frameBlack} onPress={this.submit}>
          <Text style={styles.nextText}>确认修改</Text>
        </ImageBackground>
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
    bottom: hPx2P(60 + PADDING_TAB),
    position: 'absolute',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
