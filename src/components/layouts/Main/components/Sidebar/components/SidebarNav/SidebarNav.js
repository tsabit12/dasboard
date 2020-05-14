/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 
  List, 
  ListItem, 
  ListItemIcon,
  ListItemText,
  colors,
  Collapse
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AssessmentIcon from '@material-ui/icons/Assessment';
import GradeSharpIcon from '@material-ui/icons/GradeSharp';
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WarningIcon from '@material-ui/icons/Warning';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';


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
  nested: {
    paddingLeft: theme.spacing(4)
  },
  listText: {
    paddingRight: 9,
    marginLeft: -9
  },
  span: {
    fontSize: 12,
    fontWeight: 700
  },
  active: {
    fontSize: 12,
    fontWeight: 700,
    color: 'blue'
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
  const [open, setOpen] = useState({
    isOpen: true,
    active: {
      produk: true
    }
  });
  const { className, ...rest } = props;

  const classes = useStyles();

  const onExpand = () => setOpen({
    ...open,
    isOpen: !open.isOpen
  });

  const handleClick = href => {
    setOpen({
      ...open,
      active: {
        [href]: true
      }
    })
  }

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ListItem button onClick={onExpand}>
        <ListItemIcon>
          <AssessmentIcon color={open.isOpen ? 'primary' : ''} />
        </ListItemIcon>
        <ListItemText className={classes.listText}>
          <span className={open.isOpen ? classes.active : classes.span}>TOP BISNIS KORPORAT</span>
        </ListItemText>
        {open.isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open.isOpen} timeout="auto" unmountOnExit>
        <List 
          disablePadding 
          onClick={() => handleClick('produk')}
          component={CustomRouterLink}
          to='/'
        >
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <GradeSharpIcon color={open.active.produk ? 'primary' : ''} />
            </ListItemIcon>
            <ListItemText className={classes.listText}>
              <span className={open.active.produk ? classes.active : classes.span }>TOP PRODUK</span>
            </ListItemText>
          </ListItem>
        </List>
        <List 
          disablePadding 
          onClick={() => handleClick('regional')}
          component={CustomRouterLink}
          to='top-reg'
        >
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <TrendingUpIcon color={open.active.regional ? 'primary' : ''} />
            </ListItemIcon>
            <ListItemText className={classes.listText}>
              <span className={open.active.regional ? classes.active : classes.span }>TOP REGIONAL</span>
            </ListItemText>
          </ListItem>
        </List>
        <List 
          disablePadding 
          onClick={() => handleClick('kprk')}
          component={CustomRouterLink}
          to='top-kprk'
        >
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText className={classes.listText}>
              <span className={open.active.kprk ? classes.active : classes.span }>TOP 10 KANTOR POS</span>
            </ListItemText>
          </ListItem>
        </List>
        <List 
          disablePadding 
          onClick={() => handleClick('ae')}
          component={CustomRouterLink}
          to='top-ae'
        >
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <PeopleSharpIcon />
            </ListItemIcon>
            <ListItemText className={classes.listText}>
              <span className={open.active.ae ? classes.active : classes.span }>TOP 100 AE</span>
            </ListItemText>
          </ListItem>
        </List>
      </Collapse>
      <ListItem button>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText className={classes.listText}>
          <span className={classes.span}>LAPORAN KORPORAT</span>
        </ListItemText>
        <ExpandMore />
      </ListItem>
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string
};

export default SidebarNav;