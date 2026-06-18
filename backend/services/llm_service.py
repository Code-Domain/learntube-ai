from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def ask_ai(message: str, history=[]):

    conversation = [
        {
            "role": "system",
            "content": """
            You are LearnTube AI, an intelligent educational assistant.

            Rules:
            - Answer naturally like ChatGPT.
            - Use markdown formatting when helpful.
            - Use headings, lists, tables, code blocks, or step-by-step explanations only when appropriate.
            - Adapt the answer format to the user's question.
            - Be clear, educational, and beginner friendly.
            - Recommend learning resources when relevant.
            - Refuse harmful, illegal, adult, explicit, dangerous, hacking, scam, or malicious requests.
            - Focus on learning, technology, careers, education, productivity, and knowledge.

            Do not force a fixed answer template.
            """
        }
    ]

    # Add previous chat messages
    for msg in history[-10:]:

        role = (
            "assistant"
            if msg.get("sender") == "bot"
            else "user"
        )

        if msg.get("text"):

            conversation.append({
                "role": role,
                "content": msg["text"]
            })

    # Add current user message
    conversation.append({
        "role": "user",
        "content": message
    })

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=conversation
    )

    return response.choices[0].message.content
    
def explain_videos(query, videos):

    video_titles = "\n".join(
        [f"- {video['title']}" for video in videos[:5]]
    )

    prompt = f"""
User query:
{query}

Recommended videos:
{video_titles}

Your task:
- Explain why these videos match the user's learning goal.
- Mention what skills or knowledge the learner will gain.
- Suggest the best order to watch them.
- Mention the difficulty level (Beginner, Intermediate, Advanced).
- Keep the explanation concise and helpful.

If the user did not specify a language, prefer English or Hindi content.

Respond naturally, like ChatGPT.
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