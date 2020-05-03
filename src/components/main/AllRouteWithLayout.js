import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const AllRouteWithLayout = props => {
  const { isAuthenticated, layout: Layout, component: Component, ...rest } = props;
  
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

AllRouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default AllRouteWithLayout;