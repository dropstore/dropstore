/*
 * @Author: Lsfern
 * @Date: 2019-08-10 23:48:28
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 18:36:37
 * @Description: 首页
 */
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavigationBarCom from '../../components/NavigationBarCom';
import { fetchVendors } from '../../redux/actions/test';
import VendorList from './VendorList';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchVendors,
  }, dispatch);
}

class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    const { fetchVendors } = this.props;
    fetchVendors();
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationBarCom headerTitle="首页" isShowLeftView={false} />
        <VendorList />
      </View>
    );
  }
}
export default connect(null, mapDispatchToProps)(HomePage);
