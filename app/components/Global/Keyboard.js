import React, { PureComponent } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import ToastLoading from './ToastLoading';
import Toast from './Toast';

export default class Global extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toastLoading: { show: false, data: {} },
      toast: { show: false, data: {} },
    };
  }

  show = (type, data) => {
    this.setState({ [type]: { show: false } }, () => {
      this.setState({ [type]: { show: true, data } });
    });
  }

  hide = (type) => {
    this[type].close();
  }

  onClosed = (type) => {
    this.setState({ [type]: { show: false } });
  }

  render() {
    const { toastLoading, toast } = this.state;
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === 'android' ? null : 'position'}>
        {
          toastLoading.show && (
            <ToastLoading
              data={toastLoading.data}
              ref={(v) => { this.toastLoading = v; }}
              onClosed={() => this.onClosed('toastLoading')}
            />
          )
        }
        {
          toast.show && (
            <Toast
              data={toast.data}
              ref={(v) => { this.toast = v; }}
              onClosed={() => this.onClosed('toast')}
            />
          )
        }
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
  },
});
