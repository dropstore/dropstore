import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

class OrderListItem extends PureComponent {
  toVendorPage = () => {
    const { navigation } = this.props;
    navigation.push('vendorDetail', {
      title: '详情页',
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <Text>zheshi ceshi </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default withNavigation(OrderListItem);
