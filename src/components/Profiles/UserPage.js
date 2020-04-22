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
import {auth, db, storage} from '../../config.js';
import '../../stylesheets/userpage.css';

const ImageCircular = () => (
  <Image src={profile} size='medium' circular />
)



class MenuCompact extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state={
      user: "",
      audioGallery: [],
      photoGallery : [],
      videoGallery: []
    };
  }

  handleItemClick = (e, { name }) =>{
    //console.log(this.props.audioSegment);



    // createUrl = storageRef.getDownloadURL().then((url) => {
    //     console.log(url);
    //
    // }).catch(function(error){
    //   console.log(error);
    // });

    var file;
    // for (file = 0; file < listRef.length, file++){
    //   console.log(file);
    // }
    this.props.onAudio();
    this.setState({ activeItem: name });
  }
  componentDidMount() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await this.getAllData();
      }
    })
  }
  getAllData = async (e) => {
    var audioGallery = []
    var videoGallery = []
    var photoGallery = []
    if (auth.currentUser){
      this.setState({user:auth.currentUser})
      console.log('currentUser')
      var listRef = storage.ref().child('files/'+auth.currentUser.email+'/gallery'); //all user files
      var res = await listRef.listAll()
      for (var itemRef of res.items) {
         var metadata = await itemRef.getMetadata()
          console.log(metadata);
          if (metadata["contentType"] == "audio/mpeg"){

            var url = await itemRef.getDownloadURL()
            audioGallery.push(url);

          }
          if (metadata["contentType"] == "video/quicktime"){
            var url = await itemRef.getDownloadURL()
            videoGallery.push(url);

          }
          if (metadata["contentType"] == "image/jpeg"){
           var url = await itemRef.getDownloadURL()
            photoGallery.push(url);

          }
        }
        this.setState({audioGallery: audioGallery });
        this.setState({photoGallery: photoGallery });
        this.setState({videoGallery: videoGallery });
        console.log(this.state)

    }

  }
  handleItemClickPhoto = (e, { name }) =>{
    //console.log(this.props.audioSegment);

    this.props.onPhoto();
    this.setState({ activeItem: name });
  }
  handleItemClickVideo = (e, { name }) =>{
    //console.log(this.props.audioSegment);

    this.props.onVideo();
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
          onClick={this.handleItemClickPhoto}
        >
          <Icon name='photo' />
          Galery
        </Menu.Item>

        <Menu.Item
          name='Videos'
          active={activeItem === 'Videos'}
          onClick={this.handleItemClickVideo}
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
      display:'Follow',
      audioVisible : false,
      photoVisible: false,
      videoVisible: false
    };

  }
  handleFollow(){
    //Nikhil here goes your code
    const status= this.state.follows;
    this.setState({follows:true, display:'Following',});
    this.setState((prevState) => ({ audioVisible: !prevState.audioVisible }));

  }
  toggleVisibility(){
    //console.log(this.state.visible);
    if (this.state.photoisible){
      this.setState({photoVisible:false});
    }
    if (this.state.videoVisible){
      this.setState({videoVisible:false});
    }
    this.setState((prevState) => ({ audioVisible: !prevState.audioVisible }));
  }
  toggleVisibilityPhoto(){
    //console.log(this.state.visible);
    if (this.state.audioVisible){
      this.setState({audioVisible:false});
    }
    if (this.state.videoVisible){
      this.setState({videoVisible:false});
    }
    this.setState((prevState) => ({ photoVisible: !prevState.photoVisible }));

  }
  toggleVisibilityVideo(){
    //console.log(this.state.visible);
    if (this.state.audioVisible){
      this.setState({audioVisible:false});
    }
    if (this.state.photoVisible){
      this.setState({photoVisible:false});
    }
    this.setState((prevState) => ({ videoVisible: !prevState.videoVisible }));
  }
  render() {
    const display='Follow'

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
                  <MenuCompact  onAudio={this.toggleVisibility} onPhoto={this.toggleVisibilityPhoto} onVideo={this.toggleVisibilityVideo} />
            </div>
            </Segment>
            <br/>

            <Transition visible={this.state.audioVisible} animation='scale' duration={500}>
              <Segment color='teal'>
              inside of here we need the music data
              </Segment>
            </Transition>
            <Transition visible={this.state.photoVisible} animation='scale' duration={500}>
              <Segment color='teal'>
              inside of here we need the photo data
              </Segment>
            </Transition>
            <Transition visible={this.state.videoVisible} animation='scale' duration={500}>
              <Segment color='teal'>
              inside of here we need the video data
              </Segment>
            </Transition>
            <br/>
            <br/>
            <br/>

        </div>
    )
  }
}
