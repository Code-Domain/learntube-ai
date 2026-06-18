from services.llm_service import ask_ai


def generate_learning_path(topic):

    prompt = f"""
Create a beginner friendly learning path for:

{topic}

Format:

Step 1:
Step 2:
Step 3:
Step 4:
Step 5:

Keep it practical and concise.
"""

    return ask_ai(prompt)