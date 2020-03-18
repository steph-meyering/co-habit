import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import SplashPage from './splash/splash_page';
import HouseholdContainer from './household/household_container';
import "../styles/application.scss";

const App = () => (
    <div className="app">
        {/* <Switch>
            <AuthRoute exact path="/" component={SplashPage} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
        </Switch> */}
        <Route exact path="/" component={SplashPage} />
        <ProtectedRoute exact path="/:householdId" component={HouseholdContainer} />
    </div>
);

export default App;