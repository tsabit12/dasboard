import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 100,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <Typography variant="h1">
              Halaman yang anda cari tidak ada di sini
            </Typography>
            <Typography variant="subtitle2">
              Anda mencoba mengakses url secara langsung atau anda datang ke sini karena kesalahan. Apa pun itu, coba gunakan navigasi
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src={`${process.env.REACT_APP_PUBLIC_URL}/images/undraw_page_not_found_su7k.svg`}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;