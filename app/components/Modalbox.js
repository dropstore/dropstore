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
  componentWillReceiveProps(nextProps) {
    const { modalbox } = this.props;
    if (!modalbox.element && nextProps.modalbox.element) {
      setTimeout(() => {
        console.log();
        this.modalbox.open();
      });
    } else if (modalbox.element && !nextProps.modalbox.element) {
      this.modalbox.close();
    }
  }

  render() {
    const { modalbox } = this.props;
    if (!modalbox.element) {
      return null;
    }
    return (
      <Modalbox {...modalbox.options} ref={(v) => { this.modalbox = v; }}>
        {modalbox.element}
      </Modalbox>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
