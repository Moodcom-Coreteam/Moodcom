import os
import json

import googleapiclient.discovery
import numpy as np

with open("youtube.config.json") as f:
    s_YOUTUBE_CONFIG = json.load(f)

print(s_YOUTUBE_CONFIG)

def getVideoCommentsThreads(p_wanted_comments, p_video_id):
    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    
    youtube = googleapiclient.discovery.build(
        s_YOUTUBE_CONFIG['API_SERVICE_NAME'],
        s_YOUTUBE_CONFIG['API_VERSION'],
        developerKey=s_YOUTUBE_CONFIG['API_KEY']
    )

    #Initialize comments array to receive all comments
    comments = np.array([])

    #Get the number of loop the process need to get p_wanted_comments
    nbNedeedLoop = int(np.ceil(p_wanted_comments / s_YOUTUBE_CONFIG["MAX_RESULT_PER_CALL"]))

    nextPageToken = ""
    totalComments = 0

    for i in range(nbNedeedLoop):
        if (len(nextPageToken) == 0):
            request = youtube.commentThreads().list(
                part="id,replies,snippet",
                maxResults=s_YOUTUBE_CONFIG["MAX_RESULT_PER_CALL"],
                videoId=p_video_id
            )
        else:
            request = youtube.commentThreads().list(
                part="id,replies,snippet",
                maxResults=s_YOUTUBE_CONFIG["MAX_RESULT_PER_CALL"],
                videoId=p_video_id,
                pageToken=nextPageToken
            )

        #Get the API response executing prebuilt request
        response = request.execute()

        if ('nextPageToken' in response):
            nextPageToken = response['nextPageToken']
            comments = np.concatenate([comments, np.array(response['items'])])
            totalComments = totalComments + 1

        else:
            nextPageToken = ""
            responseItem = np.array(response['items'])
            comments = np.concatenate([comments, responseItem])
            totalComments = totalComments + (len(responseItem) / s_YOUTUBE_CONFIG["MAX_RESULT_PER_CALL"])
            break

    totalComments = int(totalComments * s_YOUTUBE_CONFIG["MAX_RESULT_PER_CALL"])
    print("nb comments")
    print(len(comments))
    print("estimate nb comments")
    print(totalComments)

    return comments

def getVideoCommentsTxt(p_comment_threads):
    commentsTxt = []
    for comment_thread in p_comment_threads:
        commentsTxt.append(comment_thread['snippet']['topLevelComment']['snippet']['textDisplay'])
    return commentsTxt

neededComments = getVideoCommentsThreads(121, "EWyM299OPu8")
onlyCommentsTxt = getVideoCommentsTxt(neededComments)
print(onlyCommentsTxt)