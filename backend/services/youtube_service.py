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
        maxResults=50
    )

    response = request.execute()

    video_ids = [
        item["id"]["videoId"]
        for item in response["items"]
    ]

    stats_request = youtube.videos().list(
        part="statistics",
        id=",".join(video_ids)
    )

    stats_response = stats_request.execute()

    stats_map = {}

    for item in stats_response["items"]:

        stats_map[item["id"]] = item["statistics"]

    videos = []

    for item in response["items"]:

        title = item["snippet"]["title"]

        channel = item["snippet"]["channelTitle"]

        video_id = item["id"]["videoId"]

        url = f"https://www.youtube.com/watch?v={video_id}"

        thumbnail = item["snippet"]["thumbnails"]["high"]["url"]

        views = int(
            stats_map.get(video_id, {})
            .get("viewCount", 0)
        )

        stats = stats_map.get(video_id, {})

        statistics = stats.get(
            "statistics",
            {}
        )

        videos.append({
            "title": title,
            "channel": channel,
            "video_id": video_id,
            "url": url,
            "thumbnail": thumbnail,
            "views": int(
                statistics.get(
                    "viewCount",
                    0
                )
            )
        })

    return videos