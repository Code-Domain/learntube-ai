from fastapi import FastAPI
from pydantic import BaseModel
from services.llm_service import ask_ai, explain_videos
from services.youtube_service import search_videos
from services.intent_service import get_intent
from services.youtube_service import search_videos
from services.ranking_service import rank_videos
from fastapi.middleware.cors import CORSMiddleware
from services.learning_service import generate_learning_path
from services.query_optimizer import optimize_query
from services.ai_ranking_service import ai_rank_videos
from services.reorder_service import reorder_videos
from services.video_reason_service import generate_video_reason


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    history: list = []


@app.get("/")
def home():
    return {
        "message": "YouTube AI Chatbot Backend Running"
    }


@app.get("/youtube")
def youtube_search(query: str):

    videos = search_videos(query)

    ranking = ai_rank_videos(
        request.message,
        videos
    )

    print("AI RANKING:", ranking)

    ranked_videos = reorder_videos(
        videos,
        ranking
    )

    for video in ranked_videos[:5]:

        video["reason"] = generate_video_reason(
            request.message,
            video["title"]
        )

    return {
        "videos": ranked_videos
    }

@app.post("/chat")
def chat(request: ChatRequest):

    intent = get_intent(request.message)

    print("MESSAGE:", request.message)
    print("INTENT:", intent)

    if intent == "learning_path":

        path = generate_learning_path(
            request.message
        )

        return {
            "type": "learning_path",
            "path": path
        }

    if intent == "youtube":

        optimized_query = optimize_query(
            request.message,
            request.history
        )

        print("OPTIMIZED QUERY:", optimized_query)

        videos = search_videos(
            optimized_query
        )

        ranking = ai_rank_videos(
            request.message,
            videos
        )

        print("AI RANKING:", ranking)

        ranked_videos = rank_videos(videos)

        explanation = explain_videos(
            request.message,
            ranked_videos
        )

        return {
            "type": "youtube",
            "videos": ranked_videos,
            "explanation": explanation
        }

    response = ask_ai(
        request.message,
        request.history
    )

    return {
        "type": "chat",
        "response": response
    }