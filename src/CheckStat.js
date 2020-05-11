import React from "react";
import { LinearProgress, Typography } from "@material-ui/core";
import backendapi from "./backendapi";

class CheckStat extends React.Component {
  state = {
    backendStatus: false,
    tensorflowStatus: false,
    backendError: false,
  };
  componentDidMount() {
    backendapi.get("/")
      .then((res) => {
      console.log(res.data.message);
      this.setState({
        backendStatus: true,
      });
      })
      .catch(err => this.setState({ backendError: true }))
  }


  render() {
    if (this.state.backendStatus === true) return <div></div>;
    if (this.state.backendStatus === false && this.state.backendError === false)
      return (
        <div>
          <LinearProgress />
        </div>
      );
    if (this.state.backendError === true )
      return (
        <div>
          <Typography color="error" align="center" variant="caption">
            Unable to connect to server. <a onClick={()=>window.location.reload()}>♻</a>
          </Typography>
        </div>
      );
  }
}

export default CheckStat;
