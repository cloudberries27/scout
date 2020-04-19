import React, { Component, Fragment } from 'react';
import {
  Button,
  Checkbox,
  Header,
  Icon,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Message
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import * as firebase from '../config';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state ={
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: "",
      gender: "",
      type: "",
      experience: "",
      agreement: false,
      touched: {
        username: false,
        password: false,
        email: false,
        first_name: false,
        last_name: false
      },
      usernameError: "Please enter a username"
    };

  }

  toggle = () => this.setState((prevState) => ({ agreement: !prevState.agreement }))

  validate = () => {
    var errors = {
  // true means invalid, so our conditions got reversed
    username: this.state.username.length === 0,
    email: this.state.email.length === 0,
    password: this.state.password.length === 0,
    first_name: this.state.first_name.length === 0,
    last_name: this.state.last_name.length === 0,
    agreement: !this.state.agreement
  }
  return errors;
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleBlur = (field) => (evt) => {this.setState({ touched: { ...this.state.touched, [field]: true }, }); }

  handleSubmit = () => {
    var uniqueUsername = true
    // firebase.db.ref().child('users').on("child_added", function(snapshot, prevChildKey) {
    //   var user = snapshot.val();
    //   if (this.state.username === user.username)
    //   {
    //     uniqueUsername = false;
    //   }
    // });
    if(!uniqueUsername)
    {
        this.state.usernameError = "That username is taken, please enter a valid username";
        this.setState({ username: ""});
        this.validate();
        return;
    }

  firebase.auth.createUserWithEmailAndPassword(this.state.email,this.state.password).catch(function(error) {    //create authentication
  // Handle Errors here.
  var errorMessage = error.message;
  if (errorMessage != null) {
    alert(errorMessage);
    return;
  }
  else {
    alert("Successfully signed up!");
  }
  });
  //needs to be changed so that its users + this.state.email
    firebase.db.ref('users/' + this.state.username).set({  //store user data
      username: this.state.username,
      email: this.state.email,
      first_name: this.state.first_name,
      last_name:this.state.last_name,
      gender:this.state.gender,
      type:this.state.type,
      experience:this.state.experience
     });
    //console.log(this.state.username, this.state.email, this.state.gender);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  canBeSubmitted(){
    const errors = this.validate;
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {

    firebase.db.ref().child('users').on("child_added", function(snapshot, prevChildKey) {
      var user = snapshot.val();
      console.log(user);
      if(user.username != this.state.username)
      {
        console.log("Fuck");
      }
    });

    const errors = this.validate();
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };


    const { value } = this.state
    return (
      <Fragment>
      <div id="wrapper" style = {{ marginTop: 100}}>
        <div id="up" >
          <div>
            <Header as='h4' size='huge' color='teal' icon textAlign='center'>
              <Header.Content>Sign Up</Header.Content>
              <Icon name='user circle' color='teal' />
            </Header>
          </div>
        </div>

        <div className="form-group">
          <div id="down" style = {{ marginTop: 50, display: 'flex', justifyContent: 'center' }}>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Form.Group widths='equal'>
                <Form.Input
                  label='Username'
                  name = 'username'
                  placeholder='Username'
                  onBlur={this.handleBlur("username")}
                  onChange={this.handleChange.bind(this)}
                  error={shouldMarkError('username') && { content: this.state.usernameError, pointing: 'below' }}
                />
                <Form.Input
                  label=' Password'
                  name='password'
                  placeholder='Password'
                  onBlur={this.handleBlur("password")}
                  onChange={this.handleChange.bind(this)}
                  error={shouldMarkError('password') && { content: 'Please enter a password', pointing: 'below' }}
                />
                <Form.Input
                  label='Email'
                  name='email'
                  placeholder='Email'
                  onBlur={this.handleBlur("email")}
                  onChange={this.handleChange.bind(this)}
                  error={shouldMarkError('email') && { content: 'Please enter your email', pointing: 'below' }}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  label='First name'
                  name='first_name'
                  placeholder='First name'
                  onBlur={this.handleBlur("first_name")}
                  onChange={this.handleChange.bind(this)}
                  error={shouldMarkError('first_name') && { content: 'Please enter your first name', pointing: 'below' }}
                />
                <Form.Input
                  fluid label='Last name'
                  placeholder='Last name'
                  name = 'last_name'
                  onBlur={this.handleBlur("last_name")}
                  onChange={this.handleChange.bind(this)}
                  error={shouldMarkError('last_name') && { content: 'Please enter your last name', pointing: 'below'}}
                />
                <Form.Select
                  label='Gender'
                  options={ [
                      { key: 'm', text: 'Male', value: 'male' },
                      { key: 'f', text: 'Female', value: 'female' },
                      { key: 'o', text: 'Other', value: 'other' },
                    ]}
                  placeholder='Gender'
                  name='gender'
                  onBlur={this.handleBlur("gender")}
                  onChange={this.handleChange.bind(this)}
                  error={shouldMarkError('gender') && { content: 'Please select a gender', pointing: 'below'}}
                />
              </Form.Group>
              <Form.Group inline>
                <label>Size</label>
                <Form.Radio
                  label='I want to be discovered'
                  name='type'
                  value='1'
                  checked={value === '1'}
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Radio
                  label='I want to discover'
                  name='type'
                  value='2'
                  checked={value === '2'}
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>
              <Form.TextArea
                  label='About'
                  name='experience'
                  placeholder='Tell us more about you...'
                  onChange={this.handleChange.bind(this)}
              />
              <Form.Checkbox
                  label='I agree to the Terms and Conditions'
                  onChange={this.toggle}
              />
              <Form.Button disabled={isDisabled}>Submit</Form.Button>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
    );
  }
}
