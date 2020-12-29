from flask import Flask
from rnn_model.rnn import rnnModel
from youtube_API.youtube import *

app = Flask(__name__)

@app.route('/')
def index():
    return  'Hello world from ANALYSIS part !'

@app.route('/analysis/')
def analyse():
    nbComments = request.args.get('nbComments')
    videoId = request.args.get('videoId')

    #Get YouTube comments
    commentsThreads = getVideoCommentsThreads(int(nbComments), videoId)
    commentsTxt = getVideoCommentsTxt(commentsThreads)

    #Load the model
    exported_model = rnnModel()

    #Doing prediction
    exported_model.predict(commentsTxt)
    sentimentsValue = {'joy': 0, 'sadness': 0, 'fear': 0, 'love': 0, 'anger': 0}
    for sentiments in exported_model.predict(commentsTxt):
        sentimentsValue[getLabel(sentiments)] = sentimentsValue[getLabel(sentiments)] + 1

    return  sentimentsValue


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

if __name__ == "__main__":
    app.run(debug=True)