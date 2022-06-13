import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Link,
  NavLinkProps,
} from "react-router-dom";

import { Home } from "./Home";
import { Section } from "./Section";
import { Student } from "./Student";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sections/:id" component={Section} />
        <Route path="/students/:id" component={Student} />
      </Switch>
    </Router>
  );
};
export default App;

const wrapper: HTMLElement | null = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
