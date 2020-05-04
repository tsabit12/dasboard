import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.black,
  },
  tooltip: {
    backgroundColor: theme.palette.black,
  },
}));

const Topbar = props => {
  const { className, onSidebarOpen, onLogout, ...rest } = props;

  const classes = useStyles();
  const withBootstrap = useStylesBootstrap();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src={`${process.env.REACT_APP_PUBLIC_URL}/images/logos/pos.png`}
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <Tooltip title="Sign-out" arrow classes={withBootstrap}>
            <IconButton
              className={classes.signOutButton}
              color="inherit"
              onClick={() => onLogout()}
            >
              <InputIcon />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  onLogout: PropTypes.func.isRequired
};

export default Topbar;