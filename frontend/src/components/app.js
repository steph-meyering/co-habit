import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import SplashPage from './splash/splash_page';
import DashboardContainer from './dashboard/dashboard_container';
import "../styles/application.scss";
import ChoresContainer from "./chores/chores_container"

const App = () => (
    <div className="app">
        <AuthRoute exact path="/" component={SplashPage} />
        <ProtectedRoute exact path="/dashboard" component={DashboardContainer} />
        <ProtectedRoute exact path="/chores" component={ChoresContainer} />
    </div>
);

export default App;