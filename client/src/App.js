import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import AddProject from "./components/profile-forms/AddProject";
import Profiles from "./components/profiles/Profiles";
import Posts from "./components/posts/Posts";
import Post from './components/post/Post';
import Profile from "./components/profile/Profile";

//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => { 

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <NavBar />
        <Route exact path="/" component={Landing}></Route>
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/profiles" component={Profiles}></Route>
            <Route exact path="/profile/:id" component={Profile}></Route>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            <PrivateRoute exact path="/add-project" component={AddProject} />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute export path="/posts/:id" component={Post} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)};
export default App;
