from flask import Flask
import os
import sys
import tensorflow as tf
from rnn_model.rnn import rnnModel
import googleapiclient.discovery
import numpy as np
app = Flask(__name__)



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
    counter = 0
    nextPageToken = ""
    videoId = "EKkzbbLYPuI"
    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    api_service_name = "youtube"
    api_version = "v3"
    DEVELOPER_KEY = "AIzaSyBAA9qtlKPWmy6UTPuyKIAVm5W9wbOkx4s"
    youtube = googleapiclient.discovery.build(api_service_name, api_version, developerKey=DEVELOPER_KEY)
    comments = np.array([])

    request = youtube.commentThreads().list(
        part="id,replies,snippet",
        maxResults=100,
        videoId=videoId
    )

    for i in range(100):
        if (len(nextPageToken) == 0):
            request = youtube.commentThreads().list(
                part="id,replies,snippet",
                maxResults=100,
                videoId=videoId
            )
        else:
            request = youtube.commentThreads().list(
                part="id,replies,snippet",
                maxResults=100,
                videoId=videoId,
                pageToken=nextPageToken
            )
        response = request.execute()
        if ('nextPageToken' in response):
            nextPageToken = response['nextPageToken']
            comments = np.concatenate([comments, np.array(response['items'])])
            counter = counter + 1

        else:
            nextPageToken = ""
            comments = np.concatenate([comments, np.array(response['items'])])
            counter = counter + 1
            break

    # In[29]:

    commentsText = []
    for comment in comments:
        commentsText.append(comment['snippet']['topLevelComment']['snippet']['textDisplay'])


    exported_model = rnnModel()
    exported_model.predict(commentsText)
    sentimentsValue = {'joy': 0, 'sadness': 0, 'fear': 0, 'love': 0, 'anger': 0}
    for sentiments in exported_model.predict(commentsText):
        sentimentsValue[getLabel(sentiments)] = sentimentsValue[getLabel(sentiments)] + 1
    return  sentimentsValue

if __name__ == "__main__":
    app.run(debug=True)