import React, { PureComponent } from 'react';
import {
  DeviceEventEmitter, KeyboardAvoidingView, StyleSheet, Platform, View,
} from 'react-native';
import ShareCom from '../ShareCom';

export default class Global extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      share: {},
    };
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('dropstoreGlobal', (e) => {
      if (e.dropstoreEventType === 'toast') {
        console.log(e.params);
      } else if (e.dropstoreEventType === 'share') {
        this.setState({
          share: {
            ...e.params,
            show: true,
          },
        });
      }
    });
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  render() {
    const { share } = this.state;
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === 'android' ? null : 'position'}>
        <View>
          <ShareCom share={share} />
        </View>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    zIndex: 100,
    height: 'auto',
    width: 'auto',
  },
});
