import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { MDBIcon, MDBDropdownMenu, MDBDropdownItem, MDBDropdown, MDBDropdownToggle } from 'mdbreact'

const styles = {
  list: {
    width: 250,
  }
};

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
    const { classes } = this.props;

    const dropdown = (
      <div className={classes.list}>
        <MDBDropdown size="sm">
          <MDBDropdownToggle caret color="danger">
            Small button
        </MDBDropdownToggle>
          <MDBDropdownMenu color="danger" basic>
            <MDBDropdownItem>Action</MDBDropdownItem>
            <MDBDropdownItem>Another Action</MDBDropdownItem>
            <MDBDropdownItem>Something else here</MDBDropdownItem>
            <MDBDropdownItem>Something else here</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>
    )

    return (
      <div>
        <Button onClick={this.toggleDrawer(true)}><MDBIcon icon="bars" size="2x" /></Button>
        <Drawer open={this.state.isOpen} onClose={this.toggleDrawer(false)}>
          {dropdown}
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
