import React, { Component } from "react";
import { Button, Segment, Divider, Tab, Message, Form, Icon, Header, Progress } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {auth, storage} from '../config';

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: "",
      isUploading: false,
      progressPercentage:0
    };
    this.fileUpload = this.fileUpload.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  async fileUpload() {

    var storageRef = storage.ref('files/'+auth.currentUser.email+'/gallery/'+this.state.fileName); //create storageRef
    var task = storageRef.put(this.state.file); //upload file
    //update progress bar
    task.on('state_changed',
       (snapshot) => {  //percentage denotes progress of file upload
        var percentage = Number(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2));
        this.setState({progressPercentage: percentage });
      },
      function error(err){ },
      function complete(){ }
    );
    }

  fileChange = e => {
    this.setState(
      { file: e.target.files[0], fileName: e.target.files[0].name }
    );
  };

  render() {
    const panes = [
      {

        render: () => (
          <div>

          <Tab.Pane attached={false}>
            <Message style={{textAlign:'center'}}>Make your profile more interesting. Show what you got!</Message>
            <Form onSubmit={this.fileUpload}>
              <Form.Field>
                <Button as="label" htmlFor="file" type="button" animated="fade">
                  <Button.Content visible><Icon name="file" /></Button.Content>
                  <Button.Content hidden>Choose a File</Button.Content>
                </Button>
                <input
                  type="file"
                  id="file"
                  hidden
                  onChange={this.fileChange}
                />
                <Form.Input
                  fluid
                  label="File Chosen: "
                  placeholder="Use the above bar to browse your file system"
                  readOnly
                  value={this.state.fileName}
                />
                <Button style={{ marginTop: "20px" }} type="submit" disabled={this.state.file === null}> Upload </Button>
                <Progress
                  style={{ marginTop: "20px" }}
                  percent={this.state.progressPercentage}
                  id = "progressBar"
                  success
                  progress
                >
                  File Upload Success
                </Progress>

              </Form.Field>
            </Form>
          </Tab.Pane>
          </div>
        )
      }
    ];
    return (

      <Segment style={{ padding: "5em 1em" }} vertical>
        <Header as='h4' size='huge' color='teal' icon textAlign='center'>
            <Icon name='search'  circular />
            <Link to='/mainpage' style={{ color: 'lightseagreen' }} ><Header.Content color='teal'>Scout</Header.Content></Link>
        </Header>
        <Divider horizontal>UPLOAD PICTURES, AUDIOS AND VIDEOS!</Divider>
        <Tab menu={{ pointing: true }} panes={panes} />
      </Segment>
    );
  }
}
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Upload />, rootElement);
