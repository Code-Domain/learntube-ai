def get_intent(message: str):

    message = message.lower()

    if (
        "learn" in message
        or "roadmap" in message
        or "learning path" in message
        or "career path" in message
        or "study plan" in message
        or "become" in message
    ):
        return "learning_path"

    youtube_keywords = [
        "video",
        "videos",
        "youtube",
        "tutorial",
        "course",
        "playlist",
        "watch"
    ]

    if any(
        keyword in message
        for keyword in youtube_keywords
    ):
        return "youtube"

    return "chat"