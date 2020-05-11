from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS, cross_origin
import tensorflow as tf
import numpy as np
import cv2
import os
import glob
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app)

app.config['UPLOAD_FOLDER'] = './uploads'

@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Server online'})

@app.route('/check', methods=['GET'])
def check():
    version = tf.version
    print(version)
    if(version):
        return jsonify({'tensorflow': True})
    else:
        return jsonify({'tensorflow': False})

@app.route('/upload', methods=['POST'])
@cross_origin()
def upload():
    if (request.method == 'POST'):
        file = request.files['file']
        if (file):
            filename = file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
            return jsonify({'message': 'file uploaded successfully','filename':filename})
        
@app.route('/uploadedfiles', methods=['GET'])
def listupload():
    files = glob.glob('./uploads/*.*')
    files.sort(key=os.path.getmtime, reverse=True)
    refined_list = []
    for file in files:
        refined_list.append(file[10:])
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
    return jsonify(data)

@app.route('/testmodel/<filename>', methods=['POST'])
def testmodel(filename):
    data = request.get_json()
    if(data):
        selected_model = data['model']
    files = os.listdir('./uploads')
    if (filename):
        if(data):
            model = tf.keras.models.load_model(f'.//models//' + selected_model)
        else:
            model = tf.keras.models.load_model(f'.//models//5-conv-32-nodes-1-dense-1583918600.h5')
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
            return jsonify(setData)
    # return jsonify(models)

if __name__ == '__main__':  
    app.run('0.0.0.0',debug = True)