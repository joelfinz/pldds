import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import backendapi from "./backendapi";
import { Redirect } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import RecentImages from "./RecentImages";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { Card, CardContent, Typography } from "@material-ui/core";
class NewImage extends React.Component {
  state = {
    file: null,
    fileObj: null,
    filename: null,
    formSuccess: false,
    deleteSuccess: false
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  onFileUpload(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      fileObj: event.target.files[0]
    });
  }

  uploadFile(event) {
    event.preventDefault();
    var formData = new FormData();
    formData.append("file", this.state.fileObj);
    backendapi({
      method: "post",
      url: "/upload",
      data: formData,
      headers: {
        "Content-type": "multipart/form-data"
      }
    })
      .then(res => {
        this.setState({
          filename: res.data.filename,
          formSuccess: true
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    if (this.state.formSuccess === true) {
      return (
        <Redirect
          to={{
            pathname: "/result",
            state: {
              file: this.state.file,
              fileObj: this.state.fileObj,
              filename: this.state.filename,
            }
          }}
        />
      );
    }
    return (
      <div>
        <Fade cascade>
          <Row>
            <Col>
            <Card raised={true}>
                <CardContent>
                  
                  <Typography variant="h6">
                    Upload Image
              </Typography>
            <img
              src={this.state.file}
              style={{ imageResolution: "auto", maxWidth: "200px" }}
            />
            <Form onSubmit={event => this.uploadFile(event)} id="fileupload">
              <input
                className="file-upload btn"
                id="file"
                type="file"
                accept="image/*;capture=camera"
                name="file"
                required="required"
                onChange={event => this.onFileUpload(event)}
                />
              <label htmlFor="file">
                <span>Select Image</span>
              </label>

              <br />
              <br />
              <Zoom>
                <Button
                  type="submit"
                  style={{ display: "flex", width: "100%", margin: "none" }}
                  >
                  <CloudUploadIcon />
                  &nbsp;Upload & Test
                </Button>
              </Zoom>
            </Form>
                  </CardContent>
          </Card>
            <br/>

            </Col>
            <Col sm>
            <RecentImages />
            </Col>
          </Row>
              

          
          
        </Fade>
        
      </div>
    );
  }
}

export default NewImage;
