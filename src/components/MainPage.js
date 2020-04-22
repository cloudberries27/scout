import React, { Component} from 'react';
import HeaderApp from '../Header';
import { Button, Icon, Card, Modal, Header, Segment} from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import picture from '../images/artist1.jpg';
import picture2 from '../images/artist2.png';
import picture3 from '../images/artist3.jpg';
import autoBind from 'react-autobind';
import {auth, db, storage} from '../config';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import SearchBar from './Search';


//this is gonna need to contain the information about the user
const square = { width: 55, height: 35, color: 'teal' }
const Profile = () => (
  <div>
  <Link to='/elliot-baker'>
    <Segment circular style={square}>
      <Icon name='user outline'/>
      My profile
    </Segment>
  </Link>

  </div>
)

class ModalExampleControlled extends Component {

  state = { modalOpen: false}

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

//   const Player = () => (
//   <AudioPlayer
//     autoPlay
//     src="http://example.com/audio.mp3"
//     onPlay={e => console.log("onPlay")}
//     // other props here
//   />
// );

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

class MainPage extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      users: {},
      profile_pics: {sb58299:'eee'}
    };
  }

  componentDidMount() {
    var that = this;
    var usernames='';
    var user;
    var attr;
     db.ref('users/').on('value',function(snapshot) {
        usernames = snapshot.val();
        that.setState({
          users: usernames
        });
        for(user of Object.keys(that.state.users)){

          for(attr of Object.keys(that.state.users[user])){

            if(attr=='type'){
              if (that.state.users[user]['type']==1){
                that.state.users[user]['type']='Scout';
              }
            }
          }
        }
        that.getProPics();
     });



  }
  getProPics = async (e) => {

    if (auth.currentUser){
      var pics= {}
      var user;
      for(user of Object.keys(this.state.users)){
        var storageRef = storage.ref().child('files/'+this.state.users[user]['email']+'/profilepics');
        //var listRef = storage.ref().child('files/'+auth.currentUser.email+'/gallery'); //all user files
        var res = await storageRef.listAll();
        for(var itemRef of res.items){
          console.log("inside storage ref", user, itemRef.getDownloadURL());
          var url = await itemRef.getDownloadURL();
          console.log("user is", user, url);
          pics[user]=url;

        }


      }


      this.setState({profile_pics:pics});
    }

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

  uploadFunction = () => {
    console.log('test');
    var uploader = document.getElementById('uploader');
    console.log(uploader.value);
    var fileButton = document.getElementById('fileButton');
    var file = fileButton.files[0];
    console.log(file);
    var storageRef = storage.ref('files/'+auth.currentUser.email+'/'+file.name); //create storageRef
    var task = storageRef.put(file); //upload file
    //update progress bar
    task.on('state_changed',
      function progress(snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
      },
      function error(err){

      },
      function complete(){
            // Create a reference to the file we want to download

      }); //hi
  }

  // playAudio = () =>{
  //   var show = document.getElementById('audioClip');
  //   show.play();
  // }
  //
  // stopAudio = () =>{
  //   var show = document.getElementById('audioClip');
  //   show.pause();
  // }

  async downloadFunction() {
    // var show = document.getElementById('showPhoto'); //this is for photos
    // var show = document.getElementById('sampleMovie'); //this is for videos
    var show = this.rap.audio.current; //this is for audio
    console.log(this.rap.audio);
    var fileButton = document.getElementById('fileButton');
    var file = fileButton.files[0];
    var storageRef = storage.ref('files/'+auth.currentUser.email+'/'+file.name); //create storageRef
    show.src = await storageRef.getDownloadURL().then((result) => {
        show.src = result;
        return result;
    }).catch(function(error){
      console.log(error);
    });
    console.log(this.rap.audio);
  }





  setRedirect = () => {
    // console.log("hello?");
    this.props.history.push('/login');
  }

  handleClick() {

  }
  returnType(user){
    var attr;
    if(this.state.users[user]){
      for(attr of Object.keys(this.state.users[user])){
        //console.log('in return', attr);
        if(attr=='type'){
          if (this.state.users[user]['type']==1){
            return 'Scout';
          }
          else{
            return 'Recruiter';
          }
        }
      }
    }
    }
  returnPicture(user){
    console.log("in pro pic", this.state.profile_pics);
    if(this.state.profile_pics[user]){
      console.log("in pro pic", this.state.profile_pics);
      return this.state.profile_pics[user];
    }
  }
  searchFunction(event){
    //prevents the page from re-loading
    event.preventDefault();
    //input of search box
    let name = event.currentTarget.searchValue.value;

    db.ref('users/'+name).on('value',function(snapshot) {
      var username = snapshot.val();
      console.log(username);
      if (username == null){  //user not found
        alert("User does not exist!");
      }
      else {  //user found
        alert("User found");
        //will set up a link to direct individual to porfolio
      }
    });
  }


  // replace either of these on the line where <AudioPlayer pref...> around 197
  // when doing any of them make sure to only have 1 type at once otherwise it gets messy
  // <img id='showPhoto'/> this is for images
  // <video id="sampleMovie" width="640" height="360" preload controls></video> this is for videos
  // <AudioPlayer ref={(element) => {this.rap = element;}} />

  render() {
    auth.onAuthStateChanged(function(user) {
    if (user) {


    } else {
      console.log("no");
    }

  }

);

    const extra = (
      <ModalExampleControlled />
    )
    const {users} = this.state;
    return (

      <div id="wrapper">
        <div id="up" >
          <div className='right' container style = {{
            marginTop: 30,
            display: 'flex',
            placeContent: 'end space-between'
          }}>
            <Profile/>
            <Button type='submit' onClick={this.submitFunction}>Log Out</Button>
          </div>
          <HeaderApp />
        </div>

        <div>
        {console.log("outside", users)}
        {
          Object.keys(users).map(user =>
            <div className="col-3" container style = {{
              marginTop: 30,
              display: 'flex',
              justifyContent: 'center'
            }} >
            <Card

              image={this.state.profile_pics[user]}
              header= <Link to={'/'+user}>{users[user]['first_name'] +" " +users[user]['last_name']}</Link>
              meta={this.returnType(user)}
              description={users[user]['experience']}
              extra={extra}
            />
            </div>
          )}
        </div>

      </div>

    );
  }
}
export default withRouter(MainPage);
