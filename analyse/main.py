from flask import Flask
app = Flask(__name__)

import matplotlib.pyplot as plt
import os
import re
import shutil
import string
import tensorflow as tf

from tensorflow.keras import layers
from tensorflow.keras import losses
from tensorflow.keras import preprocessing
from tensorflow.keras.layers.experimental.preprocessing import TextVectorization
import googleapiclient.discovery
import numpy as np
from matplotlib import pyplot as plt
def custom_standardization(input_data):
  lowercase = tf.strings.lower(input_data)
  stripped_html = tf.strings.regex_replace(lowercase, '<br />', ' ')
  return tf.strings.regex_replace(stripped_html,
                                  '[%s]' % re.escape(string.punctuation),
                                  '')


def getLabel(sentiments):
    labels = ['anger', 'fear', 'joy', 'love', 'sadness']
    index = 0
    maximum = 0
    cpt = 0
    for sentiment in sentiments:

        if (maximum < sentiment):
            maximum = sentiment
            index = cpt
        cpt = cpt + 1
    return labels[index]






@app.route('/')
def index():
    return  'Hello world from ANALYSIS part !'

@app.route('/analysis/')
def analyse():
    max_features = 10000
    sequence_length = 250

    vectorize_layer = TextVectorization(
        standardize=custom_standardization,
        max_tokens=max_features,
        output_mode='int',
        output_sequence_length=sequence_length)
    # # Récupération des commentaires Youtube

    # In[25]:



    # In[26]:

    

    # In[30]:

    commentsText

    # In[31]:

    # Chargement du modèle pour faire des prédictions
    export_model = tf.keras.Sequential([
        vectorize_layer,
        tf.keras.models.load_model('saved_model/my_model'),
        layers.Activation('sigmoid')
    ])

    export_model.compile(loss=losses.SparseCategoricalCrossentropy(from_logits=True),
                         optimizer='adam',
                         metrics=['accuracy'])
    export_model.predict(commentsText)

    # In[35]:




    sentimentsValue = {'joy': 0, 'sadness': 0, 'fear': 0, 'love': 0, 'anger': 0}
    for sentiments in export_model.predict(commentsText):
        sentimentsValue[getLabel(sentiments)] = sentimentsValue[getLabel(sentiments)] + 1

    return  sentimentsValue

if __name__ == "__main__":
    app.run(debug=True)