import React, { PureComponent } from 'react';
import { Text, StyleSheet, Clipboard } from 'react-native';
import { showToast } from '../../../utils/MutualUtil';

export default class Id extends PureComponent {
  onPress = () => {
    const { id } = this.props;
    Clipboard.setString(id);
    showToast('订单编号已复制');
  }

  render() {
    const { id } = this.props;
    if (!id) {
      return null;
    }
    return <Text onPress={this.onPress} style={styles.id}>{`编号: ${id}`}</Text>;
  }
}

const styles = StyleSheet.create({
  id: {
    fontSize: 8,
    marginTop: 15,
    letterSpacing: -0.1,
  },
});
