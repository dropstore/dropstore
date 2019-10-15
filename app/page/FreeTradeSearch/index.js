import React, { PureComponent } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Image, KeyboardDismiss } from '../../components';

export default class FreeTrade extends PureComponent {
  render() {
    return (
      <KeyboardDismiss style={{ flex: 1 }}>
        <View style={styles.inputWrapper}>
          <Image source={require('../../res/image/search.png')} style={{ height: 12, width: 12 }} />
          <TextInput
            style={styles.input}
            placeholder="输入收件人"
            selectionColor="#00AEFF"
            placeholderTextColor="#D6D6D6"
            underlineColorAndroid="transparent"
            clearButtonMode="while-editing"
            onChangeText={(text) => { this.link_name = text; }}
          />
        </View>

      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    borderRadius: 2,
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 12,
    marginLeft: 8,
  },
});
