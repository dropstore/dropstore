import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { YaHei } from '../res/FontFamily';
import Images from '../res/Images';
import Image from './Image';
import Colors from '../res/Colors';

export default class Modal extends PureComponent {
  sure = () => {
    const { sure } = this.props;
    sure();
  }

  cancel = () => {
    const { closeModalbox } = this.props;
    closeModalbox();
  }

  render() {
    const { title, text, customText } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{`${title || '友情提示'}`}</Text>
        <View style={styles.wrapper}>
          {customText || <Text style={styles.text}>{text}</Text>}
        </View>
        <View style={styles.btn}>
          <TouchableOpacity onPress={this.sure} style={styles.sure}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>确定</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.cancel} style={styles.cancel}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>取消</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.cancel} style={styles.cha}>
          <Image source={Images.cha} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: YaHei,
    textAlign: 'center',
    marginTop: 15,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 46,
    paddingBottom: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: YaHei,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    borderColor: '#000',
    borderWidth: 3,
    width: '100%',
    height: '100%',
  },
  btn: {
    height: 45,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  sure: {
    backgroundColor: Colors.OTHER_BACK,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cancel: {
    flex: 1,
    backgroundColor: '#A4A4A4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cha: {
    backgroundColor: Colors.OTHER_BACK,
    position: 'absolute',
    right: 0,
    height: 35,
    width: 35,
    borderBottomLeftRadius: 2,
    paddingLeft: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    fontSize: 16,
    fontFamily: YaHei,
    marginTop: 13,
    textAlign: 'center',
    marginBottom: 27,
  },
});
