import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

import logo from "./fetch_logo.png";
import {
  GiDogHouse,
  GiJumpingDog,
  GiLabradorHead,
  GiSniffingDog,
} from "react-icons/gi";
import { SiDatadog } from "react-icons/si";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    window.location.pathname = "/login";
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="logo">
              <img className="homeLogo" src={logo} alt="logo" />
            </div>

            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login">
                    <GiLabradorHead size="50px" color="#EDED2B" />
                  </Link>
                  <Link to="/registration">
                    <GiSniffingDog size="50px" color="#EDED2B" />{" "}
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/">
                    <GiDogHouse size="50px" color="#EDED2B" />
                  </Link>
                  <Link to="/createpost">
                    <SiDatadog size="50px" color="#EDED2B" />
                  </Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              {authState.status && (
                <Link to={`/profile/${authState.id}`} className="usernameLink">
                  {authState.username}
                </Link>
              )}
              {authState.status && (
                <GiJumpingDog
                  size="50px"
                  color="#EDED2B"
                  cursor="pointer"
                  onClick={logout}
                />
              )}
            </div>
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/changepassword" exact component={ChangePassword} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
