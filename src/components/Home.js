import React, { Component } from 'react';
import Header_app from '../Header';
import { Button, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }
  setRedirect = () => {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div id="wrapper"
      style = {{
        marginTop: 200,
      }}>
        <div id="up" >
        <Header_app />
        </div>
        <div id="down" style = {{

          marginTop: 30,
          display: 'flex',
          justifyContent: 'center'
        }} >

        <Button animated onClick={this.setRedirect}>
          <Button.Content visible>Get Started</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>


        </div>



      </div>

    );
  }
}
export default withRouter(Home);
