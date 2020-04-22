import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Segment,
  Divider,
  Tab,
  Table,
  Message,
  Checkbox,
  Form,
  Icon,
  Input,
  Dropdown,
  Dimmer,
  Loader,
  Label,
  Progress
} from "semantic-ui-react";
import {auth, db, storage} from '../config';

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: "",
      isUploading: false,
      statusCode: "",
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
       (snapshot) => {
        var percentage = Number(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2));
        console.log("this progress",percentage)
        this.setState({progressPercentage: percentage });
      },
      function error(err){ },
      function complete(){ }
    );
    }

  fileChange = e => {
    this.setState(
      { file: e.target.files[0], fileName: e.target.files[0].name },
      () => {
        console.log(
          "File chosen --->",
          this.state.file,
          console.log("File name  --->", this.state.fileName)
        );
      }
    );
  };

  render() {
    const { statusCode } = this.state;
    const panes = [
      {

        render: () => (
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
        )
      }
    ];
    return (
      <Segment style={{ padding: "5em 1em" }} vertical>
        <Divider horizontal>UPLOAD PICTURES, AUDIOS AND VIDEOS!</Divider>
        <Tab menu={{ pointing: true }} panes={panes} />
      </Segment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Upload />, rootElement);
