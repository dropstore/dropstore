import React, { Component } from 'react';
import NavigationBarCom from '../../components/NavigationBarCom';

export default class PersonalCenterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationBarCom headerTitle="个人中心" isShowLeftView={false} />
    );
  }
}
