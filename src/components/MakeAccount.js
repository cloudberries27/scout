import React, { Component } from 'react';
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



const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]
const FormExampleSuccess = () => (
<Form success>
  <Message
    success
    header='Successfully signed up!'
    content="You now have an account with Scout. Please go to login page"
  />
  <Link to='/login'>Log in</Link>
</Form>
)
const MessageNegative = () => (
<Message negative>
  <Message.Header>Please accept the terms and conditions</Message.Header>
</Message>
)

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state ={
      username: '',
      password: '',
      email: '',
      first_name:'',
      last_name:'',
      gender:'',
      type:'',
      experience:'',
      agreement: false,
      show: false
    };

  }
  toggle = () => this.setState((prevState) => ({ agreement: !prevState.agreement }))

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    if(!this.state.agreement)
    {
      MessageNegative();
      return
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


  render() {
    const { value } = this.state
    return (
      <div id="wrapper"
      style = {{
        marginTop: 100
      }}>
        <div id="up" >
        <div>
        <Header as='h4' size='huge' color='teal' icon textAlign='center'>
          <Header.Content>Sign Up</Header.Content>
          <Icon name='user circle' color='teal' />
        </Header>
      </div>

        </div>
        <div className="form-group">
        <div id="down" style = {{
          marginTop: 50,
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
        <Form.Group>
        <Form.Field
          control={Input}
          label='Username'
          name = 'username'
          placeholder='Username'
          onChange={this.handleChange}
        />
        <Form.Field
          control={Input}
          label=' Password'
          name='password'
          placeholder='Password'
          onChange={this.handleChange}
        />
        <Form.Field
          control={Input}
          label='Email'
          name='email'
          placeholder='Email'
          onChange={this.handleChange}
        />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='First name'
            name='first_name'
            placeholder='First name'
            onChange={this.handleChange}
          />
          <Form.Field
            control={Input}
            label='Last name'
            name='last_name'
            placeholder='Last name'
            onChange={this.handleChange}
          />


          <Form.Field
            control={Select}
            label='Gender'
            name='gender'
            options={options}
            placeholder='Gender'
            onChange={this.handleChange}
          />


        </Form.Group>

        <Form.Group inline>
          <label>What are you looking for here?</label>
          <Form.Field
            control={Radio}
            label='I want to be discovered'
            value='1'
            checked={value === '1'}
            name='type'
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label='I want to discover'
            name='type'
            value='2'
            checked={value === '2'}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          label='About you'
          name='experience'
          placeholder='Tell us about your experience...'
          onChange={this.handleChange}
        />
        <Form.Field
          control={Checkbox}
          label='I agree to the Terms and Conditions'
          onChange={this.toggle}
        />
        <Button type='submit' >Submit</Button>
      </Form>
        </div>
        {this.state.show &&
          <FormExampleSuccess />
        }
        </div>


      </div>

    );
  }
}
