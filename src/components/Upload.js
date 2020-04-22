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

import axios from "axios";




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

  onFormSubmit = e => {
    e.preventDefault(); // Stop form submit
    console.log("form submit");
    this.fileUpload(this.state.file);
  };
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  fileUpload = async file => {
    const formData = new FormData();
    formData.append("file", file);
    console.log('test');
    console.log(file);
    var storageRef = storage.ref('files/'+auth.currentUser.email+'/'+file.name); //create storageRef
    var task = storageRef.put(file); //upload file
    //update progress bar
    task.on('state_changed',
       (snapshot) => {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("this progress",percentage)
        this.setState({progressPercentage: percentage });
      },
      function error(err){

      },
      function complete(){
            //Create a reference to the file we want to download

      }); //hi
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

<<<<<<< HEAD




    // try {
    //   axios.post("/file/upload/enpoint").then(response => {
    //     console.log(response);
    //     console.log(response.status);
    //     this.setState({ statusCode: response.status }, () => {
    //       console.log(
    //         "This is the response status code --->",
    //         this.state.statusCode
    //       );
    //     });
    //   });
    // } catch (error) {
    //   console.error(Error(`Error uploading file ${error.message}`));
    // }
  // };
=======
  fileUpload = async file => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      //NIKHIL !!! this is where you would put your code for uploading

      axios.post("/file/upload/enpoint").then(response => {
        console.log(response);
        console.log(response.status);
        this.setState({ statusCode: response.status }, () => {
          console.log(
            "This is the response status code --->",
            this.state.statusCode
          );
        });
      });
    } catch (error) {
      console.error(Error(`Error uploading file ${error.message}`));
    }
  };
>>>>>>> 9252aee44e8dce684fc338fa4b04ef3b91c3102c

  render() {
    const { statusCode } = this.state;
    const panes = [
      {
        menuItem: "Import ",
        render: () => (
          <Tab.Pane attached={false}>
            <Message>Some random message idk.</Message>
            <Form onSubmit={this.onFormSubmit}>
              <Form.Field>
                <label>File input & upload {this.state.progressPercentage} </label>
                <Button as="label" htmlFor="file" type="button" animated="fade">
                  <Button.Content visible>
                    <Icon name="file" />
                  </Button.Content>
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
                <Button style={{ marginTop: "20px" }} type="submit">
                  Upload
                </Button>
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
        <Divider horizontal>FILE UPLOAD COMPONENT</Divider>
        <Tab menu={{ pointing: true }} panes={panes} />
      </Segment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Upload />, rootElement);
