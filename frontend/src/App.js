import logo from "./logo.svg";
import "./App.css";
import Navbar from "./shared/Navbar";
import Home from "./components/Home";

import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/" render={() => <Redirect to="/home" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
