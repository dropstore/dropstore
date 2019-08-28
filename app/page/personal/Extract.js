import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageBackground from '../../components/ImageBackground';
import Images from '../../res/Images';
import Image from '../../components/Image';
import Colors from '../../res/Colors';
import { updateUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import {
  PADDING_TAB, SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_AND_NAV_HEIGHT,
} from '../../common/Constant';
import KeyboardDismiss from '../../components/KeyboardDismiss';

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

class Extract extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    navigation.setParams({
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Detaile')} style={styles.rightWrapper}>
          <Text style={{ color: '#fff', fontSize: 14 }}>明细</Text>
        </TouchableOpacity>
      ),
    });
  }

  submit = () => {
    alert('提交申请');
  }

  instructions = () => {
    const { navigation } = this.props;
    navigation.navigate('Web', {
      url: 'https://www.baidu.com/',
      title: '提现说明',
    });
  }

  render() {
    return (
      <KeyboardDismiss style={styles.container}>
        <View>
          <ImageBackground source={Images.extractWhite} style={styles.extractWhite}>
            <Text style={{ color: '#000', fontSize: 14 }}>可提现余额: </Text>
            <Text style={{ color: '#666', fontSize: 14 }}>15300</Text>
          </ImageBackground>
          <ImageBackground source={Images.extractWhite} style={styles.extractWhite}>
            <Text style={styles.text}>姓名: </Text>
            <TextInput
              style={styles.input}
              placeholder="_姓名"
              keyboardType="number-pad"
              placeholderTextColor="#d3d3d3"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.name = text; }}
            />
          </ImageBackground>
          <ImageBackground source={Images.extractWhite} style={styles.extractWhite}>
            <Text style={styles.text}>支付宝账号: </Text>
            <TextInput
              style={styles.input}
              placeholder="_账号"
              keyboardType="number-pad"
              placeholderTextColor="#d3d3d3"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.name = text; }}
            />
          </ImageBackground>
          <ImageBackground source={Images.extractWhite} style={styles.extractWhite}>
            <Text style={styles.text}>提现金额: </Text>
            <TextInput
              style={styles.input}
              placeholder="_金额"
              keyboardType="number-pad"
              placeholderTextColor="#d3d3d3"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.name = text; }}
            />
          </ImageBackground>
          <TouchableOpacity style={styles.btn} onPress={this.instructions}>
            <Text style={{ color: '#000', fontSize: 14 }}>提现说明</Text>
            <Image source={Images.arrowRed} style={{ width: 7, height: 10, marginLeft: 5 }} />
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: hPx2P(35) + PADDING_TAB }}>
          <Text style={styles.date}>1-3个工作日到账</Text>
          <ImageBackground onPress={this.submit} source={Images.extractRed} style={styles.extractRed}>
            <Text style={{ color: '#fff', fontSize: 18 }}>提交申请</Text>
          </ImageBackground>
        </View>
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT - STATUSBAR_AND_NAV_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.MAIN_BACK,
    alignItems: 'center',
    paddingTop: hPx2P(26),
    justifyContent: 'space-between',
  },
  rightWrapper: {
    paddingRight: 12,
    height: '100%',
    paddingLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extractRed: {
    width: wPx2P(351),
    height: wPx2P(38),
    alignItems: 'center',
    justifyContent: 'center',
  },
  extractWhite: {
    width: wPx2P(351),
    height: wPx2P(38),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wPx2P(15),
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  date: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: hPx2P(27),
    marginTop: hPx2P(10),
    textAlign: 'center',
  },
  input: {
    flex: 1,
    padding: 0,
    color: '#666',
    height: '100%',
    textAlign: 'right',
  },
  text: {
    color: '#000',
    fontSize: 14,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Extract);
