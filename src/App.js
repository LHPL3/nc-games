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

  return (
    <div className="App">
      <Header />
      <Navbar />
      <Switch>
        <Route exact path="/reviews/:review_id">
          <Review />
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
          />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/users/user">
          <User />
        </Route>
        <Route path="/">
          <Error />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
