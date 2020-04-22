import React, { Component } from 'react';
import { Header, Menu, Button,
  Icon, Image, Divider,
   Segment, Item, Container,
   Transition
 } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Tabs from '../Tabs/Tabs';
import profile from '../../images/artist1.jpg';
import autoBind from 'react-autobind';

import '../../stylesheets/userpage.css';

const ImageCircular = () => (
  <Image src={profile} size='medium' circular />
)
class AudioSegment extends Component{
  state = { visible: true }

  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }))

  render() {
    const { visible } = this.state

    return (
      <div>
        <Button
          content={visible ? 'Hide' : 'Show'}
          onClick={this.toggleVisibility}
        />
        <Divider hidden />
        <Transition visible={visible} animation='scale' duration={500}>
          <Segment color='teal'>Teal</Segment>
        </Transition>
      </div>
    )
  }
}



class MenuCompact extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state={};
  }

  handleItemClick = (e, { name }) =>{
    console.log(this.props.audioSegment);
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu compact icon='labeled' >
        <Menu.Item
          name='Audio'
          active={activeItem === 'Audio'}
          onClick={this.handleItemClick}

        >
          <Icon name='music' />
          Audio
        </Menu.Item>

        <Menu.Item
          name='Gallery'
          active={activeItem === 'Gallery'}
          onClick={this.handleItemClick}
        >
          <Icon name='photo' />
          Galery
        </Menu.Item>

        <Menu.Item
          name='Videos'
          active={activeItem === 'Videos'}
          onClick={this.handleItemClick}
        >
          <Icon name='video play' />
          Videos
        </Menu.Item>
      </Menu>
    )
  }
}

export default class UserPage extends Component {
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
      usernameError: "Please enter a username",
      follows: false,
      display:'Follow'
    };

  }
  handleFollow(){
    //Nikhil here goes your code
    const status= this.state.follows;
    this.setState({follows:true, display:'Following'});

  }
  render() {
    const display='Follow'

    const audioSegment = <AudioSegment/>
    return (
        <div>
            <Header as='h4' size='huge' color='teal' icon textAlign='center'>
                <Icon name='search'  circular />
                <Link to='/mainpage' style={{ color: 'lightseagreen' }} ><Header.Content color='teal'>Scout</Header.Content></Link>
            </Header>


            <Segment raised>
            <Button basic color='teal' onClick={this.handleFollow}>
            {this.state.display}
            </Button>
            <div className='header'>
             <ImageCircular />
            </div>

            <Divider horizontal style={{ color: 'lightseagreen', fontSize: 'x-large' }}>Elliot Whatever</Divider>
            <Item style={{justifyContent: 'center',
                  alignItems: 'center', color: 'dimgray',  display: 'flex'}}>
              <Item.Content>
                <br/>
                <Item.Description style={{fontSize:'large'}}>
                Painter
                </Item.Description>
              </Item.Content>

            </Item>
            <br/>
            <br/>
            <Container textAlign='center' style={{color:'gray', width:455}}>
            An artist of considerable range, Chet Faker —
            the name taken by Melbourne-raised, Brooklyn-based Nick Murphy —
             writes, performs and records
            all of his own music, giving it a warm, intimate feel with a solid groove structure.
            </Container>
            <br/>
            <br/>
            <div style={{justifyContent: 'center',
                  alignItems: 'center', display: 'flex'}}>
                  <MenuCompact audioSegment={audioSegment}/>
            </div>
            </Segment>
            <br/>
            {audioSegment}

        </div>
    )
  }
}
