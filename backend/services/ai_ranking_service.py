from services.llm_service import client


def ai_rank_videos(user_query, videos):

    video_list = ""

    for i, video in enumerate(videos):
        video_list += f"{i+1}. {video['title']}\n"

    prompt = f"""
User wants:

{user_query}

Rank these videos from best to worst.

Consider:
- relevance
- beginner friendliness
- completeness
- learning value

Videos:

{video_list}

Return only the numbers in ranked order.
Example:
3,1,5,2,4
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