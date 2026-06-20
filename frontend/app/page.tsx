"use client";

import { useState, useEffect, useRef } from "react";
import VideoCard from "@/components/VideoCard";
import ReactMarkdown from "react-markdown";
import SplashLoader from "@/components/SplashLoader";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loadingText, setLoadingText] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);


  const [appReady, setAppReady] =
    useState(false);

  const [historyLoaded, setHistoryLoaded] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);


  useEffect(() => {

    if (!historyLoaded) return;

    localStorage.setItem(
      "learnTubeChats",
      JSON.stringify(chatHistory)
    );

  }, [chatHistory, historyLoaded]);

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
        `${process.env.NEXT_PUBLIC_API_URL}/chat`,
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

  useEffect(() => {

    const initializeApp = async () => {

      try {

        const savedChats =
          localStorage.getItem("learnTubeChats");


        if (savedChats) {

          const parsedChats = JSON.parse(savedChats);

          setChatHistory(parsedChats);

        }


        setHistoryLoaded(true);


        await new Promise(
          resolve => setTimeout(resolve, 1800)
        );


      } catch (error) {

        console.error(
          "History loading error:",
          error
        );

      }
      finally {

        setAppReady(true);

      }

    };


    initializeApp();


  }, []);

  if (!appReady) {
    return <SplashLoader />;
  }
  return (
    <main className="h-screen flex text-white bg-[#0A0A0F] overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
    fixed md:relative
    z-50
    top-0 left-0
    h-full
    w-80
    bg-white/5
    backdrop-blur-2xl
    border-r border-white/10
    p-6
    flex flex-col

    transition-transform
    duration-300

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

    md:translate-x-0
  `}
      >
        <div className="md:hidden flex justify-end mb-4">

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-xl"
          >
            ✕
          </button>

        </div>

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
      {sidebarOpen && (

        <div
          className="
      md:hidden
      fixed
      inset-0
      bg-black/50
      z-40
    "
          onClick={() => setSidebarOpen(false)}
        />

      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10">

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl"
          >
            ☰
          </button>

          <h1 className="font-bold text-lg">
            LearnTube AI
          </h1>

        </div>
        {/* <div className="md:hidden p-4 border-b border-white/10">
          <h1 className="text-xl font-bold">
            🎥 LearnTube AI
          </h1>
        </div> */}
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
        <div className="flex-1 overflow-y-auto p-3 md:p-8 space-y-6">

          {messages.length === 0 && (

            <div className="flex flex-col items-center justify-center h-full max-[600px]:min-h-[600px] max-[840px]:min-h-[560px]">

              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
                Learn Anything.
              </h1>

              <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Master Everything.
              </h2>

              <p className="text-gray-400 text-lg mb-10">
                AI-powered learning paths, courses and curated videos.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">

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

                  <div
                    className="
      bg-white/10
      backdrop-blur-xl
      border border-white/10
      p-5
      rounded-3xl
    "
                  >

                    <h3 className="text-xl font-bold mb-3">
                      📚 Learning Path
                    </h3>

                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown>
                        {msg.path}
                      </ReactMarkdown>
                    </div>

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
                        ? "ml-auto max-w-[95%] md:max-w-[75%] bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl text-white p-4 rounded-3xl shadow-lg"
                        : "max-w-[95%] md:max-w-[75%] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl backdrop-blur-md text-white p-4 rounded-3xl"
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
border-slate-700
p-3 md:p-4
bg-black/20
backdrop-blur-xl
">

          <textarea
            rows={2}
            className="
  w-full
  bg-slate-800/80
  backdrop-blur-md
  text-white
  rounded-2xl
  p-4
  outline-none
  resize-none
  text-sm md:text-base
"
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
            className="
mt-3
w-full md:w-auto
bg-gradient-to-r
from-indigo-500
to-purple-600
px-6
py-3
rounded-2xl
font-medium
shadow-lg
hover:scale-105
transition-all
"
          >
            {loading ? loadingText : "Send"}
          </button>

        </div>

      </div>
    </main >
  );
}