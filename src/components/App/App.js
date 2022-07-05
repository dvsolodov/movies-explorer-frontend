import logo from '../../logo.svg';
import './App.css';

function App() {
  return (
    <div className="page">
      <Switch>
        <Route path="/movies">
        </Route>

        <Route path="/saved-movies">
        </Route>

        <Route path="/profile">
        </Route>

        <Route path="/signin">
        </Route>

        <Route path="/signup">
        </Route>

        <Route path="/signout">
          <Redirect to="/signin" />
        </Route>

        <Route>
          { loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" /> }
        </Route>

      </Switch>
    </div>
  );
}

export default App;
