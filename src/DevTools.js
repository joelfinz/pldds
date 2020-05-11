import React from "react";
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  Select,
  FormHelperText,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import backendapi from "./backendapi";
import { Row, Col } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import { Spring } from "react-spring/renderprops";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

class DevTools extends React.Component {
  state = {
    model_list: [],
    selected_model: null,
    selected_model_name: null,
    selected_model_fullname: null,
    selected_model_obj: {},
    selected_modelprops: {},
    selected_model_rank: null,
    darkMode: false,
    pageloadErr: false,
    pageloaded:false
  };

  componentWillMount() {
    if (window.localStorage.getItem("model_name") != null)
      var modelname = window.localStorage.getItem("model_name");
    var modelfname = window.localStorage.getItem("model_fname");
    var modelfullname = window.localStorage.getItem("model_fullname");
    this.setState({
      selected_model: modelfname,
      selected_model_name: modelname,
      selected_model_fullname: modelfullname,
    });
    backendapi
      .get("/listmodels")
      .then((res) => {
        this.setState({
          model_list: res.data.models,
        });
        if (this.state.selected_model === null) {
          window.localStorage.setItem(
            "model_name",
            res.data.models[0].model_name
          );
          window.localStorage.setItem(
            "model_fname",
            res.data.models[0].model_filename
          );
          window.localStorage.setItem(
            "model_fullname",
            res.data.models[0].model_fullname
          );
          this.setState({
            selected_model: window.localStorage.getItem("model_fname"),
            selected_model_name: window.localStorage.getItem("model_name"),
            selected_model_fullname: window.localStorage.getItem(
              "model_fullname"
            ),
          });
        }
      })
      .catch((err) => console.log(err));

    if (window.localStorage.getItem("theme") === "dark")
      this.setState({ darkMode: true });
    if (window.localStorage.getItem("theme") === "light")
      this.setState({ darkMode: false });
  }

  componentDidUpdate() {
    window.localStorage.setItem("model_name", this.state.selected_model_name);
    window.localStorage.setItem("model_fname", this.state.selected_model);
    window.localStorage.setItem(
      "model_fullname",
      this.state.selected_model_fullname
    );
  }

  componentDidMount() {
    setTimeout(() => this.onModelChange(this.state.selected_model_name), 300);
    backendapi.get('/')
      .then(res => this.setState({ pageloaded: true }))
    .catch(err=>this.setState({pageloadErr:true}))
  }

  onModelChange(modelname) {
    backendapi
      .get("/model_details/" + modelname)
      .then((res) => {
        this.setState({
          selected_model_fullname: res.data.model_fullname,
          selected_model: res.data.model_filename,
          selected_modelprops: res.data.model_props,
          selected_model_rank: res.data.rank,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const PageLoader = () => {
      if (this.state.pageloaded === false && this.state.pageloadErr === false)
        return (
          <div>
            <br />
            <center><CircularProgress color="secondary"/></center>
        </div>
        )
      if (this.state.pageloaded === false && this.state.pageloadErr === true)
        return (
          <div>
            <br />
            <Alert severity="error">Unable to connect to Server. Check your internet connection and try again.</Alert>
          </div>
        )
      else return (
        <div>
<Typography variant="h5">Current Classification Model</Typography>
              <Row>
                <Col>
                  <Typography
                    variant="h2"
                    onClick={() =>
                      this.onModelChange(this.state.selected_model_name)
                    }
                  >
                    <Spring
                      from={{ conv: 0, nodes: 0, dense: 0 }}
                      to={{
                        conv: this.state.selected_modelprops.conv,
                        nodes: this.state.selected_modelprops.nodes,
                        dense: this.state.selected_modelprops.dense,
                      }}
                    >
                      {(props) => (
                        <div>
                          {props.conv.toFixed(0)}C{props.nodes.toFixed(0)}N
                          {props.dense.toFixed(0)}D
                        </div>
                      )}
                    </Spring>
                  </Typography>

                  <Spring
                    from={{ conv: 0 }}
                    to={{
                      conv: this.state.selected_modelprops.conv,
                      nodes: this.state.selected_modelprops.nodes,
                      dense: this.state.selected_modelprops.dense,
                    }}
                  >
                    {(props) => (
                      <div>
                        <Typography variant="h5">
                          {props.conv.toFixed(0)} Convolution layers
                        </Typography>
                        <Typography variant="h5">
                          {props.nodes.toFixed(0)} Nodes per layer
                        </Typography>
                        <Typography variant="h5">
                          {props.dense.toFixed(0)} Dense layer(s)
                        </Typography>
                      </div>
                    )}
                  </Spring>

                  <Typography variant="h6">
                    <ModelQuality rank={this.state.selected_model_rank} />
                  </Typography>
                  <br />
                  <Link
                    to={{
                      pathname: "/modelprofile",
                      state: {
                        model_name: this.state.selected_model_name,
                        model_fullname: this.state.selected_model_fullname,
                      },
                    }}
                  >
                    <Button variant="contained">View Model Profile</Button>
                  </Link>
                  <br />
                  <br />
                  <Typography variant="h5">
                    Change Classification Model
                  </Typography>
                  <div>
                    <SelectModelList />
                  </div>
                </Col>
                {/* QUICK UPDATE */}
                {/* <Col sm>
                  <Typography variant="h5">Available Models</Typography>
                  <br />
                  {ProfileModelList}
                </Col> */}
              </Row>
        </div>
      )
  }
    const ProfileModelList = this.state.model_list.map((model) => {
      return (
        <div>
          <List dense={true}>
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to={{
                pathname: "/modelprofile",
                state: {
                  model_name: model.model_name,
                  model_fullname: model.model_fullname,
                },
              }}
            >
              <ListItem
                button
                selected={this.state.selected_model_name === model.model_name}
              >
                <ListItemText>
                  {model.model_name} [{model.model_fullname}]
                </ListItemText>
              </ListItem>
            </Link>
          </List>
        </div>
      );
    });

    const models = this.state.model_list.map((mdl) => {
      return (
        <MenuItem
          key={mdl.rank}
          name={mdl.model_filename}
          value={mdl.model_name}
        >
          <Typography variant="subtitle1">{mdl.model_name}</Typography>
        </MenuItem>
      );
    });
    const ModelQuality = (props) => {
      if (props.rank === 1) return "Best Model 💯";
      else if (props.rank > 1 && props.rank < 8) return "Good Model 👍🏻";
      else return "Poor Model 😕";
    };

    const SelectModelList = () => {
      if (this.state.model_list != null)
        return (
          <div>
            <FormControl>
              <Select
                value={this.state.selected_model_name}
                // native={true}
                onChange={(event) => {
                  this.onModelChange(event.target.value);
                  this.setState({
                    selected_model_name: event.target.value,
                  });
                }}
              >
                {models}
              </Select>
              <FormHelperText>Select Model</FormHelperText>
            </FormControl>
          </div>
        );
    };
    return (
      <div>
        <Fade>
          <Card raised={true} style={{maxWidth:"500px",margin:"auto"}}>
            <CardContent>
              <Typography variant="h6">Developer Tools</Typography>
              <PageLoader/>
              <br />
              <Row>
                <Col>
                  <FormControlLabel
                    label="Dark mode"
                    labelPlacement="start"
                    control={
                      <Switch
                        checked={this.state.darkMode}
                        onChange={() => {
                          if (this.state.darkMode === true)
                            window.localStorage.setItem("theme", "light");
                          if (this.state.darkMode === false)
                            window.localStorage.setItem("theme", "dark");
                          window.location.reload();
                        }}
                        color="secondary"
                      />
                    }
                  />
                </Col>
              </Row>
            </CardContent>
          </Card>
        </Fade>
      </div>
    );
  }
}

export default DevTools;
