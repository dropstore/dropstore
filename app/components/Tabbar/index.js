import React, { PureComponent } from 'react';
import { View } from 'react-native';
import TabBarItem from './TabBarItem';

export default class TabBar extends PureComponent {
  constructor(props) {
    super(props);
    const { routes } = this.props;
    this.inputRange = routes.map((v, i) => i);
  }

  renderItem = ({ item, index }: { item: Object, index: number }) => {
    const { onIndexChange, position, index: activeIndex } = this.props;
    return (
      <TabBarItem
        item={item}
        activeIndex={activeIndex}
        index={index}
        key={item.key}
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
