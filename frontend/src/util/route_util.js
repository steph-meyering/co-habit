import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

// Passed in from parent component or from mapStateToProps
const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
                // Redirect to the main page if the user is authenticated
                <Redirect to="/dashboard" />
            )
    )} />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            loggedIn ? (
                <Component {...props} />
            ) : (
                    // Redirect to the login page if the user is already authenticated
                    <Redirect to="/" />
                )
        }
    />
);

const Pending = ({ component: Component, loggedIn, currentUserAccepted, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            loggedIn && currentUserAccepted ? (
                <Component {...props} />
            ) : loggedIn ? (
                    // Redirect to the login page if the user is already authenticated
                    <Redirect to="/pending" />
                ) : (
                        // Redirect to the login page if the user is already authenticated
                        <Redirect to="/" />
                    )
        }
    />
);

// Use the isAuthenticated slice of state to determine whether a user is logged in

const mapStateToProps = state => (
    { loggedIn: state.session.isAuthenticated,
        currentUserAccepted: state.session.user ? state.session.user.acceptedIntoHousehold : false
     }
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const PendingRoute = withRouter(connect(mapStateToProps)(Pending));