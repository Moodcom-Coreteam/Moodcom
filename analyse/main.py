import datetime
from flask import Flask, request
import logging
from rnn_model.rnn import rnnModel
import uuid
from youtube_API.youtube import getVideoCommentsThreads, getVideoCommentsTxt, getVideoLikeDislikeAndComment

app = Flask(__name__)


@app.route('/')
def index():
    return 'Hello world from ANALYSIS part !'


@app.route('/analyse/', methods=['GET'])
def analyse():
    # Get request arguments
    print("Get request arguments")
    nbComments = request.args.get('nbComments')
    videoId = request.args.get('videoId')

    # Get YouTube comments
    print("Get YouTube comments")
    commentsThreads = getVideoCommentsThreads(int(nbComments), videoId)
    commentsTxt = getVideoCommentsTxt(commentsThreads)

    # Load the model
    print("Get load RNN model")
    exported_model = rnnModel()

    # Doing prediction
    print("Doing prediction")
    exported_model.predict(commentsTxt)
    sentimentsValue = {'joy': 0, 'sadness': 0, 'love': 0, 'disappointment': 0, 'anger': 0, 'optimism': 0}
    for sentiments in exported_model.predict(commentsTxt):
        sentimentsValue[getLabel(sentiments)
                        ] = sentimentsValue[getLabel(sentiments)] + 1
    for attr in sentimentsValue:
        sentimentsValue[attr] = int(sentimentsValue[attr]) / int(nbComments)
    print('Prediction DONE')
    return buildAnalysisResult(videoId, sentimentsValue)


@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500


def getLabel(sentiments):
    labels = ['anger', 'disappointment', 'joy', 'love', 'optimism', 'sadness']
    index = 0
    maximum = 0
    cpt = 0
    for sentiment in sentiments:
        if (maximum < sentiment):
            maximum = sentiment
            index = cpt
        cpt = cpt + 1
    return labels[index]


def buildAnalysisResult(p_video_id, p_analysis_result):
    like, dislike, commentCount = getVideoLikeDislikeAndComment(p_video_id)
    result = {
        '_id': str(uuid.uuid4()),
        'date': str(datetime.datetime.now()),
        'analysis': {
            'feelings': p_analysis_result,
            'like': like,
            'dislike': dislike,
            'commentCount': commentCount
        }
    }
    return result


if __name__ == "__main__":
    app.run(debug=True)
