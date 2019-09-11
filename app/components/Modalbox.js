import React, { PureComponent } from 'react';
import Modalbox from 'react-native-modalbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeShare, shareCallback } from '../redux/actions/component';
import { getModalbox } from '../redux/reselect/component';

function mapStateToProps() {
  return state => ({
    modalbox: getModalbox(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeShare, shareCallback,
  }, dispatch);
}

class Modal extends PureComponent {
  state = {
    element: false,
    options: {},
  }

  componentWillReceiveProps(nextProps) {
    const { modalbox } = this.props;
    if (!modalbox.element && nextProps.modalbox.element) {
      this.setState({
        element: nextProps.modalbox.element,
        options: nextProps.modalbox.options,
      }, () => {
        this.modalbox.open();
      });
    } else if (modalbox.element && !nextProps.modalbox.element && this.modalbox) {
      this.modalbox.close();
    }
  }

  onClosed = () => {
    this.setState({ element: null, options: {} });
  }

  render() {
    const { element, options } = this.state;
    if (!element) {
      return null;
    }
    return (
      <Modalbox swipeToClose={false} onClosed={this.onClosed} backButtonClose {...options} ref={(v) => { this.modalbox = v; }}>
        {element}
      </Modalbox>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
