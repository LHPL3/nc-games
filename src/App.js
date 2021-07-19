import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Reviews from './components/Reviews';
import Review from './components/Review';
import Users from './components/Users';
import User from './components/User';
import Error from './components/Error';
import Category from './components/Category';

function App() {
  const [signedInUser, setSignedInUser] = useState('');

  return (
    <div className="App">
      <Header signedInUser={signedInUser} />
      <Navbar />
      <Switch>
        <Route exact path="/reviews/:review_id">
          <Review signedInUser={signedInUser} />
        </Route>
        <Route exact path="/category/:category">
          <Category />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/reviews">
          <Reviews />
        </Route>
        <Route exact path="/users">
          <Users signedInUser={signedInUser} />
        </Route>
        <Route exact path="/users/:username">
          <User setSignedInUser={setSignedInUser} />
        </Route>
        <Route path="/">
          <Error />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
