import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import LogRocket from 'logrocket';
LogRocket.init('moacwv/burger-builder-1v0rv');

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));

function App(props) {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  let routes = !props.isAuthenticated ? (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" component={BurgerBuilder} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/logout" component={Logout} />
      <Route path="/auth" component={Auth} />
      <Route path="/" component={BurgerBuilder} />
    </Switch>
  );

  return (
    <div>
      <Layout>{routes}></Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
