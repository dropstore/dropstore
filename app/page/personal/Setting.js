import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, Platform, TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { STATUSBAR_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../common/Constant';
import ImageBackground from '../../components/ImageBackground';
import Image from '../../components/Image';
import Images from '../../res/Images';
import { YaHei } from '../../res/FontFamily';
import { wPx2P } from '../../utils/ScreenUtil';
import Colors from '../../res/Colors';
import { updateUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';

const list = [
  { title: '头像', icon: 'avatar' },
  { title: '昵称', icon: 'name' },
  { title: '微信', icon: 'weChat' },
  { title: '鞋码', icon: 'size' },
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

class Setting extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        {
          list.map(v => (
            <TouchableOpacity>
              <Text>{v.title}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
