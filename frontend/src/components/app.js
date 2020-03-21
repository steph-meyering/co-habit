import React from "react";
import { AuthRoute, ProtectedRoute, PendingRoute } from "../util/route_util";
import { Route, Switch, Redirect } from "react-router-dom";
import SplashPageContainer from "./splash/splash_page_container";
import DashboardContainer from "./dashboard/dashboard_container";
import "../styles/application.scss";
import BillsIndexContainer from "./bills/bills_index_container";
import BillFormContainer from "./bills/bill_form_container";
import ChoresContainer from "./chores/chores_container";
import CalendarContainer from "./calendar/calendar_container";
import Pending from "./pending/pending";
import NavBar from "./nav/nav";

const App = () => (
  <div className="app">
    <div className="main-container">
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={SplashPageContainer} />
        <PendingRoute
          exact
          path="/dashboard"
          component={DashboardContainer}
        />
        <PendingRoute exact path="/chores" component={ChoresContainer} />
        <PendingRoute exact path="/bills" component={BillsIndexContainer} />
        <PendingRoute exact path="/calendar" component={CalendarContainer} />
        <ProtectedRoute exact path="/pending" component={Pending} />
        {/* Default redirect given bad path */}
        <Redirect path="*" to="/dashboard" />
      </Switch>
    </div>
  </div>
);

export default App;
