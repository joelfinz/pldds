from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS, cross_origin
from pprint import pprint
import tensorflow as tf
import pandas as pd
import numpy as np
import cv2
from os import system, name 
import os
import glob
import json
import tabulate


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['UPLOAD_FOLDER'] = './uploads'
CORS(app)
# Check if the server is online
@app.route('/', methods=['GET'])
def index():
    clearScreen()
    return jsonify({'message': 'Server online'})

# Save uploaded image to folder
@app.route('/upload', methods=['POST'])
@cross_origin()
def upload():
    if (request.method == 'POST'):
        file = request.files['file']
        if (file):
            filename = file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
            return jsonify({'message': 'file uploaded successfully','filename':filename})

# List the uploaded files
@app.route('/uploadedfiles', methods=['GET'])
def listupload():
    files = glob.glob('./uploads/*.*')
    files.sort(key=os.path.getmtime, reverse=True)
    refined_list = []
    for file in files:
        refined_list.append(file[10:])
    # OUTPUT TO TERMINAL
    clearScreen()
    print("List of uploaded files")
    print("----------------------")
    pprint(refined_list)
    # OUTPUT TO JSON
    return jsonify({'uploads':refined_list})

@app.route('/getimg/<path:filename>', methods=['GET'])
def getimg(filename):
    files = os.listdir('./uploads')
    if(filename):
        for file in files:
            if (filename == file):
                return send_from_directory('./uploads/',filename=filename,mimetype='images/jpeg',as_attachment=False)

@app.route('/deletefile/<path:filename>', methods=['DELETE'])
def deletefile(filename):
    if (filename):
        os.remove('./uploads/' + filename)
        return jsonify({'message': 'file removed successfully'})
    else:
        return jsonify({'message':'No filename passed!'})

@app.route('/listmodels', methods=['GET'])
def listmodels():
    with open('./models.json') as f:
        data = json.load(f)
        # OUTPUT TO TERMINAL
        clearScreen()
        print("Model list")
        print("----------")
        df = pd.json_normalize(data["models"])
        print(tabulate.tabulate(df, headers='keys', tablefmt='psql'))
    # OUTPUT TO JSON
    return jsonify(data)

@app.route('/testmodel/<filename>', methods=['POST'])
def testmodel(filename):
    data = request.get_json()
    if(data):
        selected_model = data['model']
    else: # Set default model
        selected_model='5-conv-32-nodes-1-dense-1583918600.h5'
    files = os.listdir('./uploads')
    if (filename):
        model = tf.keras.models.load_model(f'.//models//' + selected_model)
        img_array = cv2.imread(f'.//uploads//'+str(filename))
        img_array = cv2.cvtColor(img_array, cv2.COLOR_BGR2RGB)

        new_array = cv2.resize(img_array, (250, 250))
        new_array = np.array(new_array).reshape(-1, 250, 250, 3)
        new_array = new_array / 255.0

        category = ['Brown Spot', 'Leaf Blast', 'Bacterial Blight']

        pred = model.predict_classes([new_array])
        cat = category[pred[0]]
        pred = model.predict([new_array])

        disease_data = {}
        disease_data['brownspot'] = round(float(pred[0][0]*100),3)
        disease_data['leaf_blast'] = round(float(pred[0][1]*100),3)
        disease_data['bacterial_blight'] = round(float(pred[0][2]*100),3)
        # OUTPUT IN TERMINAL
        clearScreen()
        print("Test Results")
        print("------------")
        print("Filename: "+str(filename))
        print("Model used: "+selected_model)
        print("Prediction: "+cat)
        print("Accuracy:")
        print(" Brown Spot: "+str(disease_data['brownspot']))
        print(" Leaf Blast: "+str(disease_data['leaf_blast']))
        print(" Bacterial Leaf Blight: "+str(disease_data['bacterial_blight']))
        # OUTPUT IN JSON
        return jsonify({'category': cat,'Percentage':disease_data})
    else:
        return jsonify({'message':'you did not pass filename'})

@app.route('/getepochacc/<path:foldername>', methods=['GET'])
def epocacc(foldername):
    # folders = os.listdir('./model_details/'+foldername)
    if (foldername):
        return send_from_directory('./model_details/' + foldername, 'epoch_accuracy.svg')
    else:
        return jsonify({'message':'error'})
        

@app.route('/getepochloss/<path:foldername>', methods=['GET'])
def epocloss(foldername):
    # folders = os.listdir('./model_details/'+foldername)
    if (foldername):
        return send_from_directory('./model_details/' + foldername, 'epoch_loss.svg')
    else:
        return jsonify({'message': 'error'})
        
@app.route('/model_details/<modelname>', methods=['GET'])
def modeldetails(modelname):
    with open('./models.json') as f:
        data = json.load(f)
    models = data['model_list']
    for model in models:
        setData = model.get(modelname)
        if(setData):
            # OUTPUT IN TERMINAL
            clearScreen()
            print("Model Details")
            print("--------------")
            print("Model Name: "+ setData['model_name'])
            print("Model Full Name: "+ setData['model_fullname'])
            print("Model Filename: "+ setData['model_filename'])
            print("Highest validation accuracy: "+ str(setData['highest_validation_acc']))
            print("Lowest validation loss: "+ str(setData['lowest_validation_loss']))
            print(" ")
            print("Model Summary")
            print("--------------")
            print("Model description: "+setData['model_profile']['model_desc_name'])
            print("No. of non trainable params: "+setData['model_profile']['non_trainable_params'])
            print("No. of trainable params: "+setData['model_profile']['trainable_params'])
            print("Total params: "+setData['model_profile']['total_params'])
            df = pd.json_normalize(setData["model_profile"]["model_table"])
            print(tabulate.tabulate(df, headers='keys', tablefmt='psql'))
            # OUTPUT TO JSON
            return jsonify(setData)

# FUNCTION TO CLEAR TERMINAL SCREEN
def clearScreen(): 
    # for windows 
    if name == 'nt': 
        _ = system('cls') 
    # for mac and linux(here, os.name is 'posix') 
    else: 
        _ = system('clear') 

if __name__ == '__main__':  
    app.run('0.0.0.0',debug = True)