import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Tooltip,
  Button,
} from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import Fade from "react-reveal/Fade";

const About = () => {
  return (
    <div>
      <Fade cascade>
      <Card raised={true} style={{maxWidth:"500px",margin:"auto"}}>
        <CardContent>
          <Row>
              <Col>
                <Row style={{alignItems:"center"}}>
                  <Col>
              <Typography variant="h2">Team</Typography>
                  </Col>
                  <Col>
                    <Button size="large" style={{float:"right"}}>
                    <i className="fab fa-github"/>&nbsp;Source
                    </Button>
                  </Col>
                </Row>
              <br />
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      style={{ width: "100px", height: "100px", marginRight:"12px" }}
                      src="./images/devs/mahesh.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h5">Mahesh Chandran G.</Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography variant="subtitle2">
                          Deep Learning Practitioner
                        </Typography>
                        <Tooltip title="Github: @mahesh147">
                        <IconButton onClick={()=>window.open("https://github.com/mahesh147")}>
                        <i className="fab fa-github"></i>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Linkedin: /in/mahesh-chandran-010865157">
                        <IconButton onClick={()=>window.open("https://www.linkedin.com/in/mahesh-chandran-010865157/  ")}>
                        <i className="fab fa-linkedin-in"></i>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Telegram: @mahesh98">
                        <IconButton onClick={()=>window.open("https://t.me/mahesh98")}>
                        <i className="fab fa-telegram"></i>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Email: maheshchandran147@gmail.com">
                        <IconButton onClick={()=>window.open("mailto:maheshchandran147@gmail.com")}>
                        <i className="fas fa-envelope"></i>
                        </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  ></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                    style={{ width: "100px", height: "100px", marginRight:"12px" }}
                    src="./images/devs/aldrin.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h5">Aldrin Geo Alfred</Typography>
                    }
                    secondary={
                      <React.Fragment>
                      <Typography variant="subtitle2">
                          Deep Learning Practitioner
                      </Typography>
                        <Tooltip title="Github: @aldrinalfred">
                      <IconButton  onClick={()=>window.open("https://github.com/aldrinalfred")}>
                        <i className="fab fa-github"></i>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Linkedin: /in/aldrin-alfred-5b840a162">
                        <IconButton onClick={()=>window.open("https://www.linkedin.com/in/aldrin-alfred-5b840a162/")}>
                        <i className="fab fa-linkedin-in"></i>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Telegram: @aldrin_alfred">
                        <IconButton onClick={()=>window.open("https://t.me/aldrin_alfred")}>
                        <i className="fab fa-telegram"></i>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Email: aldrinalfred72@gmail.com">
                        <IconButton onClick={()=>window.open("mailto:aldrinalfred72@gmail.com")}>
                        <i className="fas fa-envelope"></i>
                        </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  ></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                    style={{ width: "100px", height: "100px", marginRight:"12px" }}
                    src="./images/devs/joel.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="h5">Joel Fintan</Typography>}
                    secondary={
                      <React.Fragment>
                      <Typography variant="subtitle2">
                          Full Stack Developer
                      </Typography>
                        <Tooltip title="Github: @joelfinz">
                      <IconButton onClick={()=>window.open("https://github.com/joelfinz")}>
                        <i className="fab fa-github"></i>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Linkedin: /in/joelfintan">
                        <IconButton onClick={()=>window.open("https://www.linkedin.com/in/joelfintan/")}>
                        <i className="fab fa-linkedin-in"></i>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Telegram: @finspeed">
                        <IconButton onClick={()=>window.open("https://t.me/finspeed")}>
                        <i className="fab fa-telegram"></i>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Email: joelfintan@gmail.com">
                        <IconButton onClick={()=>window.open("mailto:joelfintan@gmail.com")}>
                        <i className="fas fa-envelope"></i>
                        </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  ></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                    style={{ width: "100px", height: "100px", marginRight:"12px" }}
                    src="./images/devs/anay.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h5">Anay G. Varghese</Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography variant="subtitle2">Domain Expert</Typography>
                        <Tooltip title="Linkedin: /in/anay-varghese-451852153">
                        <IconButton onClick={()=>window.open("https://www.linkedin.com/in/anay-varghese-451852153/")}>
                        <i className="fab fa-linkedin-in"></i>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Email: flyhigh.av14@gmail.com">
                        <IconButton onClick={()=>window.open("mailto:flyhigh.av14@gmail.com")}>
                        <i className="fas fa-envelope"></i>
                        </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    }
                  ></ListItemText>
                </ListItem>
            <br/>
              </List>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* TODO */}
            </Col>
          </Row>
        </CardContent>
        </Card>
        </Fade>
    </div>
  );
};
export default About;
