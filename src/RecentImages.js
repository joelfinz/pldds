import React from "react";
import { Row} from "react-bootstrap";
import Fade from "react-reveal/Fade";
import backendapi from "./backendapi";
import { Link} from "react-router-dom";
import { Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, Snackbar, IconButton, LinearProgress, CircularProgress } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';

class RecentImages extends React.Component {
  state = {
    image_array: [],
    image_url: null,
    selected_img:null,
    selected_img_filename: null,
    openView: false,
    showConfirm: false,
    succ: false,
    pageloadErr: false,
    pageloaded:false,
  };
  componentDidMount() {
    backendapi.get("/uploadedfiles")
      .then(res => {
      this.setState({
        image_array: res.data.uploads,
        image_url: res.config.baseURL + "/getimg/",
      });
    })
    backendapi.get('/')
      .then(res => this.setState({ pageloaded: true }))
    .catch(err=> this.setState({ pageloadErr: true }))

  }

  confirmDelete() {
    console.log("delete action!");
    backendapi
      .delete("/deletefile/" + this.state.selected_img)
      .then(res => {
        console.log(res.data.message);
        this.setState({ showConfirm: false, succ: true, openView:false });
        this.refreshImagelist()
      })
      .catch(err => console.log(err));
  }
  refreshImagelist() {
    backendapi.get("/uploadedfiles").then(res => {
      this.setState({
        image_array: res.data.uploads,
        image_url: res.config.baseURL + "/getimg/",
        
      });
    })
  }

  render() {
      
    const ViewImage = () => {
      return (
        <Dialog
          open={this.state.openView}
          onClose={()=>this.setState({openView:false})}
        >
          <DialogTitle>View Image
          <IconButton style={{float:'right'}} size='small' onClick={()=>this.setState({openView:false})}>
          <CloseIcon />
        </IconButton>
          </DialogTitle>
          <DialogContent>
            <img
              src={this.state.image_url + this.state.selected_img}
              alt={this.state.selected_img}
              style={{
                width:'100%',
              }}
            />
          </DialogContent>
          <DialogActions>
            <Link
              to={{
                pathname: "/result",
                state: { filename: this.state.selected_img }
              }}
              >
            
            <Button>Test Image</Button>
            </Link>
            <Button onClick={() => this.setState({ showConfirm: true })}>Delete Image</Button>
          </DialogActions>
        </Dialog>
      )
    }

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
              <Button onClick={()=>this.setState({ showConfirm: false })}>No</Button>
              <Button color='secondary' onClick={()=>this.confirmDelete()} autoFocus>Yes</Button>
            </DialogActions>
          </DialogContent>
      </Dialog>
        )
}

    const images = this.state.image_array.map(img => {
      return (
          <Fade up cascade>
                          <img
              variant="top"
              src={this.state.image_url + img}
            style=
            {{
              display:"flex",
              maxWidth: '100px',
              margin: "4px",
            }}
              alt={img}
              onClick={() => {
                this.setState({
                  openView: true,
                selected_img:img
                })
              }}
                />
          </Fade>
      );
    });

    const Deletesnack = () => {
      
      return <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
        }}
        open={this.state.succ}
        autoHideDuration={3000}
        onClose={() => { this.setState({ succ: false }) }}
        message="Image Deleted Successfully."
    />
    }
    const PageLoader = () => {
      if (this.state.pageloaded === false && this.state.pageloadErr === false)
        return (
          <div>
            <br/>
            <center>
              <CircularProgress color="secondary" />
            </center>
          </div>
        )
      if (this.state.pageloaded === false && this.state.pageloadErr === true)
        return (
          <div><br />
            <Alert severity="error">Unable to connect to Server. Check your internet connection and try again.</Alert>
          </div>
        )
      else
        return (
          <div>
                <Row
                style={{
                  display: "flex",
                  maxHeight: "70vh",
                  overflow: "auto",
                  alignContent: "flex-start",
                  justifyContent:"center"
                }}
              >
                {images}
                </Row>
          </div>
        )
    }
    return (
      <div>
        <Fade cascade>
          <Card raised={true}>
            <CardContent>
            <Typography variant="h6">Recently uploaded images</Typography>
            <PageLoader/>
              
            </CardContent>
          </Card>
        </Fade>
        <ViewImage />
        <Deletedialog />
        <Deletesnack/>
      </div>
    );
  }
}

export default RecentImages;
