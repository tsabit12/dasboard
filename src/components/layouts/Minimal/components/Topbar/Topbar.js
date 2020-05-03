import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@material-ui/core';


const Topbar = props => {
  const { className, ...rest } = props;

  return (
    <AppBar
      {...rest}
      className={clsx(className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <img
          alt="Logo"
          src="/images/logos/pos.png"
        />
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;