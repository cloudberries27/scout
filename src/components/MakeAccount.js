import React, { Fragment } from 'react';
import { Header, Form, Icon } from 'semantic-ui-react'
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
    gender: this.state.gender.length === 0,
    type: this.state.type.length === 0,
    agreement: !this.state.agreement
  }
  return errors;
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleBlur = (field) => (evt) => {this.setState({ touched: { ...this.state.touched, [field]: true }, }); }

  test = () => console.log("test");

  async handleSubmit() {
    var uniqueUsername = true;
    var tempname = this.state.username;

    const userRef = firebase.db.ref().child('users');
    await userRef.once('value', function(data) {
      data.forEach(function(child){
        var user = child.val();
        if(user.username === tempname)
        {
          uniqueUsername = false;
        }
      });
    });

    if(!uniqueUsername)
    {
        this.setState({usernameError: "That username is taken, please enter a valid username"});
        this.setState({ username: ""});
        this.validate();
        return;
    }
    else {

      firebase.auth.createUserWithEmailAndPassword(this.state.email,this.state.password).catch(function(error) {    //create authentication
      var errorMessage = error.message;
      if (errorMessage != null) {
        alert(errorMessage);
        return;
      }
      else {
        alert("Successfully signed up!");
      }
      });
        firebase.db.ref('users/' + this.state.username).set({  //store user data
          username: this.state.username,
          email: this.state.email,
          first_name: this.state.first_name,
          last_name:this.state.last_name,
          gender:this.state.gender,
          type:this.state.type,
          experience:this.state.experience
         });
    }
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

    const errors = this.validate();
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

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
                  error={shouldMarkError('password') && { content: 'Please enter a password', pointing: 'above' }}
                />
                <Form.Input
                  label='Email'
                  name='email'
                  placeholder='Email'
                  onBlur={this.handleBlur("email")}
                  onChange={this.handleChange.bind(this)}
                  error={shouldMarkError('email') && { content: 'Please enter your email', pointing: 'above' }}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  label='First name'
                  name='first_name'
                  placeholder='First name'
                  onBlur={this.handleBlur("first_name")}
                  onChange={this.handleChange.bind(this)}
                  error={shouldMarkError('first_name') && { content: 'Please enter your first name', pointing: 'above' }}
                />
                <Form.Input
                  fluid label='Last name'
                  placeholder='Last name'
                  name = 'last_name'
                  onBlur={this.handleBlur("last_name")}
                  onChange={this.handleChange.bind(this)}
                  error={shouldMarkError('last_name') && { content: 'Please enter your last name', pointing: 'above'}}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Select
                  label='Gender'
                  options={ [
                      { key: 'm', text: 'Male', value: 'male' },
                      { key: 'f', text: 'Female', value: 'female' },
                      { key: 'o', text: 'Other', value: 'other' },
                    ]}
                  placeholder='Gender'
                  name='gender'
                  onChange={this.handleChange.bind(this)}
                  error={shouldMarkError('gender') && { content: 'Please select a gender', pointing: 'above'}}
                />
                <Form.Select
                  label='Goal'
                  options={ [
                    { key: '1', text: 'I want to be discovered', value: '1' },
                    { key: '2', text: 'I want to discover', value: '2' },
                    { key: '3', text: 'I want to discover and be discovered', value: '3'}
                  ]}
                  placeholder='What are you looking for?'
                  name='type'
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
