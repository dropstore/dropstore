import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationBarCom from '../../components/NavigationBarCom';

export default class FreeTrade extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBarCom headerTitle="自由贸易" isShowLeftView={false} />
        <Text style={{ fontSize: 16 }}>敬请期待</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
