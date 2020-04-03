import React from "react";
import { AuthRoute, ProtectedRoute, PendingRoute } from "../util/route_util";
import { Route, Switch, Redirect } from "react-router-dom";
import SplashPageContainer from "./splash/splash_page_container";
import DashboardContainer from "./dashboard/dashboard_container";
import "../styles/application.scss";
import BillsIndexContainer from "./bills/bills_index_container";
import ChoresContainer from "./chores/chores_container";
import CalendarContainer from "./calendar/calendar_container";
import Pending from "./pending/pending";
import NavBar from "./nav/nav";
import NonSplash from "./nonsplash";

const App = () => (
  <div className="app">
    {/* split splash page from other pages because other pages have shared formatting */}
    <Switch>

        <AuthRoute exact path="/" component={SplashPageContainer} />
        <Route component={NonSplash} />
    </Switch>
  </div>
);

export default App;
