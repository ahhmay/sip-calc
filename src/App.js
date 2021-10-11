import './App.css';
import SipCalculator from './components/sip_calculator/sip_calc';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={SipCalculator} />
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
