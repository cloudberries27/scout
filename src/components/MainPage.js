import React, { Component} from 'react';
import HeaderApp from '../Header';
import { Button, Icon, Card, Modal, Header} from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import picture from '../images/artist1.jpg';
import picture2 from '../images/artist2.png';
import picture3 from '../images/artist3.jpg';
import autoBind from 'react-autobind';
import {auth, db} from '../config'

import SearchBar from './Search';

class ModalExampleControlled extends Component {

  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
        trigger={<a onClick={this.handleOpen}>
          <Icon name='send' />
          Send request
        </a>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='envelope' color='teal' content='Request has been sent' />
        <Modal.Content>
          <h3>When your request has been accepted, you will see this user in your network.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='teal' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  submitFunction = () => {
    auth.signOut().then(() => {
      this.props.history.push('Login')

  // Sign-out successful.
  }).catch(function(error) {
    alert(error.message)
    console.log("fail");
  // An error happened.
  });
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  setRedirect = () => {
    console.log("hello?");
    this.props.history.push('/login');
  }

  handleClick() {

  }
  searchFunction(event){
    //prevents the page from re-loading
    event.preventDefault();
    //input of search box
    let name = event.currentTarget.searchValue.value; 
    db.ref('users').orderByKey().startAt(name).on("child_added", function(snapshot) {
      console.log(snapshot.key);
    });
  }
  render() {
    const extra = (
      <ModalExampleControlled />
    )
    return (
      <div id="wrapper">
        <div id="up" >
          <div className='right' container style = {{
            marginTop: 30,
            display: 'flex',
            placeContent: 'end space-between'
          }}>
            <SearchBar submitFunction = {this.searchFunction}/>
            <Button type='submit' onClick={this.submitFunction}>Log Out</Button> {/* I created a temp sign out button, to handle authentication */}
          </div>
          <HeaderApp />
        </div>
        <div className="col-3" container style = {{
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center'
        }} >
        <Link to='/elliot-baker'>
        <Card
          image={picture}
          header='Elliot Baker'
          meta='Artist'
          description='Elliot is a painter that specializes in water color paintings.'
          extra={extra}
        />
        </Link>
        </div>
        <div className="col-3" container style = {{
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center'
        }} >
        <Link to='/rachel-brown'>
        <Card
          image={picture2}
          header='Rachael Brown'
          meta='Musician'
          description='Rachel writes and produces her own music and specializes in pop.'
          extra={extra}
        />
        </Link>
        </div>
        <div className="col-3" container style = {{
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center'
        }} >
        <Link to='/michael-rosé'>
        <Card
          image={picture3}
          header='Michael Rosé'
          meta='Singer'
          description='Michael is a singer that has debutted in multiple shows, including opening in Coachella.'
          extra={extra}
        />
        </Link>
        </div>



      </div>

    );
  }
}
export default withRouter(MainPage);
