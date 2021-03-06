import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => {
    if (!loggedIn) {
      return(<Component {...props} />)
    } else {
      return(<Redirect to="/channels/@me" />)
    }
  }} />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => {
    if (loggedIn) {
      return(<Component {...props} />)
    } else {
      return(<Redirect to="/login" />)
    }
  }} />
);

const mapStateToProps = state => (
  {loggedIn: Boolean(state.entities.session.id)}
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
