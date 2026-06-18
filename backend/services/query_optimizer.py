from services.llm_service import ask_ai

def optimize_query(user_query, history=[]):

    context = ""

    for msg in history[-10:]:

        if msg.get("sender") == "user":
            context += f"User: {msg['text']}\n"

    prompt = f"""
Previous conversation:

{context}

Current user request:

{user_query}

Task:

Convert the current request into the best YouTube search query.

Rules:

- Use previous conversation context.
- If the user says things like:
  tutorials
  course
  roadmap
  projects
  practice

  infer the topic from previous messages.

Examples:

Conversation:
User: I want to learn JavaScript

Current request:
tutorials

Output:
JavaScript tutorials for beginners

Conversation:
User: Teach me Machine Learning

Current request:
course

Output:
Best Machine Learning course for beginners

Return ONLY the final YouTube search query.
"""

    return ask_ai(prompt)