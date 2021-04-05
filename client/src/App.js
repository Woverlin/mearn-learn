import './App.css';
import Auth from "./components/Auth";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Auth} />,
      </Switch>
    </Router>
  );
  
}

export default App;
