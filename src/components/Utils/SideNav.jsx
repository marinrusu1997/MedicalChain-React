import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { MDBIcon } from 'mdbreact'

class TemporaryDrawer extends React.Component {
  state = {
    isOpen: false
  };

  toggleDrawer = open => () => {
    this.setState({
      isOpen: open
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggleDrawer(true)}><MDBIcon icon="bars" size="2x" /></Button>
        <Drawer open={this.state.isOpen} onClose={this.toggleDrawer(false)}>
          {this.props.children}
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default TemporaryDrawer;
