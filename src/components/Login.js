import React, { Component } from 'react';
import { Button, Icon, Header, Form, Message} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }
  handleClick(){
    this.props.history.push('/mainpage');
  }
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
          <Form.Field>
            <label>Username</label>
            <input placeholder='Username' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password' />
          </Form.Field>



          <Button type='submit'  onClick={this.handleClick} style= {{marginLeft: 55}} >Login</Button>
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
