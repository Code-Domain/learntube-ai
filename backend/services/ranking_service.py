def rank_videos(videos):

    for video in videos:

        views = video.get("views", 0)

        video["score"] = (
            views * 0.7
        )

    ranked = sorted(
        videos,
        key=lambda x: x["score"],
        reverse=True
    )

    return ranked[:5]