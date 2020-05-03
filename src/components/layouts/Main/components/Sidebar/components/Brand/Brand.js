import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: colors.grey[50]
  },
  media: {
    paddingTop: theme.spacing(2),
    height: 80,
    textAlign: 'center',
    '& > img': {
      height: '100%',
      width: 'auto'
    }
  },
  content: {
    padding: theme.spacing(1, 2)
  },
  actions: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Brand = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.media}>
        <img
          alt="Upgrade to PRO"
          src="/images/GitHub-Mark-120px-plus.png"
        />
      </div>
      <div className={classes.content}>
        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          tsabit12
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
        Created with love for the environment!
        https://github.com/tsabit12/dashboard.git
        </Typography>
      </div>
    </div>
  );
};

Brand.propTypes = {
  className: PropTypes.string
};

export default Brand;