import React, { Component } from 'react';
import { Header, Menu, Button, Icon, Image, Divider, Segment, Item, Container, Transition } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import {auth, db, storage} from '../../config.js';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player'
import '../../stylesheets/userpage.css';

class MenuCompact extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state={
      user: ""
    };
  }

  handleItemClick = (e, { name }) =>{
    this.props.onAudio();
    this.setState({ activeItem: name });
  }

  handleItemClickPhoto = (e, { name }) =>{
    this.props.onPhoto();
    this.setState({ activeItem: name });
  }
  handleItemClickVideo = (e, { name }) =>{
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
          Gallery
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
      profession: "",
      agreement: false,
      touched: {
        username: false,
        password: false,
        email: false,
        first_name: false,
        last_name: false
      },
      sameUser: false,
      follows: false,
      display:'Follow',
      follow:'Follow',
      audioVisible : false,
      photoVisible: false,
      videoVisible: false,
      audioGallery: [],
      photoGallery : [],
      videoGallery: [],
      userData:{},
      profile_pic:'',
      button:''
    };

  }
  componentDidMount() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {

        await this.getAllData();
        await this.getUserData();
        await this.getProPics();
        await this.getButton();
      }
    })

  }
  getProPics = async (e) => { //retrieves profile picsc

    if (auth.currentUser){
      var pic;
      var user;

      var storageRef = storage.ref().child('files/'+this.state.userData['email']+'/profilepics');
      var res = await storageRef.listAll();
      for(var itemRef of res.items){
        var url = await itemRef.getDownloadURL();
        pic=url;
      }
      this.setState({profile_pic:pic});
    }

  }
  wait(ms) {
  return new Promise(r => setTimeout(r, ms));
  }
  getButton = async (e) =>{

    var component = <Button basic color='teal' onClick={this.handleFollow}>
    {this.state.follow}
    </Button>
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        if(this.state.userData['email'] === user.email){ //if its the user's profile, the user will be allowed to upload
          component=
          <div>
          <Link to='/upload' style={{ color: 'lightseagreen' }} >
          <Button basic color='teal' >
          Upload
          </Button>
          </Link>

          </div>
        }

      }
    })
    await this.wait(600);
    this.setState({button:component});

  }
  getUserData = async (e) => {
    var that = this;
    var usernames={};
    var user;
    if (auth.currentUser){
      db.ref('users/').on('value',function(snapshot) {
         usernames = snapshot.val();
         for(user of Object.keys(usernames)){
           if(user=== that.props.username){

             that.setState({userData: usernames[user]});
             if(usernames[user]['type']===1){
               that.state.userData['type']='Scout';
             }
             else{
               that.state.userData['type']='Recruiter';
             }
           }
         }
      });
      }
      await this.wait(500);
    }

  getAllData = async (e) => {
    var audioGallery = []
    var videoGallery = []
    var photoGallery = []
    if (auth.currentUser){
      this.setState({user:this.props.username})
      var listRef = storage.ref().child('files/'+this.props.email+'/gallery'); //all user files
      var res = await listRef.listAll()
      for (var itemRef of res.items) {
         var metadata = await itemRef.getMetadata()

          if (metadata["contentType"] === "audio/mpeg" || metadata["contentType"] === "audio/mp3"){ //parse music

            var url = await itemRef.getDownloadURL()
            audioGallery.push(url);

          } //parse video
          if (metadata["contentType"] === "video/quicktime" || metadata["contentType"] === "video/mov" || metadata["contentType"] === "video/mp4"){
            var url = await itemRef.getDownloadURL()
            videoGallery.push(url);

          }  //parse image
          if (metadata["contentType"] === "image/jpeg"){
           var url = await itemRef.getDownloadURL()
            photoGallery.push(url);

          }
        }
        this.setState({audioGallery: audioGallery });
        this.setState({photoGallery: photoGallery });
        this.setState({videoGallery: videoGallery });
    }

  }
  handleFollow(){
    const status= this.state.follows;
    this.setState({follows:true, follow:'Following',});
    this.setState((prevState) => ({ audioVisible: !prevState.audioVisible }));
    this.getButton();

  }

  toggleVisibility(){
    this.setState({photoVisible:false});
    if (this.state.videoVisible){
      this.setState({videoVisible:false});
    }
    this.setState((prevState) => ({ audioVisible: !prevState.audioVisible }));
  }
  toggleVisibilityPhoto(){

    if (this.state.audioVisible){
      this.setState({audioVisible:false});
    }
    if (this.state.videoVisible){
      this.setState({videoVisible:false});
    }
    this.setState((prevState) => ({ photoVisible: !prevState.photoVisible }));

  }
  toggleVisibilityVideo(){
    if (this.state.audioVisible){
      this.setState({audioVisible:false});
    }
    if (this.state.photoVisible){
      this.setState({photoVisible:false});
    }
    this.setState((prevState) => ({ videoVisible: !prevState.videoVisible }));
  }
  getType(){
    return this.state.userData['type'];
  }


  render() {
    var url = window.location.href;
    var thisUser = url.lastIndexOf('/')
    if(url.substring(thisUser) === ("/" + this.state.userData['username']))
    {
      this.state.sameUser = true;
      this.state.display = "Upload";
    }


    return (
        <div>
            <Header as='h4' size='huge' color='teal' icon textAlign='center'>
                <Icon name='search'  circular />
                <Link to='/mainpage' style={{ color: 'lightseagreen' }} ><Header.Content color='teal'>Scout</Header.Content></Link>
            </Header>

            <Segment raised>
            {this.state.button}

            <div className='header'>
            <Image src={this.state.profile_pic} size='medium' circular />



            </div>
            <Divider horizontal style={{ color: 'lightseagreen', fontSize: 'x-large' }}>{this.state.userData['first_name']+" "+this.state.userData['last_name']}</Divider>
            <Item style={{justifyContent: 'center',
                  alignItems: 'center', color: 'dimgray',  display: 'flex'}}>
              <Item.Content>
                <br/>
                <Item.Description style={{fontSize:'large'}}>
                 {this.state.userData['profession']}
                </Item.Description>
              </Item.Content>

            </Item>
            <br/>
            <br/>
            <Container textAlign='center' style={{color:'gray', width:455}}>
            {this.state.userData['experience']}
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
            <Segment color ='teal' compact textAlign='center' style={{width:350, marginLeft:'380px'}}>
            {

              this.state.audioGallery.map(song=>
                  <Segment color='teal' compact >
                  <ReactAudioPlayer
                    src={song}
                    controls
                  />
                  </Segment>
              )
            }
            </Segment>
            </Transition>
            <Transition visible={this.state.photoVisible} animation='scale' duration={500} >
            <Segment color ='teal' compact textAlign='center' style={{width:350, marginLeft:'380px'}}>
            {
              this.state.photoGallery.map(pic=>
                  <Segment color='teal' compact >
                  <Image src={pic} size='medium' centered rounded bordered />
                  </Segment>
              )
            }
            </Segment>
            </Transition>
            <Transition visible={this.state.videoVisible} animation='scale' duration={500}>
            <Segment color ='teal' compact textAlign='center' style={{ width:650,marginLeft:'250px'}}>
            {
              this.state.videoGallery.map(video=>
                  <ReactPlayer url={video} playing={false} controls={true} />
              )
            }
            </Segment>
            </Transition>
            <br/>
            <br/>
            <br/>

        </div>
    )
  }
}
