import os

s_YOUTUBE_CONFIG = open("youtube.config.json", "r")

print(s_YOUTUBE_CONFIG)

def getVideoComments(p_wanted_comments):
    api_service_name = "youtube"
    api_version = "v3"


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

    # In[27]:

    request = youtube.commentThreads().list(
        part="id,replies,snippet",
        maxResults=100,
        videoId=videoId
    )

    # In[28]:

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