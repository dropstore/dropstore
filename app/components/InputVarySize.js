import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { YaHei } from '../res/FontFamily';
import { iOS } from '../common/Constant';

export default class InputVarySize extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      formatted: '',
    };
  }

  onChangeText = (formatted, text) => {
    const { onChangeText } = this.props;
    onChangeText(formatted, text);
    this.setState({ formatted, text });
  }

  focus = () => {
    this.input.input.focus();
  }

  render() {
    const { text, formatted } = this.state;
    const {
      placeholder, mask, selectionColor, keyboardType,
    } = this.props;
    return (
      <View style={styles.inputWrapper}>
        {
          text.length === 0
            ? <Text style={styles.placeholder}>{placeholder}</Text>
            : (iOS ? null : <Text style={styles.inputValue}>{formatted}</Text>)
          }
        <TextInputMask
          style={[styles.phoneInput, { color: iOS ? '#000' : '#0000' }]}
          clearButtonMode="while-editing"
          onChangeText={this.onChangeText}
          mask={mask}
          ref={(v) => { this.input = v; }}
          keyboardType={keyboardType}
          selectionColor={selectionColor}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  phoneInput: {
    padding: 0,
    includeFontPadding: false,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: YaHei,
    marginBottom: 5,
    color: '#0000',
  },
  inputValue: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: YaHei,
    position: 'absolute',
    top: -7,
  },
  placeholder: {
    color: '#E4E4EE',
    fontSize: 12,
    position: 'absolute',
    top: 4,
  },
  inputWrapper: {
    flex: 1,
    marginLeft: 25,
    height: 24.5,
  },
});
