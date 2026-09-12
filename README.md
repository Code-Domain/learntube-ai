# 🎓 LearnTube AI

> An AI-powered learning assistant that combines conversational AI, personalized learning paths, and intelligent YouTube video discovery in one application.

LearnTube AI is a full-stack AI-powered educational platform designed to help users learn more effectively through conversation, structured learning roadmaps, and carefully selected educational YouTube content.

Instead of manually searching through hundreds of YouTube videos or wondering where to begin learning a new topic, users can interact with LearnTube AI using natural language.

For example:

- "Teach me JavaScript"
- "Give me a React learning roadmap"
- "Show me Python tutorial videos"
- "I want to learn machine learning"
- "Recommend videos for learning FastAPI"
- "Create a 30-day roadmap for web development"

The application analyzes the user's request and determines what type of response is most useful. Depending on the request, LearnTube AI can:

- 💬 Provide an AI-generated conversational response
- 🗺️ Generate a structured learning path
- 🎥 Search for relevant YouTube videos
- 🔍 Optimize the user's search query
- 🧠 Rank videos using AI
- 📚 Reorder videos based on relevance
- ✨ Generate explanations for recommended videos

The project is built with a modern full-stack architecture using Next.js and React on the frontend and FastAPI and Python on the backend.

---

# 🌐 Live Application

## Frontend

The frontend is deployed and available online.

👉 **Live Application:**  
https://learntube-ai-ecru.vercel.app

## Backend

The backend API is deployed separately.

👉 **Backend API:**  
https://learntube-ai-backend.onrender.com

---

# 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Why LearnTube AI](#-why-learntube-ai)
- [Features](#-features)
- [How It Works](#-how-it-works)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Frontend](#-frontend)
- [Backend](#-backend)
- [AI Features](#-ai-features)
- [YouTube Recommendation Pipeline](#-youtube-recommendation-pipeline)
- [Learning Path Generation](#-learning-path-generation)
- [Chat Flow](#-chat-flow)
- [API Endpoints](#-api-endpoints)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running Locally](#-running-locally)
- [Deployment](#-deployment)
- [CORS Configuration](#-cors-configuration)
- [Markdown Rendering](#-markdown-rendering)
- [Error Handling](#-error-handling)
- [Troubleshooting](#-troubleshooting)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

---

# 📖 About the Project

LearnTube AI is an intelligent learning assistant focused on making online learning easier and more personalized.

The internet contains an enormous amount of educational content. YouTube alone contains tutorials, courses, lectures, coding demonstrations, and educational videos on almost every topic imaginable.

However, finding the right content can be difficult.

Users often face problems such as:

- Too many search results
- Irrelevant videos
- Difficulty knowing where to start
- No clear learning order
- Difficulty choosing beginner-friendly content
- Searching for the same topic multiple times
- Watching videos without a structured learning plan

LearnTube AI attempts to solve these problems by combining:

```text
User Question
      ↓
Intent Detection
      ↓
Request Processing
      ↓
AI + YouTube Search
      ↓
Video Ranking
      ↓
Learning Recommendations
      ↓
Structured Response
````

The application acts as an intelligent layer between the user and educational content.

---

# 🎯 Why LearnTube AI?

Traditional YouTube search is based primarily on keywords.

For example:

```text
React tutorial
```

may return thousands of videos.

The user must manually determine:

* Which video is best?
* Which video is beginner-friendly?
* Which video should be watched first?
* Is the video relevant to the exact learning goal?
* Are there better alternatives?

LearnTube AI introduces an additional intelligence layer.

Instead of simply displaying search results, the system processes the user's request and attempts to understand their intent.

For example:

```text
I want to learn React from beginner to advanced
```

is not simply treated as a keyword search.

The system can identify that the user is looking for educational content and process the request through an AI-powered recommendation pipeline.

---

# ✨ Features

## 💬 AI Chat

Users can ask questions naturally.

Examples:

```text
What is JavaScript?
```

```text
Explain React hooks.
```

```text
What should I learn before machine learning?
```

The backend processes the message and generates an AI response.

---

## 🧠 Intent Detection

The application analyzes the user's message to determine what they are trying to accomplish.

Examples of supported request categories include:

```text
General Chat
Learning Path
YouTube Video Search
```

Example:

```text
Give me a roadmap to learn Python
```

may be classified as:

```text
learning_path
```

While:

```text
Show me React tutorial videos
```

may be classified as:

```text
youtube
```

This allows the backend to use different processing pipelines depending on the user's goal.

---

## 🗺️ Personalized Learning Paths

Users can request structured learning roadmaps.

Example:

```text
Give me a roadmap to learn JavaScript.
```

The system can generate a structured response containing learning stages, concepts, and suggested progression.

A learning roadmap may include:

```text
Stage 1
Fundamentals

Stage 2
Core Concepts

Stage 3
Intermediate Development

Stage 4
Projects

Stage 5
Advanced Topics
```

The goal is to help learners understand what to study and in what order.

---

## 🎥 Intelligent YouTube Search

Users can request educational videos directly from the chatbot.

Examples:

```text
JavaScript tutorial videos
```

```text
React videos for beginners
```

```text
Best Python tutorials
```

```text
Machine learning courses on YouTube
```

Instead of simply returning raw results, LearnTube AI uses a multi-step pipeline.

---

## 🔍 Query Optimization

Users may not always write the perfect search query.

For example:

```text
react videos
```

can be transformed into something more descriptive, such as:

```text
React video tutorials for beginners
```

The optimized query can then be used to search for more relevant educational content.

---

## 🧠 AI Video Ranking

After videos are retrieved, the system can use AI to evaluate their relevance to the user's original request.

Conceptually:

```text
User Request
      ↓
Video Search Results
      ↓
AI Ranking
      ↓
Reordering
      ↓
Top Recommended Videos
```

This helps move more relevant videos toward the top of the results.

---

## 🔄 Video Reordering

The ranking system produces an ordering that can be used to rearrange video results.

Instead of displaying search results in their original order, the application can reorder them based on AI-generated relevance.

---

## ✨ AI Video Explanations

After selecting recommended videos, the system can generate an explanation describing the recommendations.

For example:

```text
These videos are recommended because they provide a beginner-friendly
introduction to React and gradually introduce more advanced concepts.
```

This adds context to the recommendations instead of simply showing a list of links.

---

## 📜 Markdown Responses

AI-generated responses may contain structured formatting such as:

* Headings
* Lists
* Bold text
* Code blocks
* Tables
* Learning stages

The frontend uses Markdown rendering to display formatted AI responses.

---

## 🌐 Full-Stack Architecture

The project separates the frontend and backend.

```text
Frontend
Next.js + React
        ↓
REST API
        ↓
FastAPI Backend
        ↓
AI Services + YouTube Services
```

This architecture makes it easier to maintain and extend the project.

---

# ⚙️ How It Works

The basic workflow of LearnTube AI is:

```text
┌─────────────────────┐
│      User Input     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Next.js Frontend  │
└──────────┬──────────┘
           │
           │ POST /chat
           ▼
┌─────────────────────┐
│   FastAPI Backend   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Intent Detection  │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
Learning      YouTube
 Path          Search
     │           │
     ▼           ▼
AI Path      Query Optimization
Generation          │
                   ▼
              Video Search
                   │
                   ▼
                AI Ranking
                   │
                   ▼
             Video Reordering
                   │
                   ▼
              AI Explanation
                   │
                   ▼
             Frontend Response
```

---

# 🏗️ System Architecture

LearnTube AI follows a client-server architecture.

## Frontend Layer

The frontend is responsible for:

* Displaying the chatbot interface
* Collecting user messages
* Sending API requests
* Displaying AI responses
* Displaying learning paths
* Displaying video recommendations
* Rendering Markdown content
* Handling loading states
* Handling API errors

---

## Backend Layer

The backend is responsible for:

* Receiving chat requests
* Detecting user intent
* Generating AI responses
* Generating learning paths
* Optimizing YouTube search queries
* Searching videos
* Ranking videos
* Reordering videos
* Generating explanations
* Returning structured JSON responses

---

# 🧰 Technology Stack

## Frontend

The frontend is built using:

* Next.js
* React
* TypeScript
* Tailwind CSS
* React Markdown

The frontend package configuration includes scripts for development, production builds, and linting. 

---

## Backend

The backend is built using:

* Python
* FastAPI
* Pydantic
* Uvicorn
* CORS Middleware
* AI service integrations
* YouTube service integrations

The FastAPI application exposes API endpoints and coordinates multiple service modules for intent detection, learning paths, YouTube search, query optimization, AI ranking, video reordering, and response generation. 

---

# 📁 Project Structure

The repository follows a full-stack structure:

```text
learntube-ai/
│
├── backend/
│   │
│   ├── main.py
│   │
│   └── services/
│       ├── llm_service.py
│       ├── youtube_service.py
│       ├── intent_service.py
│       ├── ranking_service.py
│       ├── learning_service.py
│       ├── query_optimizer.py
│       ├── ai_ranking_service.py
│       ├── reorder_service.py
│       └── video_reason_service.py
│
├── frontend/
│   │
│   ├── app/
│   │   └── page.tsx
│   │
│   ├── components/
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
│
├── package.json
│
└── package-lock.json
```

The exact repository currently contains separate `backend` and `frontend` directories. ([GitHub][1])

---

# 🎨 Frontend

The frontend is responsible for the user experience.

The main responsibilities include:

```text
User Input
    ↓
Frontend State Management
    ↓
API Request
    ↓
Backend Processing
    ↓
JSON Response
    ↓
Conditional Rendering
    ↓
Chat / Learning Path / Videos
```

The frontend communicates with the backend through HTTP requests.

The backend URL can be configured using an environment variable.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For a deployed environment:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.example.com
```

---

# 🔌 Backend

The backend is implemented using FastAPI.

The main backend application defines request models and routes, including a root endpoint, a YouTube endpoint, and the primary `/chat` endpoint. 

---

# 📨 Chat Request Format

The backend accepts a request model similar to:

```json
{
  "message": "Show me React tutorial videos",
  "history": []
}
```

The backend processes the message and determines the appropriate response type.

---

# 🤖 AI Features

LearnTube AI uses AI as part of several processing stages.

## AI Chat

For normal conversational requests:

```text
User Message
      ↓
AI Service
      ↓
Generated Response
```

The backend returns a response with a type similar to:

```json
{
  "type": "chat",
  "response": "AI generated response"
}
```

---

## AI Learning Paths

For learning roadmap requests:

```text
User Request
      ↓
Learning Path Service
      ↓
Structured Learning Path
```

The backend returns:

```json
{
  "type": "learning_path",
  "path": "Generated learning roadmap"
}
```

---

# 🎥 YouTube Recommendation Pipeline

One of the main features of LearnTube AI is intelligent video discovery.

The pipeline works conceptually as follows:

```text
User:
"React videos"
        ↓
Intent Detection
        ↓
Intent: youtube
        ↓
Query Optimization
        ↓
"React video tutorials for beginners"
        ↓
YouTube Search
        ↓
Video Results
        ↓
AI Ranking
        ↓
Ranked Video Order
        ↓
Video Reordering
        ↓
Top Videos
        ↓
AI Explanation
        ↓
Response to User
```

The backend's `/chat` route contains this general YouTube processing flow: optimize the query, search for videos, rank them, reorder them, select the top results, and generate an explanation. 

---

# 🧠 Intent Detection

Intent detection allows the application to select an appropriate processing pipeline.

Possible flows include:

```text
General Question
        ↓
General AI Response
```

```text
Learning Request
        ↓
Learning Path Generator
```

```text
Video Request
        ↓
YouTube Recommendation Pipeline
```

This modular approach prevents every request from being processed in exactly the same way.

---

# 🔎 Query Optimization

A user may type:

```text
python videos
```

This is a very broad query.

An AI query optimization layer can transform the request into a more descriptive search query.

For example:

```text
Python programming tutorials for beginners
```

This optimized query can improve the relevance of search results.

---

# 🏆 AI Video Ranking

After retrieving videos, LearnTube AI can evaluate their relevance.

Conceptually:

```text
Video 1
Video 2
Video 3
Video 4
Video 5
        ↓
AI Ranking
        ↓
Recommended Order
```

The ranking result is then passed to the video reordering service.

---

# 🔄 Video Reordering

The ranking output determines how videos should be rearranged.

Example:

```text
Original Results:

1. Video A
2. Video B
3. Video C
4. Video D
```

AI ranking may determine:

```text
3, 1, 4, 2
```

The reordered results become:

```text
1. Video C
2. Video A
3. Video D
4. Video B
```

This allows the final recommendations to better match the user's request.

---

# ✨ Video Explanation

The system can generate an explanation after ranking the videos.

Example:

```text
These videos are recommended because they begin with React fundamentals
and gradually introduce components, hooks, state management, and
real-world application development.
```

The explanation helps users understand why the recommendations may be useful.

---

# 🛣️ Learning Path Generation

Learning paths help users move from an initial topic to progressively more advanced concepts.

Example request:

```text
Create a roadmap to learn JavaScript.
```

Example conceptual response:

```text
Stage 1
JavaScript Fundamentals

Stage 2
Functions and Scope

Stage 3
Arrays and Objects

Stage 4
DOM Manipulation

Stage 5
Asynchronous JavaScript

Stage 6
Modern JavaScript

Stage 7
Projects
```

The learning path feature is intended to provide structure rather than just isolated answers.

---

# 🔌 API Endpoints

## GET `/`

Checks whether the backend is running.

Example response:

```json
{
  "message": "YouTube AI Chatbot Backend Running"
}
```

The current backend defines this root health-style endpoint. 

---

## GET `/youtube`

Used for YouTube-related video searching.

Example conceptual request:

```text
GET /youtube?query=javascript
```

Example conceptual response:

```json
{
  "videos": []
}
```

---

## POST `/chat`

This is the main endpoint used by the frontend.

Example request:

```json
{
  "message": "Give me a React learning roadmap",
  "history": []
}
```

Depending on the detected intent, the response can contain different data.

---

## General Chat Response

```json
{
  "type": "chat",
  "response": "Generated AI response"
}
```

---

## Learning Path Response

```json
{
  "type": "learning_path",
  "path": "Generated learning roadmap"
}
```

---

## YouTube Response

```json
{
  "type": "youtube",
  "videos": [],
  "explanation": "Explanation of recommended videos"
}
```

---

# 💻 Installation

## Clone the Repository

```bash
git clone https://github.com/Code-Domain/learntube-ai.git
```

Move into the project directory:

```bash
cd learntube-ai
```

Open the project in VS Code:

```bash
code .
```

---

# 🖥️ Frontend Setup

Move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend should run locally on:

```text
http://localhost:3000
```

---

# ⚙️ Frontend Environment Variables

Create:

```text
frontend/.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

If using the deployed backend:

```env
NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com
```

Restart the Next.js development server after changing environment variables.

---

# 🐍 Backend Setup

Move into the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it.

### Windows

```bash
.venv\Scripts\activate
```

### macOS/Linux

```bash
source .venv/bin/activate
```

Install the backend dependencies according to the project's dependency configuration.

Then start the FastAPI application.

Example:

```bash
uvicorn main:app --reload
```

The backend should run locally on:

```text
http://localhost:8000
```

---

# ▶️ Running the Full Project Locally

You need two terminals.

## Terminal 1 — Backend

```bash
cd learntube-ai/backend
```

Activate your virtual environment.

Then:

```bash
uvicorn main:app --reload
```

---

## Terminal 2 — Frontend

```bash
cd learntube-ai/frontend
```

Then:

```bash
npm run dev
```

Now open:

```text
http://localhost:3000
```

---

# 🌐 Local Architecture

```text
Browser
http://localhost:3000
        │
        │
        ▼
Next.js Frontend
        │
        │ POST /chat
        ▼
FastAPI Backend
http://localhost:8000
        │
        ├──────────────► AI Services
        │
        └──────────────► YouTube Services
```

---

# 🚀 Deployment

LearnTube AI uses a separated deployment architecture.

## Frontend Deployment

The frontend can be deployed independently.

The live repository metadata currently links to a Vercel-hosted frontend deployment. ([GitHub][1])

Typical deployment flow:

```text
Local Development
        ↓
Git Commit
        ↓
Git Push
        ↓
GitHub Repository
        ↓
Frontend Deployment Platform
        ↓
Production Website
```

---

## Backend Deployment

The FastAPI backend is deployed separately.

Typical deployment flow:

```text
Local Backend
        ↓
Git Commit
        ↓
Git Push
        ↓
GitHub Repository
        ↓
Render Deployment
        ↓
Production API
```

---

# 🔐 Environment Variables and Security

Environment files often contain sensitive information such as API keys.

Examples:

```text
.env
.env.local
```

These files should generally not be committed to GitHub.

Example `.gitignore` rules:

```gitignore
.env
.env.local
*.env
```

When cloning a repository, Git only downloads files that have actually been committed.

This means local environment files may need to be recreated from secure environment configuration.

Never commit secrets such as:

```text
API keys
Private tokens
Passwords
Database credentials
```

---

# 🌍 CORS Configuration

Because the frontend and backend are deployed on different domains, the backend must explicitly allow requests from the frontend.

The current backend configures FastAPI CORS middleware and includes both a local frontend origin and the deployed Vercel frontend origin. 

Conceptually:

```text
Frontend Domain
        │
        │ API Request
        ▼
Backend Domain
        │
        │ CORS Validation
        ▼
Request Allowed
```

Example:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend-domain.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
```

When deploying to a new frontend domain, the backend CORS configuration may need to be updated.

---

# 📝 Markdown Rendering

AI-generated content may contain:

````markdown
# Heading

## Subheading

- Item 1
- Item 2

**Bold Text**

```text
Code Block
````

````

The frontend uses a Markdown rendering library to convert Markdown into formatted content. The current frontend dependency configuration includes `react-markdown`. :contentReference[oaicite:9]{index=9}

For more advanced Markdown features, the frontend can be configured with compatible Markdown plugins where needed.

---

# ⚠️ Common Problems

## Backend URL is Undefined

Error:

```text
POST /undefined/chat
````

Cause:

```text
NEXT_PUBLIC_API_URL
```

is missing.

Solution:

Create:

```text
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Then restart:

```bash
npm run dev
```

---

## Unexpected Token `<`

Error:

```text
Unexpected token '<'
```

This often happens when the frontend expects JSON but receives an HTML error page.

Example causes:

* Wrong API URL
* 404 response
* Backend unavailable
* Incorrect route

A useful frontend pattern is:

```ts
if (!response.ok) {
  const errorText = await response.text();
  throw new Error(
    `Backend error: ${response.status} - ${errorText}`
  );
}

const data = await response.json();
```

---

## CORS Error

Example:

```text
blocked by CORS policy
```

Cause:

The backend does not allow requests from the frontend domain.

Solution:

Add the frontend domain to FastAPI's:

```python
allow_origins
```

Then redeploy the backend.

---

## Backend Connection Error

Possible causes:

```text
Backend unavailable
Backend restarting
API service failure
Network failure
Incorrect API URL
CORS rejection
Internal server error
```

Check:

* Browser Developer Tools
* Network tab
* Backend logs
* Deployment logs

---

## AI Service Failure

External AI providers can occasionally return errors.

Possible causes include:

* Invalid model configuration
* Missing API key
* Rate limits
* Temporary service issues
* Invalid request
* Provider-side outages

A production application should ideally handle such failures gracefully instead of allowing the entire request to fail.

Example strategy:

```text
AI Request
    │
    ├── Success ──────► Continue normally
    │
    └── Failure ──────► Log error
                         │
                         ▼
                     Use fallback
                         │
                         ▼
                 Return useful response
```

---

# 🧪 Testing the Application

Try different request types.

## General Chat

```text
What is JavaScript?
```

---

## Learning Path

```text
Give me a roadmap to learn Python.
```

---

## YouTube Search

```text
Show me React tutorial videos.
```

---

## Detailed Learning Request

```text
Create a learning roadmap for full-stack web development.
```

---

# 📊 Example User Journey

A user opens LearnTube AI.

They type:

```text
I want to learn React.
```

The application processes the request.

```text
User Message
        ↓
Intent Detection
        ↓
Learning or YouTube Request
        ↓
Appropriate Processing Pipeline
        ↓
AI-Generated Response
```

The user may then ask:

```text
Show me videos for learning React.
```

The system:

```text
Detects YouTube Intent
        ↓
Optimizes Query
        ↓
Searches Videos
        ↓
Ranks Videos
        ↓
Reorders Results
        ↓
Generates Explanation
        ↓
Displays Recommendations
```

---

# 🔮 Future Improvements

LearnTube AI can be extended in many directions.

## 👤 User Accounts

Potential features:

* Sign up
* Login
* Saved learning paths
* Learning history
* Favorite videos

---

## 📈 Learning Progress Tracking

Possible additions:

```text
Topics Completed
Videos Watched
Learning Streak
Progress Percentage
```

---

## ⭐ Save Recommendations

Users could save:

* Videos
* Learning paths
* Topics
* Conversations

---

## 🎯 Personalized Recommendations

The system could consider:

```text
Previous Searches
Completed Topics
User Experience Level
Learning Goals
```

to create more personalized recommendations.

---

## 📚 More Content Sources

The platform could eventually support additional educational sources beyond YouTube.

For example:

```text
Documentation
Online Courses
Articles
Tutorial Platforms
Open Educational Resources
```

---

## 🔐 Authentication

Potential authentication technologies could include:

* OAuth
* JWT
* Session-based authentication

---

## 📊 Analytics Dashboard

Potential statistics:

```text
Most Requested Topics
Popular Searches
Learning Path Usage
Video Recommendation Usage
```

---

## ⚡ Better Error Recovery

Future improvements could include:

* Retry logic
* Request timeouts
* AI fallbacks
* Cached responses
* Friendly error messages
* Service health checks

---

## 🧠 Improved AI Ranking

Future ranking systems could consider:

* Video relevance
* Difficulty level
* Topic coverage
* Educational quality
* User preferences

---

## 🗂️ Conversation Memory

Future versions could improve contextual conversations by maintaining better structured conversation history.

---

# 🤝 Contributing

Contributions are welcome.

If you want to contribute:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Test the application.
5. Commit your changes.

```bash
git add .
git commit -m "Add new feature"
```

6. Push your branch.

```bash
git push origin feature/new-feature
```

7. Open a Pull Request.

---

# 🧑‍💻 Development Workflow

A typical workflow is:

```text
Clone Repository
        ↓
Install Dependencies
        ↓
Configure Environment
        ↓
Run Frontend
        ↓
Run Backend
        ↓
Make Changes
        ↓
Test Locally
        ↓
Commit Changes
        ↓
Push to GitHub
        ↓
Automatic Deployment
```

---

# 📦 Useful Git Commands

## Check Changes

```bash
git status
```

## Add Changes

```bash
git add .
```

## Commit

```bash
git commit -m "Describe your changes"
```

## Push

```bash
git push origin main
```

## Pull Latest Changes

```bash
git pull origin main
```

---

# 🛠️ Development Philosophy

The project is designed around the idea that educational tools should be easier to use.

Instead of requiring users to:

```text
Search manually
        ↓
Open many videos
        ↓
Compare content
        ↓
Decide learning order
        ↓
Create their own roadmap
```

LearnTube AI aims to provide:

```text
Ask a Question
        ↓
Understand Intent
        ↓
Generate Learning Guidance
        ↓
Find Relevant Videos
        ↓
Rank Recommendations
        ↓
Continue Learning
```

---

# 🌟 Project Goals

The primary goals of LearnTube AI include:

* Making educational content easier to discover
* Helping learners find relevant videos
* Reducing irrelevant search results
* Providing structured learning guidance
* Combining AI and educational content
* Making learning more conversational
* Creating a modern full-stack AI application

---

# 🧩 Key Design Principles

## Modularity

Different responsibilities are separated into service modules.

Examples:

```text
Intent Service
YouTube Service
Learning Service
AI Ranking Service
Query Optimizer
Reordering Service
```

This makes the application easier to understand and extend.

---

## Separation of Frontend and Backend

The frontend handles presentation.

The backend handles processing.

```text
Frontend
    ↓
User Experience

Backend
    ↓
Business Logic + AI + APIs
```

---

## Intent-Based Processing

Different requests can use different pipelines.

```text
Chat Request
    ↓
Intent Detection
    ↓
Appropriate Service
```

---

## AI-Assisted Discovery

The application goes beyond basic keyword search by adding AI-based processing to the recommendation flow.

---

# 📜 License

This project currently does not declare a license in the repository metadata shown here.

If you plan to make the project open source, consider adding a `LICENSE` file and choosing an appropriate license.

---

# 🙏 Acknowledgements

LearnTube AI is built using modern open-source technologies and APIs from the web development and AI ecosystem.

Key technologies used by the project include:

* Next.js
* React
* TypeScript
* Tailwind CSS
* FastAPI
* Python
* Pydantic
* Uvicorn
* AI services
* YouTube-related services

---

# 📞 Support

If you encounter issues:

1. Check the browser console.
2. Check the frontend deployment logs.
3. Check the backend deployment logs.
4. Verify environment variables.
5. Verify the backend URL.
6. Verify CORS configuration.
7. Verify external API configuration.

---

# 🚀 LearnTube AI

LearnTube AI brings together:

```text
💬 Conversational AI
        +
🗺️ Learning Roadmaps
        +
🎥 YouTube Discovery
        +
🧠 AI Ranking
        +
🔍 Query Optimization
        +
✨ Intelligent Explanations
```

into one learning-focused application.

The goal is simple:

> **Ask what you want to learn, and let LearnTube AI help you discover a clearer path forward.**

---

## ⭐ If you like this project

Consider giving the repository a star!

Your support helps the project grow and encourages further development.

---

<p align="center">

Built with ❤️ for smarter and more accessible learning.

</p>
