import React, { Component } from 'react';
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
import autoBind from 'react-autobind';



const Wrapper = styled('div')`
  background: white;
  width: 100vw;
  height: 100vh;
  font-family: -apple-stem, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen";
  h1 {
    color: ${(props) => props.theme.body};
  }
`;

class App extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state ={
      users:{},
      emails:{}
    };
  }
  componentDidMount(){
    auth.onAuthStateChanged(async (user) => {
      if (user) {

        await this.getUserData();
        var us = await this.getUserData();
      }
    })

  }
  wait(ms) {
  return new Promise(r => setTimeout(r, ms));
  }
  getUserData = async (e) => {
    var that = this;
    var usernames={};
    var usernamess;
    var email={}
    var user;
    var i = 0;
    db.ref('users/').on('value',function(snapshot) {
         usernamess = snapshot.val();
         for(user of Object.keys(usernamess)){
           usernames[i]=user;
           email[user]= usernamess[user]['email'];
           i+=1;
         }
      });
    that.setState({users: usernames, emails: email})
    await this.wait(500);
    return usernames;


  }
  returnData(){
    console.log("in return", this.state.users[0]);
  }
  //var users = await data.getUsers();

render(){
  var users = this.returnData() ;
  return (

    <Wrapper>
      <HashRouter>
        <Layout>
          {console.log("test", this.state.users)}
          <Switch>

            {
              Object.keys(this.state.users).map(user=>
                <Route exact path={'/'+ this.state.users[user]} component={() => <UserPage username={this.state.users[user]} email={this.state.emails[this.state.users[user]]} />}/>

              )
              }

            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/makeaccount" component={MakeAccount} />
            <Route exact path="/mainpage" component={MainPage} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path={'/'+'sb5829'} component={UserPage} />

          </Switch>
        </Layout>
      </HashRouter>
    </Wrapper>
  )

}
}

export default withTheme(App);
