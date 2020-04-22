import React, { Component} from 'react';
import HeaderApp from '../Header';
import { Button, Icon, Card, Modal, Header, Segment} from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import picture from '../images/artist1.jpg';
import picture2 from '../images/artist2.png';
import picture3 from '../images/artist3.jpg';
import autoBind from 'react-autobind';
import {auth, db, storage} from '../config'
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

  componentDidMount() {

  }


  componentWillUnmount() {

  }

  setRedirect = () => {
    // console.log("hello?");
    this.props.history.push('/login');
  }

  handleClick() {

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
      console.log(user);
    } else {
      console.log("no");
    }
  });
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
            <Profile/>
            <Button type='submit' onClick={this.submitFunction}>Log Out</Button>
          </div>
          <HeaderApp />
          <progress value="0" max ="100" id="uploader">0%</progress>
          <text>this is temporary(for testing)</text>
          <input type="file" name='fileUploaded' id="fileButton"/>
          { <Button type='Button' onClick={this.uploadFunction}>Upload</Button>}
          { <Button type='Button' onClick={this.downloadFunction}>Show</Button>}
        </div>
        <div className="image" container style = {{marginTop: 30, display: 'flex', justifyContent: 'center'}}>
          <text>this is temporary</text>
          <AudioPlayer ref={(element) => {this.rap = element;}} />
        </div>
        <div className="col-3" container style = {{
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center'
        }} >

        <Card
          image={picture}
          header= <Link to='/elliot-baker'>Elliot Baker</Link>
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
          header=<Link to='/racher-rose'>Rachel Brown</Link>
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
          header=<Link to='/michael-rose'> Michael Rosé</Link>
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
