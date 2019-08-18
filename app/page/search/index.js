
import React, { Component } from 'react';
import NavigationBarCom from '../../components/NavigationBarCom';


export default class ShoeKoiFishPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationBarCom headerTitle="球鞋锦鲤" isShowLeftView={false} />
    );
  }
}
