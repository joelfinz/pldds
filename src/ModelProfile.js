import React from "react";
import {
  Typography,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
} from "@material-ui/core";
import backendapi from "./backendapi";
import { Row, Col } from "react-bootstrap";
import InlineSVG from "svg-inline-react";
import Fade from "react-reveal/Fade";
import { Spring } from "react-spring/renderprops";

class ModelProfile extends React.Component {
  state = {
    model_name: null,
    model_fullname: null,
    model_obj: {
      model_props: {},
      model_profile: {
        model_table: [],
      },
    },
    epochAccsvg: null,
    epochLosssvg: null,
  };
  componentWillMount() {
    const { model_name, model_fullname } = this.props.location.state;
    this.setState(() => ({ model_name, model_fullname }));
    // this.setState({model_name:window.localStorage.getItem('model_name')})
    // this.setState({ model_fullname: window.localStorage.getItem('model_fullname') })
  }

  componentDidMount() {
    backendapi
      .get("/model_details/" + this.state.model_name)
      .then((res) => {
        this.setState({ model_obj: res.data });
      })
      .catch((err) => console.log(err));

    backendapi
      .get("/getepochacc/" + this.state.model_fullname)
      .then((res) => this.setState({ epochAccsvg: res.data }))
      .catch((err) => console.log(err));

    backendapi
      .get("/getepochloss/" + this.state.model_fullname)
      .then((res) => this.setState({ epochLosssvg: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const model_summary = this.state.model_obj.model_profile.model_table.map(
      (layer) => {
        return (
          <TableRow>
            <TableCell>
              {layer.layer_type}
              <br />
              <Chip size="small" label={layer.layer_cat} />
            </TableCell>
            {/* <TableCell>{layer.layer_cat}</TableCell> */}
            <TableCell>({layer.output_shape})</TableCell>
            <TableCell>{layer.param_num}</TableCell>
          </TableRow>
        );
      }
    );

    return (
      <div>
        <Fade>
          <Card raised={true}>
            <CardContent>
              <Typography variant="h6">Model Profile</Typography>
              <Row noGutters={true}>
                <Spring
                  from={{
                    conv: 0,
                    nodes: 0,
                    dense: 0,
                    acc: 0,
                    loss: 0,
                  }}
                  to={{
                    conv: this.state.model_obj.model_props.conv,
                    nodes: this.state.model_obj.model_props.nodes,
                    dense: this.state.model_obj.model_props.dense,
                    acc: this.state.model_obj.highest_validation_acc,
                    loss: this.state.model_obj.lowest_validation_loss,
                  }}
                >
                  {(props) => (
                    <>
                      <Col>
                        <Typography variant="h2">
                          {props.conv.toFixed(0)}C{props.nodes.toFixed(0)}N
                          {props.dense.toFixed(0)}D<br />
                        </Typography>
                        <Typography variant="h5">
                          {props.conv.toFixed(0)} Convolution layers
                          <br />
                          {props.nodes.toFixed(0)} Nodes per layer
                          <br />
                          {props.dense.toFixed(0)} Dense layer(s)
                          <br />
                        </Typography>
                      </Col>
                      <Col sm style={{ margin: "auto" }}>
                        Highest validation accuracy: {props.acc.toFixed(5)}
                        <br />
                        <div style={{ maxWidth: "400px" }}>
                          <InlineSVG src={this.state.epochAccsvg}></InlineSVG>
                        </div>
                        <br />
                        Lowest validation loss: {props.loss.toFixed(6)}
                        <br />
                        <div style={{ maxWidth: "400px" }}>
                          <InlineSVG src={this.state.epochLosssvg}></InlineSVG>
                        </div>
                        <br />
                      </Col>
                    </>
                  )}
                </Spring>
              </Row>
              <Typography variant="h6">Model Summary</Typography>
              <br />
              <Row>
                <Col sm>
                  <Typography variant="body1">
                    Model name:{" "}
                    {this.state.model_obj.model_profile.model_desc_name}
                    <br />
                  </Typography>
                  <br />
                  <TableContainer
                    component={Paper}
                    size="small"
                    style={{ maxHeight: "70vh", overflow: "auto" }}
                  >
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            Layer <Chip size="small" label="Type" />
                          </TableCell>
                          {/* <TableCell>Layer type</TableCell> */}
                          <TableCell>Output shape</TableCell>
                          <TableCell>Param#</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>{model_summary}</TableBody>
                    </Table>
                  </TableContainer>
                  <br />
                </Col>
                <Col>
                  <Typography variant="body1">
                    Total Parameters:{" "}
                    {this.state.model_obj.model_profile.total_params}
                  </Typography>
                  <Typography variant="body1">
                    Trainable Parameters:{" "}
                    {this.state.model_obj.model_profile.trainable_params}
                  </Typography>
                  <Typography variant="body1">
                    Non-trainable Parameters:{" "}
                    {this.state.model_obj.model_profile.non_trainable_params}
                  </Typography>
                </Col>
              </Row>
            </CardContent>
          </Card>
        </Fade>
      </div>
    );
  }
}

export default ModelProfile;
