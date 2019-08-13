import React, { Component } from 'react';
import { View } from 'react-native';
import TabBarItem from './TabBarItem';

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    const { routes } = this.props;
    this.inputRange = routes.map((v, i) => i);
  }

  shouldComponentUpdate(nextProps: Object) {
    const { routes, position } = this.props;
    if (JSON.stringify(nextProps.routes) !== JSON.stringify(routes) | nextProps.position !== position) {
      return true;
    }
    return false;
  }

  renderItem = ({ item, index }: { item: Object, index: number }) => {
    const {
      onIndexChange, activeStyle, inactiveStyle, position,
    } = this.props;
    return (
      <TabBarItem
        item={item}
        index={index}
        key={item.key}
        activeStyle={activeStyle}
        inactiveStyle={inactiveStyle}
        position={position}
        onPress={onIndexChange}
        inputRange={this.inputRange}
        isFirst={index === 0}
        isLast={index === this.inputRange.length - 1}
      />
    );
  }

  render() {
    const { style, routes } = this.props;
    return (
      <View style={style}>
        {
          routes.map((item, index) => this.renderItem({ item, index }))
        }
      </View>
    );
  }
}
