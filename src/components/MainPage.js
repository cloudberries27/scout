import React, { Component } from 'react';
import Header_app from '../Header';
import { Button, Icon, Card, Modal, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import picture from '../images/artist1.jpg';
import picture2 from '../images/artist2.png';
import picture3 from '../images/artist3.jpg';
import autoBind from 'react-autobind';

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

  render() {
    const extra = (
      <ModalExampleControlled />
    )
    return (
      <div id="wrapper">
        <div id="up" >
        <Header_app />
        </div>
        <div className="col-3" container style = {{
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center'
        }} >
        <Card
          image={picture}
          header='Elliot Baker'
          meta='Artist'
          description='Elliot is a painter that specializes in water color paintings.'
          extra={extra}
        />
        </div>
        <div className="col-3" container style = {{
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center'
        }} >
        <Card
          image={picture2}
          header='Rachael Brown'
          meta='Musician'
          description='Rachel writes and produces her own music and specializes in pop.'
          extra={extra}
        />
        </div>
        <div className="col-3" container style = {{
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center'
        }} >
        <Card
          image={picture3}
          header='Michael Rosé'
          meta='Singer'
          description='Michael is a singer that has debutted in multiple shows, including opening in Coachella.'
          extra={extra}
        />
        </div>



      </div>

    );
  }
}
export default withRouter(MainPage);
