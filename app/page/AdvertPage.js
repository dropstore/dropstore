
import React, { Component } from 'react';
import {
  Button, Image, StyleSheet, View,
} from 'react-native';
import Images from '../res/Images';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../common/Constant';

export default class AdvertPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Image
          style={styles.advert}
          resizeMode="cover"
          source={Images.advert}
        />
        <View style={{ position: 'absolute', right: 20, top: 20 }}>
          <Button title="跳过" onPress={() => navigation.navigate('homePage')} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  advert: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
