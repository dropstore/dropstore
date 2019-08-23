import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { STATUSBAR_HEIGHT, SCREEN_WIDTH } from '../../common/Constant';
import ImageBackground from '../../components/ImageBackground';
import Image from '../../components/Image';
import Images from '../../res/Images';
import { wPx2P } from '../../utils/ScreenUtil';

export default class PersonalCenterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>个人中心</Text>
          <View style={styles.headerWrapper}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <ImageBackground style={styles.frameHead} source={Images.frameHead}>
                <Image source={Images.iconBoy} style={{ height: wPx2P(47.2), width: wPx2P(52.8) }} />
              </ImageBackground>
              <View>
                <Text>User Name</Text>
                <Text>ID:636574</Text>
              </View>
            </View>
            <ImageBackground style={styles.frameHead} source={Images.frameHead}>
              <Image source={Images.iconBoy} style={{ height: wPx2P(47.2), width: wPx2P(52.8) }} />
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: '#c20000',
    alignItems: 'center',
  },
  headerTitle: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
  frameHead: {
    height: wPx2P(59),
    width: wPx2P(61),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    paddingHorizontal: wPx2P(22),
    justifyContent: 'space-between',
  },
});
