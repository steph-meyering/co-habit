import React from "react";
import { ProtectedRoute, PendingRoute } from "../util/route_util";
import {Switch, Redirect } from "react-router-dom";
import DashboardContainer from "./dashboard/dashboard_container";
import "../styles/application.scss";
import BillsIndexContainer from "./bills/bills_index_container";
import ChoresContainer from "./chores/chores_container";
import CalendarContainer from "./calendar/calendar_container";
import Pending from "./pending/pending";
import NavBar from "./nav/nav";

class NonSplash extends React.Component {
  render() {
    return (
      <div className="main-container">
        <ProtectedRoute path="/" component={NavBar} />
        <Switch>
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
    );
  }
}

export default NonSplash;