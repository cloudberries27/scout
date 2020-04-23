import React, { Component} from 'react';
import HeaderApp from '../Header';
import _ from 'lodash'
import { Button, Icon, Card, Modal, Header, Segment, Grid, Search} from 'semantic-ui-react';
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
const Profile = (props) => (
  <div>
  <Link to={'/'+props.user}>
    <Segment circular style={square}>
      <Icon name='user outline'/>
      My profile
    </Segment>
  </Link>

  </div>
)

class SearchBarComponent extends Component {

  state = {isLoading: false, results:[], value:""}
  handleResultSelect = (e, { result }) => this.setState({ value: result.username })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState({isLoading: false, results:[], value: "" })

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.username)
      this.setState({
        isLoading: false,
        results: _.filter(this.state.users, isMatch),
      })
    }, 300)
  }

  render()
  {
    return (
  <div className="searchBar" container sytle = {{marginTop: 30, display: 'flex', justifyContent: 'center'}}>
  <Search
    loading={this.state.isLoading}
    onResultSelect={this.handleResultSelect}
    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true, })}
    results={this.state.results}
    value={this.state.value}
    {...this.props}
  />
  </div>
)
}


}

class ModalExampleControlled extends Component {

  state = { modalOpen: false}

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

class MainPage extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      users: {},
      profile_pics: {},
      currentUser:''
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
              else{
                that.state.users[user]['type']='Recruiter';
              }
            }
            if(attr=='email' && that.state.users[user][attr]==auth.currentUser.email){
              that.setState({currentUser: user});
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
        var res = await storageRef.listAll();
        for(var itemRef of res.items){
          var url = await itemRef.getDownloadURL();
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
  // An error happened.
    });
  }


  async downloadFunction() {
    var show = this.rap.audio.current; //this is for audio
    // console.log(this.rap.audio);
    var fileButton = document.getElementById('fileButton');
    var file = fileButton.files[0];
    var storageRef = storage.ref('files/'+auth.currentUser.email+'/'+file.name); //create storageRef
    show.src = await storageRef.getDownloadURL().then((result) => {
        show.src = result;
        return result;
    }).catch(function(error){
      console.log(error);
    });
  }

  setRedirect = () => {
    this.props.history.push('/login');
  }


  returnType(user){
    var attr;
    if(this.state.users[user]){
      for(attr of Object.keys(this.state.users[user])){
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
    if(this.state.profile_pics[user]){
      return this.state.profile_pics[user];
    }
  }

  render() {
    auth.onAuthStateChanged(function(user) {
    if (user) {
        //signed in

    } else {

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
            <Profile user={this.state.currentUser}/>
            <Button type='submit' onClick={this.submitFunction}>Log Out</Button>
          </div>
          <HeaderApp />
        </div>

        <div>
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
              meta={users[user]['type']}
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
