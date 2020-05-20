import React from 'react';
import { Switch, Redirect } from "react-router-dom";
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import { UserRouteWithLayout, GuesRouteWithLayout, AllRouteWithLayout } from './components/main';
import theme from './theme';
import { Main as MainLayout, Minimal as MinimalLayout } from './components/layouts';
import { chartjs } from './helpers';
import './assets/scss/index.scss';
import {
  Dashboard as DashboardView,
  SignIn as SignInView,
  TopAe as TopAeView,
  NotFound as NotFoundView,
  TopReg as TopRegView,
  TopKprk as TopKprkView,
  Ae as AeView,
  IndexV as IndexView
} from "./components/views";

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});


const App = ({ location }) => {
  return(
    <ThemeProvider theme={theme}>
      <Switch>
        <GuesRouteWithLayout
          location={location}
          component={IndexView}
          exact
          layout={MinimalLayout}
          path="/"
        />
        <GuesRouteWithLayout
          location={location}
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/sales/home"
        />
        <GuesRouteWithLayout
          location={location}
          component={TopAeView}
          exact
          layout={MainLayout}
          path="/sales/top-ae"
        />
        <GuesRouteWithLayout
          location={location}
          component={TopRegView}
          exact
          layout={MainLayout}
          path="/sales/top-reg"
        />
        <GuesRouteWithLayout
          location={location}
          component={TopKprkView}
          exact
          layout={MainLayout}
          path="/sales/top-kprk"
        />
        <GuesRouteWithLayout
          location={location}
          component={AeView}
          exact
          layout={MainLayout}
          path="/sales/ae"
        />
        <UserRouteWithLayout
          location={location}
          component={SignInView}
          exact
          layout={MinimalLayout}
          path="/sales/sign-in"
        />
        <AllRouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    </ThemeProvider>
  ); 
}

export default App;
