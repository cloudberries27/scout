import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import Layout from './Layout';
import Home from './components/Home';
import Login from './components/Login';
import MakeAccount from './components/MakeAccount';
import MainPage from './components/MainPage';

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
  return (
    <Wrapper>
      <HashRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/makeaccount" component={MakeAccount} />
            <Route exact path="/mainpage" component={MainPage} />
          </Switch>
        </Layout>
      </HashRouter>
    </Wrapper>
  );
}

export default withTheme(App);
