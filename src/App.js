import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';

function App() {
  const user= useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(()=>{
    auth.onAuthStateChanged((authUser)  =>{ //  for any point the auth state changes, do this
      if(authUser){
        dispatch(  
          login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
      }))
      }else{ //if not logged in
        dispatch(logout());
      }
    })
  }, []);

  return (
    <div className="app">
      {/* LET'S BUILD SNAPCHAT */}
      <Router>
      {!user ? ( // if no user then direct to login page
        <Login/>
      ): 
      <div className="app__body">
          <Switch>
          <Route exact path="/chats">
              <Chats />
            </Route>
            <Route exact path="/chats/view">
              <ChatView />
            </Route>
          <Route exact path="/preview">
              <Preview />
            </Route>
            <Route exact path="/">
              <WebcamCapture />
            </Route>
          </Switch>
        </div> }
       
      </Router>

    </div>
  );
}

export default App;
