import React from "react";
import { AuthRoute } from "../util/route_util";
import { Route, Switch } from "react-router-dom";
import SplashPageContainer from "./splash/splash_page_container";
import "../styles/application.scss";
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
