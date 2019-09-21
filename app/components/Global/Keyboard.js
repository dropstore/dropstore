import React, { PureComponent } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import ToastLoading from './ToastLoading';
import Toast from './Toast';
import { PADDING_TAB } from '../../common/Constant';

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
    this[type] && this[type].close();
  }

  onClosed = (type) => {
    this.setState({ [type]: { show: false } });
  }

  render() {
    const { toastLoading, toast } = this.state;
    return (
      <KeyboardAvoidingView style={[styles.wrapper, { bottom: toast.show ? 100 + PADDING_TAB : 0 }]} behavior={Platform.OS === 'android' ? null : 'position'}>
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
    alignSelf: 'center',
    zIndex: 100,
  },
});
