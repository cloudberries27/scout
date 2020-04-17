import React from 'react';
import { Button, Icon, Input, Header, Form, Message} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';

class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state ={
      email: '',
      password: ''
    };
  }

  handleSubmit = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      var errorMessage = error.message;
      if (errorMessage != null) {
        alert(errorMessage);
        return;
      }
      else {
        this.props.history.push('/mainpage');
      }
      });
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  setRedirect = () => {
    console.log("hello>");
    return <Link to="/login" />
  }

  render() {
    return (
      <div id="wrapper"
      style = {{
        marginTop: 200
      }}>
        <div id="up" >
        <div>
        <Header as='h4' size='huge' color='teal' icon textAlign='center'>
          <Header.Content>User Login</Header.Content>
          <Icon name='sign-in' />
        </Header>
      </div>

        </div>
        <div className="form-group">
        <div id="down" style = {{
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Form >
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

          <Button type='submit'  onClick={this.handleSubmit} style= {{marginLeft: 55}} >Login</Button>
        </Form>
        </div>

        <Message attached='bottom' info style={{marginTop:10, width:200, marginLeft:465}}>
          <Icon name='help' />
          Don't have an account?&nbsp;<Link to='/makeaccount'> Make account here</Link>&nbsp;instead.
        </Message>

        </div>
      </div>

    );
  }
}
export default withRouter(Login);
