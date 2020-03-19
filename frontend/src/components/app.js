import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import SplashPage from './splash/splash_page';
import DashboardContainer from './dashboard/dashboard_container';
import "../styles/application.scss";
import BillsIndexContainer from "./bills/bills_index_container";
import ChoresContainer from "./chores/chores_container"
import NavBar from "./nav/nav"

const App = () => (
    <div className="app">
        <Route path="/" component={NavBar} />
        <AuthRoute exact path="/" component={SplashPage} />
        <ProtectedRoute exact path="/dashboard" component={DashboardContainer} />
        <ProtectedRoute exact path="/chores" component={ChoresContainer} />
        <ProtectedRoute exact path="/bills" component={BillsIndexContainer} />
    </div>
);

export default App;