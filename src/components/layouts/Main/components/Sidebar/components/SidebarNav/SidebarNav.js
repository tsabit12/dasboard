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
import WatchLaterIcon from '@material-ui/icons/WatchLater';

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
  },
  activeLink: {
    backgroundColor: 'rgba(216, 212, 212, 0.94)'
  },
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
    isOpen: {}
  });
  const { className, ...rest } = props;

  const classes = useStyles();

  const onExpand = (name) => setOpen(prev => ({
    ...prev,
    isOpen: {
      [name]: !prev.isOpen[name]
    }
  }))

  // const handleClick = href => {
  //   setOpen({
  //     ...open,
  //     active: {
  //       [href]: true
  //     }
  //   })
  // }

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ListItem button onClick={() => onExpand('top')}>
        <ListItemIcon>
          <AssessmentIcon/>
        </ListItemIcon>
        <ListItemText className={classes.listText}>
          <span className={classes.span}>TOP BISNIS KORPORAT</span>
        </ListItemText>
        {open.isOpen.top ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open.isOpen.top} timeout="auto" unmountOnExit>
        <ListItem 
          button 
          className={classes.nested}
          component={CustomRouterLink}
          activeClassName={classes.activeLink}
          to='/home-sales'
        >
          <ListItemIcon>
            <GradeSharpIcon />
          </ListItemIcon>
          <ListItemText className={classes.listText}>
            <span className={classes.span}>TOP PRODUK</span>
          </ListItemText>
        </ListItem>

        <ListItem 
          button 
          className={classes.nested}
          component={CustomRouterLink}
          activeClassName={classes.activeLink}
          to='/sales/top-reg'
        >
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText className={classes.listText}>
            <span className={classes.span}>TOP REGIONAL</span>
          </ListItemText>
        </ListItem>
        
        <ListItem 
          button 
          className={classes.nested}
          component={CustomRouterLink}
          activeClassName={classes.activeLink}
          to='/sales/top-kprk'
        >
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText className={classes.listText}>
            <span className={classes.span }>TOP 10 KANTOR POS</span>
          </ListItemText>
        </ListItem>
        
        <ListItem 
            button 
            className={classes.nested}
            component={CustomRouterLink}
            activeClassName={classes.activeLink}
            to='/sales/top-ae'
          >
          <ListItemIcon>
            <PeopleSharpIcon  />
          </ListItemIcon>
          <ListItemText className={classes.listText}>
            <span className={classes.span}>TOP 100 AE</span>
          </ListItemText>
        </ListItem>
        
        <ListItem 
          button 
          className={classes.nested}
          component={CustomRouterLink}
          activeClassName={classes.activeLink}
          to='/sales/ae'
        >
          <ListItemIcon>
            <WarningIcon />
          </ListItemIcon>
          <ListItemText className={classes.listText}>
            <span className={classes.span}>AE DIBAWAH 15JT</span>
          </ListItemText>
        </ListItem>

      </Collapse>
      
      <ListItem button onClick={() => onExpand('report')}>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText className={classes.listText}>
          <span className={classes.span}>LAPORAN KORPORAT</span>
        </ListItemText>
        {open.isOpen.report ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open.isOpen.report} timeout="auto" unmountOnExit>
        <ListItem 
          button 
          className={classes.nested}
          component={CustomRouterLink}
          activeClassName={classes.activeLink}
          to='/sales/list-pks'
        >
          <ListItemIcon>
            <WatchLaterIcon />
          </ListItemIcon>
          <ListItemText className={classes.listText}>
            <span className={classes.span}>DAFTAR PKS</span>
          </ListItemText>
        </ListItem>
      </Collapse>
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string
};

export default SidebarNav;