import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SplashPage from './splash/splash_page';
import DashboardContainer from './dashboard/dashboard_container';
import "../styles/application.scss";
import BillsIndexContainer from "./bills/bills_index_container";
import ChoresContainer from "./chores/chores_container";
import BillFormContainer from "./bills/bill_form_container";

const App = () => (
  <div className="app">
    <AuthRoute exact path="/" component={SplashPage} />
    <ProtectedRoute exact path="/dashboard" component={DashboardContainer} />
    <ProtectedRoute exact path="/chores" component={ChoresContainer} />
    <ProtectedRoute exact path="/bills" component={BillsIndexContainer} />
    <ProtectedRoute exact path="/bills/new" component={BillFormContainer} />
  </div>
);

export default App;