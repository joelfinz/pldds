import React from "react";
import { Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import backendapi from "./backendapi";
import { Redirect, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

class ViewImage extends React.Component {
  state = {
    imgurl: null,
    imgfname: null,
    showConfirm: false,
    succ: false,
    deleteSuccess: false,
  };

  componentDidMount() {
    const { imgurl, imgfname } = this.props.location.state;
    this.setState(() => ({ imgurl, imgfname }));
  }

  confirmDelete() {
    console.log("delete action!");
    backendapi
      .delete("/deletefile/" + this.state.imgfname)
      .then((res) => {
        console.log(res.data.message);
        this.setState({ showConfirm: false, succ: true });
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (this.state.succ === true)
      return (
        <Redirect
          to={{
            pathname: "/newimage",
          }}
        />
      );

    const Deletedialog = () => {
      return (
        <Dialog
          open={this.state.showConfirm}
          onClose={() => this.setState({ showConfirm: false })}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to delete this image? <br />
              This image cannot be restored if you perform this action.
            </DialogContentText>
            <DialogActions>
              <Button onClick={() => this.setState({ showConfirm: false })}>
                No
              </Button>
              <Button
                color="secondary"
                onClick={() => this.confirmDelete()}
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      );
    };

    return (
      <div>
        <Fade>
          <Card>
            <CardContent>
              <h3>View Image</h3>
              <Zoom duration={500}>
                <img
                  alt="img"
                  src={this.state.imgurl}
                  style={{ maxWidth: "300px" }}
                />
                <h5>Filename: {this.state.imgfname}</h5>
              </Zoom>
              <Zoom cascade duration={500} delay={100}>
                <Row style={{ margin: "auto" }}>
                  <Col>
                    <Link
                      to={{
                        pathname: "/result",
                        state: { filename: this.state.imgfname },
                      }}
                    >
                      <Button style={{ float: "left" }}>Test image</Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button
                      style={{ float: "right" }}
                      onClick={() => this.setState({ showConfirm: true })}
                    >
                      Delete file
                    </Button>
                  </Col>
                </Row>
              </Zoom>
            </CardContent>
          </Card>
        </Fade>
        <Deletedialog />
      </div>
    );
  }
}
export default ViewImage;
