import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 
  List, 
  ListItem, 
  colors,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    backgroundColor: 'rgba(216, 212, 212, 0.94)'
  },
  span: {
    fontSize: 12,
    fontWeight: 700,
    color: theme.palette.primary.main
  },
  listText: {
    paddingRight: 9,
    marginLeft: -9
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ListItem 
        button 
        activeClassName={classes.active}
        component={CustomRouterLink}
        to='/qposin'
      >
        <ListItemIcon>
          <HomeIcon color={'primary'} />
        </ListItemIcon>
        <ListItemText className={classes.listText}>
          <span className={classes.span}>HOME</span>
        </ListItemText>
      </ListItem>
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string
};

export default SidebarNav;