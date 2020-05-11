import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import Container from '@material-ui/core/Container';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import NavBar from "./NavBar";
import { Route, BrowserRouter } from "react-router-dom";
import NewImage from "./NewImage";
import Home from "./Home";
import ImageResult from "./ImageResult";
import { TransitionGroup } from "react-transition-group";
import ViewImage from "./ViewImage";
import * as serviceWorker from "./serviceWorker";
import DevTools from "./DevTools";
import ModelProfile from "./ModelProfile";
import { createMuiTheme, ThemeProvider, CssBaseline, Divider } from "@material-ui/core";
import Footer from "./Footer";
import About from "./About";
import Error404 from "./Error404";

const darkmode = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default:"#1a1a1a",
      paper:"#0d0d0d"
    }
  }
});

const lightmode = createMuiTheme({
  palette: {
    type:"light"
  }
})

var theme = window.localStorage.getItem('theme')
var setTheme = lightmode
if (theme === null)
  window.localStorage.setItem('theme', 'light')
if (theme === 'dark')
  setTheme = darkmode
if (theme === 'light')
  setTheme = lightmode
  


const App = () => {
  return (
    <div>
      <BrowserRouter basename="/pldds">
              <ThemeProvider theme={setTheme} >
            <CssBaseline>
        <NavBar style={{ marginTop: "1px" }} />
          <Container style={{ marginTop: "80px" }}>
              <TransitionGroup>
            <Route path="*" conmponent={Error404}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/modelprofile" component={ModelProfile}></Route>
            <Route exact path="/devtools" component={DevTools}></Route>
            <Route exact path="/newimage" component={NewImage}></Route>
            <Route exact path="/viewImage" component={ViewImage}></Route>
            <Route exact path="/result" component={ImageResult}></Route>
              <Route exact path="/" component={Home}></Route>
              </TransitionGroup>
              <br/>
                <Divider/>
            </Container>
            <Footer/>
          </CssBaseline>
              </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
