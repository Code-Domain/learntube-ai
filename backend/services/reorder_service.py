def reorder_videos(videos, ranking):

    try:

        indices = [
            int(x.strip()) - 1
            for x in ranking.split(",")
        ]

        reordered = []

        for index in indices:

            if 0 <= index < len(videos):
                reordered.append(videos[index])

        return reordered

    except Exception as e:

        print("Ranking Error:", e)
        return videos