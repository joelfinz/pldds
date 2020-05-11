import React from "react";
import { ProgressBar, Spinner, Row, Col } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import backendapi from "./backendapi";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  IconButton,
  Icon,
  Tooltip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Spring } from "react-spring/renderprops";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class ImageResult extends React.Component {
  state = {
    file: null,
    fileObj: null,
    filename: null,
    fileURL: null,
    cat: null,
    blight_level: null,
    blast_level: null,
    brownspot_level: null,
    selected_model: null,
    modelError:false
  };
  componentWillMount() {
    const { file, filename, selected_model } = this.props.location.state;
    this.setState(() => ({ file, filename, selected_model }));
    backendapi
      .get("/getimg/" + filename)
      .then((res) => {
        this.setState({ fileURL: res.config.baseURL + res.config.url });
        console.log("imgPATH=" + res.config.url);
      })
      .catch((err) => console.log(err));

    if (window.localStorage.getItem("model_fname") != null)
      this.setState({
        selected_model: window.localStorage.getItem("model_fname"),
      });
  }
  componentDidMount() {
    if (this.state.selected_model) {
      backendapi
        .post("/testmodel/" + this.state.filename, {
          model: this.state.selected_model,
        }) //test model
        .then((res) => {
          this.setState({
            cat: res.data.category,
            blight_level: res.data.Percentage.bacterial_blight,
            blast_level: res.data.Percentage.leaf_blast,
            brownspot_level: res.data.Percentage.brownspot,
          });
        })
        .catch((err) => {
          console.log(err)
          this.setState({modelError:true})
        });
    } else {
      backendapi
        .post("/testmodel/" + this.state.filename) //test model
        .then((res) => {
          this.setState({
            cat: res.data.category,
            blight_level: res.data.Percentage.bacterial_blight,
            blast_level: res.data.Percentage.leaf_blast,
            brownspot_level: res.data.Percentage.brownspot,
          });
        })
        .catch((err) => {
          console.log(err)
          this.setState({modelError:true})
        });
    }
  }
  checkLevel = (value) => {
    var level;
    if (value >= 75) level = "success";
    else if (value >= 50) level = "info";
    else if (value >= 15) level = "warning";
    else level = "danger";
    return level;
  };
  render() {
    const PredictData = () => {
      if (this.state.cat != null)
        return (
          <div>
            <Spring
              from={{
                brownspot_level: 0,
                blast_level: 0,
                blight_level: 0,
              }}
              to={{
                brownspot_level: this.state.brownspot_level,
                blast_level: this.state.blast_level,
                blight_level: this.state.blight_level,
              }}
              config={{ tension: 200, precision: 1 }}
            >
              {(props) => (
                <div>
                  <Fade cascade>
                    <Typography variant="h4">Predicted Disease:</Typography>
                    <Typography variant="h3">{this.state.cat}</Typography>
                    <Typography variant="h5">Accuracy:</Typography>
                    <Typography variant="h6">
                      Brown Spot{`: ${props.brownspot_level.toFixed(3)} %`}
                    </Typography>
                    <ProgressBar
                      variant={this.checkLevel(props.brownspot_level)}
                      now={props.brownspot_level}
                    />
                    <Typography variant="h6">
                      Leaf Blast{`: ${props.blast_level.toFixed(3)} %`}
                    </Typography>
                    <ProgressBar
                      variant={this.checkLevel(props.blast_level)}
                      now={props.blast_level}
                    />
                    <Typography variant="h6">
                      Bacterial Blight{`: ${props.blight_level.toFixed(3)} %`}
                    </Typography>
                    <ProgressBar
                      variant={this.checkLevel(props.blight_level)}
                      now={props.blight_level}
                    />
                  </Fade>
                </div>
              )}
            </Spring>
          </div>
        );
      if (this.state.cat === null && this.state.modelError === true)
        return (
          <div>
            <center>
              ❗ Tensorflow Error.<br />
              This is probably due to concurrent operation. 👩🏻‍💻<br />
              or Network error 🌍
            </center>
          </div>
        )
      else {
        return (
          <div>
            <center>
              <Spinner animation="grow" />
              <br />
              Testing image...
            </center>
          </div>
        );
      }
    };

    const RemedyView = () => {
      if (this.state.cat === "Brown Spot")
        return (
          <div>
            <h5>Remedies - Brown Spot</h5>
            <p>
              Spray any one of the following: <br />
              <ul>
                <li>Metominostrobin @ 500ml/ha </li>
              </ul>
            </p>
          </div>
        );
      if (this.state.cat === "Bacterial Blight")
        return (
          <div>
            <h5>Remedies - Bacterial Leaf Blight</h5>
            <p>
              Biological Method
              <br />
              <ul>
                <li>
                  Spray fresh cowdung extract 20% twice (starting from initial
                  appearance of the disease and another at fortnightly interval){" "}
                </li>
                <li>
                  Neem oil 60 EC 3% (or) NSKE 5% is recommended for the control
                  of sheath rot, sheath blight, grain discolouration and
                  bacterial blight{" "}
                </li>
              </ul>
            </p>
          </div>
        );
      if (this.state.cat === "Leaf Blast")
        return (
          <div>
            <h5>Remedies - Leaf Blast</h5>
            <p>
              Cultural Method
              <br />
              <ul>
                <li>Remove collateral weed hosts from bunds and channels </li>
                <li>Use only disease free seedlings </li>
                <li>Avoid excess nitrogen</li>
                <li>
                  Apply N in three split doses (50% basal, 25% in tillering
                  phase and 25% N in panicle initiation stage){" "}
                </li>
                <li>Use resistant variety CO 47. </li>
              </ul>
              Chemical Method
              <br />
              <ul>
                <li>
                  Spray after observing initial infection of the disease,{" "}
                </li>
                <li>Carbendazim 50WP @ 500g/ha (or) </li>
                <li>Tricyclozole 75 WP @ 500g/ha (or) </li>
                <li>Metominostrobin 20 SC @ 500ml/ha (or) 47 </li>
                <li>Azoxystrobin 25 SC @ 500 ml/ha </li>
              </ul>
              Biological Method
              <br />
              <ul>
                <li>
                  Seed Treatment with TNAU Pf 1liquid formulation @ 10 ml/kg of
                  seeds{" "}
                </li>
                <li>
                  Seedling root dipping with TNAU Pf 1liquid formulation (500 ml
                  for one hectare seedlings){" "}
                </li>
                <li>
                  Soil application with TNAU Pf 1liquid formulation (500ml/ha){" "}
                </li>
                <li>Foliar spray with TNAU Pf 1liquid formulation @ 5ml/lit</li>
              </ul>
            </p>
          </div>
        );
      if (this.state.cat === null && this.state.modelError === true)
        return (
          <div>
            <center>Try again 🤷‍♂️</center>
          </div>
        )
      else
        return (
          <div>
            <LinearProgress color="secondary" />
          </div>
        );
    };

    return (
      <div>
        <Fade>
          <Card raised={true}>
            <CardContent>
              <Link to="/newimage">
                <Tooltip title="Go back">
              <IconButton>
                <ArrowBackIcon />
                </IconButton>
                </Tooltip>
                </Link>
              <Typography variant="h4">
              Result
              </Typography>
              <p>
                <i>Backend & Model is still under development.</i>
              </p>
              <Row>
                <Col>
                  <img
                    src={this.state.fileURL}
                    style={{ imageResolution: "auto", maxWidth: "200px" }}
                    alt={this.state.filename}
                  />
                  <br />
                  <br />
                </Col>
                <Col sm>
                  <PredictData />
                </Col>
              </Row>
              <hr />
              <RemedyView />
            </CardContent>
          </Card>
        </Fade>
      </div>
    );
  }
}

export default ImageResult;
