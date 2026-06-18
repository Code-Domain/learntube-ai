from googleapiclient.discovery import build
from dotenv import load_dotenv
import os

load_dotenv()

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

youtube = build(
    "youtube",
    "v3",
    developerKey=YOUTUBE_API_KEY
)


def search_videos(query):

    request = youtube.search().list(
        part="snippet",
        q=query,
        type="video",
        maxResults=20
    )

    response = request.execute()

    videos = []

    for item in response["items"]:

        title = item["snippet"]["title"]

        channel = item["snippet"]["channelTitle"]

        video_id = item["id"]["videoId"]

        url = f"https://www.youtube.com/watch?v={video_id}"

        thumbnail = item["snippet"]["thumbnails"]["high"]["url"]

        videos.append({
            "title": title,
            "channel": channel,
            "video_id": video_id,
            "url": url,
            "thumbnail": thumbnail
    })

    return videos