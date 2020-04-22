import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import Layout from './Layout';
import Home from './components/Home';
import Login from './components/Login';
import MakeAccount from './components/MakeAccount';
import MainPage from './components/MainPage';
import Upload from './components/Upload';
import UserPage from './components/Profiles/UserPage';
import UserPage2 from './components/Profiles/UserPage2';
import UserPage3 from './components/Profiles/UserPage3';
import {auth, db, storage} from './config';

const Wrapper = styled('div')`
  background: white;
  width: 100vw;
  height: 100vh;
  font-family: -apple-stem, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen";
  h1 {
    color: ${(props) => props.theme.body};
  }
`;

function App() {
  var users= []

  var usernames='';
  console.log("test");
  db.ref('users/').on('value',function(snapshot) {
    snapshot.forEach(function(child)
    {
      users.push(child.val().username);
    });
  });
  console.log(users);
  return (
    <Wrapper>
      <HashRouter>
        <Layout>
          <Switch>
            {Object.keys(users).map(user =>
              <Route exact path={'/'+user} component={UserPage}/>
            )}
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/makeaccount" component={MakeAccount} />
            <Route exact path="/mainpage" component={MainPage} />
            <Route exact path="/upload" component={Upload} />
            //<Route exact path={'/'+'sb5829'} component={UserPage} />

          </Switch>
        </Layout>
      </HashRouter>
    </Wrapper>
  );
}

export default withTheme(App);
