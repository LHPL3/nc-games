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

function App() {
  const [category, setCategory] = useState('');
  const [reviews, setReviews] = useState('');
  const [signedInUser, setSignedInUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="App">
      <Header />
      <Navbar signedInUser={signedInUser} />
      <Switch>
        <Route exact path="/reviews/:review_id">
          <Review
            signedInUser={signedInUser}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/reviews">
          <Reviews
            category={category}
            setCategory={setCategory}
            reviews={reviews}
            setReviews={setReviews}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/users/:username">
          <User
            setSignedInUser={setSignedInUser}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </Route>
        <Route path="/">
          <Error />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
