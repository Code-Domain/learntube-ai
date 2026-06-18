from services.llm_service import client


def generate_video_reason(user_query, video_title):

    prompt = f"""
User wants:

{user_query}

Video:

{video_title}

Explain in 2-3 short bullet points why this video is a good recommendation.

Keep it concise.
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