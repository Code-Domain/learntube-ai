"use client";

import { useState, useEffect, useRef } from "react";
import VideoCard from "@/components/VideoCard";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const savedChats = localStorage.getItem(
      "learnTubeChats"
    );

    if (savedChats) {
      setChatHistory(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "learnTubeChats",
      JSON.stringify(chatHistory)
    );
  }, [chatHistory]);

  async function sendMessage() {

    if (!message.trim()) return;

    setLoading(true);
    setLoadingText("🤖 Thinking...");

    const userMessage = {
      sender: "user",
      type: "chat",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {

      const res = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            history: messages,
          }),
        }
      );

      const data = await res.json();
      setLoadingText("🧠 Preparing answer...");

      let botMessage: any = {};

      if (data.type === "chat") {

        botMessage = {
          sender: "bot",
          type: "chat",
          text: data.response,
        };

        setMessages((prev) => [
          ...prev,
          botMessage,
        ]);

      } else if (data.type === "learning_path") {

        botMessage = {
          sender: "bot",
          type: "learning_path",
          path: data.path,
        };

        setMessages((prev) => [
          ...prev,
          botMessage,
        ]);

      } else {

        botMessage = {
          sender: "bot",
          type: "youtube",
          videos: data.videos,
          explanation: data.explanation,
        };

        setMessages((prev) => [
          ...prev,
          botMessage,
        ]);

      }

      const updatedMessages = [
        ...messages,
        userMessage,
        botMessage,
      ];

      // Save chat to history
      const chatTitle =
        message.length > 30
          ? message.substring(0, 30) + "..."
          : message;

      const newChat = {
        id: currentChatId || Date.now(),
        title: chatTitle,
        messages: updatedMessages,
      };

      setChatHistory((prev) => {
        if (currentChatId) {
          return prev.map((chat) =>
            chat.id === currentChatId
              ? {
                ...chat,
                messages: updatedMessages,
              }
              : chat
          );
        }

        setCurrentChatId(newChat.id);
        return [newChat, ...prev];
      });

      setMessage("");

    } catch (error) {
      setLoading(false);
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Error connecting to backend",
        },
      ]);
    }
    setLoading(false);
  }

  return (
    <main className="h-screen flex text-white bg-[#0A0A0F] overflow-hidden">
      {/* Sidebar */}
      <div className="
w-80
bg-white/5
backdrop-blur-2xl
border-r border-white/10
p-6
flex flex-col
">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            LearnTube AI
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Personal AI Learning Companion
          </p>
        </div>
        <button
          onClick={() => {
            setMessages([]);
            setCurrentChatId(null);
          }}
          className="
w-full
bg-gradient-to-r
from-indigo-500
to-purple-600
hover:scale-[1.02]
transition-all
duration-300
py-3
rounded-2xl
font-medium
shadow-xl
"
        >
          + New Chat
        </button>
        <div className="mt-6">
          <h2 className="text-sm text-gray-400 mb-3">
            Recent Chats
          </h2>

          {chatHistory.map((chat) => (

            <div
              key={chat.id}
              className="flex items-center justify-between"
            >

              <button
                onClick={() => {
                  setMessages(chat.messages);
                  setCurrentChatId(chat.id);
                }}
                className={`flex-1 text-left p-2 rounded-lg transition ${currentChatId === chat.id
                  ? "bg-white/10 border border-white/20"
                  : "hover:bg-white/5"
                  }`}
              >
                {chat.title}
              </button>

              <button
                onClick={() => {
                  setChatHistory((prev) =>
                    prev.filter((c) => c.id !== chat.id)
                  );
                }}
                className="ml-2 text-red-400 hover:text-red-600"
              >
                ✕
              </button>

            </div>

          ))}
        </div>

      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="
h-16
border-b
border-white/10
backdrop-blur-xl
flex
items-center
px-8
">
          <div>
            <h2 className="font-semibold">
              LearnTube AI
            </h2>

            <p className="text-xs text-gray-400">
              Curated learning powered by AI
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">

          {messages.length === 0 && (

            <div className="flex flex-col items-center justify-center h-full">

              <h1 className="text-6xl font-bold mb-4 text-center">
                Learn Anything.
              </h1>

              <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Master Everything.
              </h2>

              <p className="text-gray-400 text-lg mb-10">
                AI-powered learning paths, courses and curated videos.
              </p>

              <div className="grid grid-cols-2 gap-4">

                {[
                  "Learn React",
                  "Learn Machine Learning",
                  "Learn FastAPI",
                  "Python Roadmap"
                ].map((suggestion) => (

                  <button
                    key={suggestion}
                    onClick={() => {
                      setMessage(suggestion);

                      setTimeout(() => {
                        sendMessage();
                      }, 100);
                    }}
                    className="
bg-white/5
border
border-white/10
backdrop-blur-xl
hover:bg-white/10
transition-all
duration-300
px-6
py-4
rounded-2xl
"
                  >
                    {suggestion}
                  </button>

                ))}

              </div>

            </div>

          )}

          {messages.length > 0 &&
            messages.map((msg, index) => (

              <div key={index}>

                {msg.type === "learning_path" ? (

                  <div className="bg-slate-800/80 p-5 rounded-3xl">

                    <h3 className="text-xl font-bold mb-3">
                      📚 Learning Path
                    </h3>

                    <pre className="whitespace-pre-wrap text-sm">
                      {msg.path}
                    </pre>

                  </div>

                ) : msg.type === "youtube" ? (

                  <div className="space-y-4">

                    <div className="bg-slate-800/80 p-4 rounded-2xl">
                      <h3 className="font-bold mb-2">
                        🤖 Why these videos?
                      </h3>

                      <p className="whitespace-pre-wrap">
                        {msg.explanation}
                      </p>
                    </div>

                    {msg.videos.map((video: any) => (

                      <VideoCard
                        key={video.video_id}
                        title={video.title}
                        channel={video.channel}
                        url={video.url}
                        thumbnail={video.thumbnail}
                        reason={video.reason}
                      />

                    ))}

                  </div>

                ) : (

                  <div
                    className={
                      msg.sender === "user"
                        ? "ml-auto max-w-[70%] bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl text-white p-4 rounded-3xl shadow-lg"
                        : "max-w-[70%] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl backdrop-blur-md text-white p-4 rounded-3xl"
                    }
                  >
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>

                )}

              </div>

            ))}

          {loading && (
            <div className="max-w-[70%] bg-slate-800/80 p-4 rounded-3xl">
              {loadingText}
            </div>
          )}

          <div ref={messagesEndRef} />

        </div>

        {/* Input Area */}
        <div className="
border-t
border-white/10
p-6
backdrop-blur-xl
bg-black/20
">

          <textarea
            className="w-full bg-white/5
border
border-white/10
backdrop-blur-xl backdrop-blur-md text-white rounded-2xl p-4 outline-none"
            placeholder="Ask anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="mt-3 bg-gradient-to-r
from-indigo-500
to-purple-600
hover:scale-105
transition-all
duration-300 px-6 py-3 rounded-2xl disabled:opacity-50 transition"
          >
            {loading ? "Thinking..." : "Send"}
          </button>

        </div>

      </div>
    </main >
  );
}