[![Flask](https://img.shields.io/static/v1?label=Flask&message=1.1.1&color=000000&style=for-the-badge&logo=Flask)](https://flask.palletsprojects.com/en/1.1.x/) [![Python](https://img.shields.io/static/v1?label=Python&message=3.7&color=blue&style=for-the-badge&logo=python)](https://www.python.org/) [![Tensorflow](https://img.shields.io/static/v1?label=Tensorflow&message=2.0.0a0&color=ff7500&style=for-the-badge&logo=tensorflow)](https://www.tensorflow.org/) [![OpenCV-Python](https://img.shields.io/static/v1?label=OpenCV-Python&message=4.2.0.34&color=green&style=for-the-badge&logo=opencv)](https://react-bootstrap.github.io/)

# Paddy Leaf Disease Detection System

Paddy Leaf Disease Detection System (PLDDS) is web application made to help farmers identify leaf diseases in their paddy crop.

[![ForTheBadge made-with-javascript](http://ForTheBadge.com/images/badges/check-it-out.svg)](https://joelfinz.github.io/pldds)

The master branch has code for React app and the backend branch has code for flask app server.

# Flask App Server



[TOC]



### Installation

Make sure you have [Python](https://www.python.org/) 3.7x and [Pip3](https://pip.pypa.io/en/stable/) installed.

If you haven't got [virtualenv](https://virtualenv.pypa.io/en/stable/) installed, install it using:

```bash
pip3 install virtualenv
```

 Create a virtual environment:

```bash
virtualenv venv
```

Activate the virtual environment venv:

```bash
source ./venv/bin/activate
```

Once you have activated the virtual environment, install the dependencies from requirements.txt using:

```
pip install -r requirements.txt
```

Alternatively instead of using virtualenv, you can use [pipenv](https://pipenv-fork.readthedocs.io/en/latest/) to install from Pipfile. (You'll have to help yourself with that.)



### Usage

```bash
python app.py
```

Now that you have the flask server running, check out the master repo on how to setup pldds react app

### Testing endpoints

You can use API testing tools like Insomnia REST client or Postman to test these endpoints.

If you use Insomnia, i've included the insomnia_pldds.json file which you can import it in Insomnia and test endpoints.

| Method | Endpoint                      | Description                                                  |                   Body :arrow_up_small:                   | Response(JSON) :arrow_down_small:                            |
| :----: | :---------------------------- | ------------------------------------------------------------ | :-------------------------------------------------------: | ------------------------------------------------------------ |
| [GET]  | `/`                           | Check if server is online                                    |                             -                             | `{"message":"Server online"}`                                |
| [POST] | `/upload`                     | Upload image                                                 | (Multipart Form)<br />[file]<br/>[MIME type: images/jpeg] | `{"filename":"image_file.jpg",`<br/>`"message":"file uploaded successfully"}` |
| [POST] | `/testmodel/image_file.jpg`   | Test the given uploaded image file with the default model or specified in the optionally in JSON |        (JSON)<br/>`{"model":"model_filename.h5"}`         | `{"Percentage": {`<br/>`"bacterial_blight":#,`<br/>`"brownspot":#`,<br/>`"leaf_blast":#`<br/>`},`<br/>`"category":"disease type"}` |
| [GET]  | `/getimg/image_file.jpg`      | Returns image file                                           |                             -                             | Raw image data                                               |
| [GET]  | `/uploadedfiles`              | Returns list of uploaded image files                         |                             -                             | `{"uploads":[`<br/>`"file1.jpg",`<br />`"file2.jpg", ...`<br />`]}` |
| [GET]  | `/listmodels`                 | Returns the full list of trained classification models used including their model summary. |                             -                             | `{"model_list":[`<br />` ... ],`<br />`"models":[`<br />`... ]}` |
| [GET]  | `/model_details/<model_name>` | Returns the model details with model summary of the specified model in `<modelname>`.<br />Eg. `5C32N1D` |                             -                             | `{ ... }`                                                    |
| [GET]  | `/getepochacc/<foldername>`   | Returns Epoch Accuracy graph(svg) of a model/<br />`<foldername>` corresponds to the model name. <br/>Eg. `5-conv-32-nodes-1-dense` |                             -                             | Raw SVG data                                                 |
| [POST] | `/getepochloss/<foldername>`  | Returns Epoch Loss graph(svg) of a model/<br />`<foldername>` corresponds to the model name. <br/>Eg. `5-conv-32-nodes-1-dense` |                             -                             | Raw SVG data                                                 |

This project maintains a proper folder structure for the app to read process data from local files. Any modification on these files can break the app.

## Project Status

This project is no longer maintained.

If you :thumbsup: this project, feel free to give it a :star:



## Authors

<img src="https://avatars2.githubusercontent.com/u/17685134?s=100&amp;v=4" alt="Joel Fintan" style="zoom: 33%;border-radius:50%" /> **[Joel Fintan](https://github.com/joelfinz)**

<img src="https://avatars1.githubusercontent.com/u/35261932?s=100&amp;v=4" alt="Mahesh Chandran" style="zoom:33%;border-radius:50%" /> **[Mahesh Chandran G](https://github.com/mahesh147)**

<img src="https://avatars1.githubusercontent.com/u/25857829?s=100&amp;v=4" alt="Aldrin Alfred" style="zoom:33%;border-radius:50%" /> **[Aldrin Geo Alfred](https://github.com/aldrinalfred)**



------

![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg) ![ForTheBadge contains-technicaldebt](http://ForTheBadge.com/images/badges/contains-technical-debt.svg) ![ForTheBadge made-with-python](http://ForTheBadge.com/images/badges/made-with-python.svg)

