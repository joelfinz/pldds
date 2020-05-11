[![React JS](https://img.shields.io/static/v1?label=React&message=16.13.0&color=61DBFB&style=for-the-badge&logo=React)](https://reactjs.org/) [![Material UI](https://img.shields.io/static/v1?label=Material%20UI&message=4.9.5&color=0081CA&style=for-the-badge&logo=material-ui)](https://material-ui.com/) [![Bootstrap](https://img.shields.io/static/v1?label=React-Bootstrap&message=1.0.1&color=61dafb&style=for-the-badge&logo=bootstrap)](https://react-bootstrap.github.io/)

# Paddy Leaf Disease Detection System

Paddy Leaf Disease Detection System (PLDDS) is web application made to help farmers identify leaf diseases in their paddy crop.

[![ForTheBadge made-with-javascript](http://ForTheBadge.com/images/badges/check-it-out.svg)](https://joelfinz.github.io/pldds)

The master branch has code for React app and the backend branch has code for flask web server.

# React App <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" style="width:75px" />

[TOC]



### Installation

Make sure you have [node](https://nodejs.org/en/) v12.x and [npm](https://www.npmjs.com/) installed.

If you have yarn installed, install the dependencies using it:

```bash
yarn install
```

or with npm:

```bash
npm install
```



### Usage

```bash
yarn start
```

or with npm:

```bash
npm start
```



#### Establishing connection with the backend server

Initially the app is connected to a backend flask server hosted on [heroku](https://www.heroku.com
).

If you want to wire the backend to the local flask server setup by yourself from the backend code, you may modify the `localhost` value in `host` object to the ip address of the backend flask server.

Check the backend branch in this repo for more information on how to set up flask server.

**./src/backendapi.js**

```javascript
import Axios from 'axios'
const host = {
    heroku: "//pldds-beta.herokuapp.com",
    localhost: "//Your local pldds backend flask server's IP Address or 127.0.0.1:5000(localhost)"
}
export default Axios.create({
    baseURL:host.heroku //change this to localhost
})
```



### Creating production build

To create a production build of this React app, you may run:

```bash
yarn build
```

or with npm:

```bash
npm build
```

You will find the build folder generated in the project directory.



#### Serving the production build

To serve the production build of the app locally, 

Install serve from npm:

```bash
yarn global add serve
```

or

```bash
npm -g i serve
```

and run:

```bash
serve ./build
```



## Project Status

This project is no longer maintained.

If you :thumbsup: this project, feel free to give it a :star:

## Authors

<img src="https://avatars2.githubusercontent.com/u/17685134?s=100&amp;v=4" alt="Joel Fintan" style="zoom: 33%;border-radius:50%" /> **[Joel Fintan](https://github.com/joelfinz)**

<img src="https://avatars1.githubusercontent.com/u/35261932?s=100&amp;v=4" alt="Mahesh Chandran" style="zoom:33%;border-radius:50%" /> **[Mahesh Chandran G](https://github.com/mahesh147)**

<img src="https://avatars1.githubusercontent.com/u/25857829?s=100&amp;v=4" alt="Aldrin Alfred" style="zoom:33%;border-radius:50%" /> **[Aldrin Geo Alfred](https://github.com/aldrinalfred)**



------

![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg) ![ForTheBadge contains-technicaldebt](http://ForTheBadge.com/images/badges/contains-technical-debt.svg) ![ForTheBadge made-with-javascript](http://ForTheBadge.com/images/badges/made-with-javascript.svg)

