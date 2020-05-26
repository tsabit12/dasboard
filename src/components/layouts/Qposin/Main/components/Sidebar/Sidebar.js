import React from 'react';
// import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';

import { Profile, SidebarNav, Brand } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 280,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  divider: {
    margin: theme.spacing(0.2, 0)
  },
  nav: {
    marginBottom: theme.spacing(1),
    marginTop: -7
  }
}));

const Sidebar = props => {
  const { open, user, variant, onClose, className, ...rest } = props;
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
      >
        <Profile user={user} />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
        /> 

        <Brand />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;