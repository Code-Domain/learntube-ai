from services.llm_service import client


def ai_rank_videos(user_query, videos):

    video_list = ""

    for i, video in enumerate(videos):
        video_list += f"""
        {i+1}

        Title:
        {video['title']}

        Channel:
        {video['channel']}

        Views:
        {video.get('views',0)}

        """

    prompt = f"""

User wants:

{user_query}


You are an expert educational video curator.

Rank these YouTube videos.

Your priorities:

1. Prefer trusted educators:
- freeCodeCamp.org
- Apna College
- CodeWithHarry
- Bro Code
- CodeHelp
- Programming with Mosh
- Traversy Media
- The Net Ninja
- Fireship

2. Prefer:
- complete courses
- structured tutorials
- beginner friendly explanations
- updated content

3. Avoid:
- clickbait
- short incomplete videos
- unknown low quality channels


Videos:

{video_list}


Return ONLY numbers.

Example:

4,1,7,3,2

"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content