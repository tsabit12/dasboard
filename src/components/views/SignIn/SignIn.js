import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  TextField,
  Typography,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import { connect } from "react-redux";
import { loggedIn } from "../../../actions/auth";
import { MySnackbarContentWrapper } from "../Alert";

const schema = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${process.env.REACT_APP_PUBLIC_URL}/images/login.jpg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px',
    backgroundColor: 'rgba(20, 20, 20, 0.68)',
    padding: 10,
    borderRadius: 5
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 42,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  alert: {
    marginTop: 26,
    marginBottom: 20
  },
  progress: {
    zIndex: theme.zIndex.drawer + 2,
    position: 'absolute',
    margin: '0 0 0 0',
    left: '50%',
    top: '50%',
    color: 'white'
  }
}));

const SignIn = props => {
  const { history, loggedIn } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    open: false
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  // const handleBack = () => {
  //   history.goBack();
  // };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = event => {
    event.preventDefault();
    setFormState(formState => ({
      ...formState,
      open: true
    }));

    loggedIn(formState.values)
      .then(() => history.push('/'))
      .catch(err => {
        if (!err.response) {
          setFormState(formState => ({
              ...formState,
              open: false,
              errors: {
                global: ['Terdapat kesalahan, internal server error']
              }
          }));
        }else{
          const { data } = err.response;
          if (!data.errors) {
            setFormState(formState => ({
              ...formState,
              open: false,
              errors: {
                global: ['Terdapat kesalahan, internal server error']
              }
            }));
          }else{
            setFormState(formState => ({
              ...formState,
              open: false,
              errors: {
                global: [data.errors.global]
              }
            }));
          }
        }
      });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  // console.log(formState.errors);

  return (
    <div className={classes.root}>
        <Backdrop className={classes.backdrop} open={formState.open} />
        { formState.open && <CircularProgress className={classes.progress} /> }
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={7}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Selamat datang! Situs Web ini merupakan dashboard yang menyajikan data live kinerja sales force dengan tampilan terbaru
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Powered by IT Support 2020
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Divisi pengembangan kurir dan logistik
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={5}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
              <MySnackbarContentWrapper
                variant="info"
                // className={classes.margin}
                message="Silahkan sign-in menggunakan username dan password yang terdaftar di sales.posindonesia.co.id"
              />
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Sign in
                </Typography>

                { formState.errors.global && <MySnackbarContentWrapper
                    variant="error"
                    className={classes.alert}
                    message={formState.errors.global[0]}
                  />}
                <TextField
                  className={classes.textField}
                  error={hasError('username')}
                  fullWidth
                  helperText={
                    hasError('username') ? formState.errors.username[0] : null
                  }
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.username || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
  loggedIn: PropTypes.func.isRequired
};

export default connect(null, { loggedIn })(SignIn);