import React, { PureComponent } from 'react';
import Modalbox from 'react-native-modalbox';

export default class Modal extends PureComponent {
  componentDidMount() {
    this.modalbox && this.modalbox.open();
  }

  close = () => {
    this.modalbox.close();
  }

  render() {
    const { data: { element, options }, onClosed } = this.props;
    return (
      <Modalbox
        swipeToClose={false}
        onClosed={onClosed}
        backButtonClose
        ref={(v) => { this.modalbox = v; }}
        {...options}
      >
        {element}
      </Modalbox>
    );
  }
}
