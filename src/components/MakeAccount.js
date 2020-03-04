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
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state ={
      show: false
    };

  }

  handleChange = (e, { value }) => this.setState({ value })
  handleSubmit() {
    this.setState({show:true});
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
        marginTop: 200
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
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Form>
        <Form.Group>
        <Form.Field
          control={Input}
          label='Username'
          placeholder='Username'
        />
        <Form.Field
          control={Input}
          label='Password'
          placeholder='Password'
        />
        <Form.Field
          control={Input}
          label='Email'
          placeholder='Email'
        />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='First name'
            placeholder='First name'
          />
          <Form.Field
            control={Input}
            label='Last name'
            placeholder='Last name'
          />


          <Form.Field
            control={Select}
            label='Gender'
            options={options}
            placeholder='Gender'
          />


        </Form.Group>

        <Form.Group inline>
          <label>What are you looking for here?</label>
          <Form.Field
            control={Radio}
            label='I want to be discovered'
            value='1'
            checked={value === '1'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label='I want to discover'
            value='2'
            checked={value === '2'}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          label='About you'
          placeholder='Tell us about your experience...'
        />
        <Form.Field
          control={Checkbox}
          label='I agree to the Terms and Conditions'
        />
        <Form.Field control={Button} onClick={this.handleSubmit}>Submit</Form.Field>
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
