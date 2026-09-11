"use client";

import { useState, useEffect, useRef } from "react";
import VideoCard from "@/components/VideoCard";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SplashLoader from "@/components/SplashLoader";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loadingText, setLoadingText] = useState("Thinking...");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!historyLoaded) return;
    localStorage.setItem("learnTubeChats", JSON.stringify(chatHistory));
  }, [chatHistory, historyLoaded]);

  async function sendMessage() {
    if (!message.trim()) return;

    setLoading(true);
    setLoadingText("Thinking...");

    const userMessage = {
      sender: "user",
      type: "chat",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history: messages,
        }),
      });

      const data = await res.json();
      setLoadingText("Preparing answer...");

      let botMessage: any = {};

      if (data.type === "chat") {
        botMessage = {
          sender: "bot",
          type: "chat",
          text: data.response,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else if (data.type === "learning_path") {
        botMessage = {
          sender: "bot",
          type: "learning_path",
          path: data.path,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        botMessage = {
          sender: "bot",
          type: "youtube",
          videos: data.videos,
          explanation: data.explanation,
        };
        setMessages((prev) => [...prev, botMessage]);
      }

      const updatedMessages = [...messages, userMessage, botMessage];

      const chatTitle =
        message.length > 30 ? message.substring(0, 30) + "..." : message;

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
          type: "chat",
          text: "Error connecting to backend. Please try again later.",
        },
      ]);
    }
    setLoading(false);
  }

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const savedChats = localStorage.getItem("learnTubeChats");
        if (savedChats) {
          const parsedChats = JSON.parse(savedChats);
          setChatHistory(parsedChats);
        }
        setHistoryLoaded(true);
        await new Promise((resolve) => setTimeout(resolve, 1800));
      } catch (error) {
        console.error("History loading error:", error);
      } finally {
        setAppReady(true);
      }
    };

    initializeApp();
  }, []);

  if (!appReady) {
    return <SplashLoader />;
  }

  return (
    <main className="h-screen flex text-white bg-[#0A0A0F] overflow-hidden font-sans">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 top-0 left-0 h-full w-72 bg-[#111118] border-r border-white/5 p-4 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-xl text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mb-6 px-2">
          <h1 className="text-xl font-bold tracking-tight">
            LearnTube AI
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Personal AI Learning Companion
          </p>
        </div>

        <button
          onClick={() => {
            setMessages([]);
            setCurrentChatId(null);
          }}
          className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 py-2.5 rounded-lg font-medium text-sm text-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          New Chat
        </button>

        <div className="mt-6 flex-1 overflow-y-auto pr-1 custom-scrollbar">
          <h2 className="text-xs font-semibold text-gray-500 mb-2 px-2 uppercase tracking-wider">
            Recent Chats
          </h2>

          {chatHistory.length === 0 && (
            <p className="text-xs text-gray-600 px-2 py-4">
              No chats yet. Start by asking a question!
            </p>
          )}

          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center justify-between mb-1 group"
            >
              <button
                onClick={() => {
                  setMessages(chat.messages);
                  setCurrentChatId(chat.id);
                  setSidebarOpen(false);
                }}
                className={`flex-1 text-left px-3 py-2 rounded-lg text-sm transition-all truncate ${
                  currentChatId === chat.id
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
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
                className="ml-2 p-1 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Delete chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0A0A0F] relative">
        {/* Top Bar */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 md:px-6 bg-[#0A0A0F]/80 backdrop-blur-xl z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-400 hover:text-white"
              aria-label="Open sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                LT
              </div>
              <div>
                <h2 className="font-semibold text-sm leading-tight">
                  LearnTube AI
                </h2>
                <p className="text-[10px] text-gray-500 leading-tight">
                  Curated learning powered by AI
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6 min-h-full">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-indigo-500/20">
                  LT
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  Learn Anything. Master Everything.
                </h1>
                <p className="text-gray-500 text-base md:text-lg mb-8 max-w-md">
                  AI-powered learning paths, courses, and curated videos tailored just for you.
                </p>

                <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                  {[
                    "Learn React",
                    "Learn Machine Learning",
                    "Learn FastAPI",
                    "Python Roadmap",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setMessage(suggestion);
                        setTimeout(() => sendMessage(), 50);
                      }}
                      className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 px-4 py-3 rounded-xl text-sm text-gray-300"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, index) => {
              // Fixed: Moved logic inside a block statement to avoid stray JSX text
              let messageContent = null;

              if (msg.type === "learning_path") {
                messageContent = (
                  <div className="w-full min-w-0 bg-white/[0.03] border border-white/10 p-5 rounded-2xl rounded-tl-sm overflow-hidden">
                    <div className="flex items-center gap-2 mb-3 text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.315 0-2.56.39-3.61 1.06-.29.18-.39.56-.28.87L2.81 8.81c.12.32.49.48.79.34.58-.28 1.23-.5 1.9-.62.32-.06.5.28.5.57V17a1 1 0 001 1h4a1 1 0 001-1v-5.99c0-.29.18-.63.5-.57.67.12 1.32.34 1.9.62.3.14.67-.02.79-.34l.2-.88c.11-.31-.01-.69-.28-.87A7.968 7.968 0 009 4.804z" />
                      </svg>
                      <h3 className="text-sm font-semibold tracking-wide uppercase">Learning Path</h3>
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none break-words overflow-x-auto custom-scrollbar prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.path}
                      </ReactMarkdown>
                    </div>
                  </div>
                );
              } else if (msg.type === "youtube") {
                messageContent = (
                  <div className="w-full min-w-0 space-y-4">
                    <div className="min-w-0 bg-white/[0.03] border border-white/10 p-4 rounded-2xl rounded-tl-sm overflow-hidden">
                      <div className="flex items-center gap-2 mb-2 text-indigo-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-sm font-semibold tracking-wide uppercase">AI Analysis</h3>
                      </div>
                      <div className="prose prose-invert prose-sm max-w-none break-words overflow-x-auto custom-scrollbar prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.explanation}
                        </ReactMarkdown>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
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
                  </div>
                );
              } else {
                messageContent = (
                  <div className={`flex gap-3 items-end min-w-0 max-w-[90%] md:max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse ml-auto" : ""}`}>
                    <div className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${msg.sender === "user" ? "bg-gray-700 text-white" : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"}`}>
                      {msg.sender === "user" ? "U" : "AI"}
                    </div>
                    <div
                      className={`min-w-0 break-words overflow-x-auto custom-scrollbar ${
                        msg.sender === "user"
                          ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm shadow-lg shadow-indigo-900/20"
                          : "bg-white/[0.05] border border-white/10 text-gray-200 px-4 py-2.5 rounded-2xl rounded-bl-sm"
                      }`}
                    >
                      <div className="prose prose-invert prose-sm max-w-none prose-p:my-0 prose-headings:my-1 prose-p:leading-relaxed">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className={`fade-in-up flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {messageContent}
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start gap-3 items-end">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  AI
                </div>
                <div className="bg-white/[0.05] border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2">
                  <span className="text-sm text-gray-400">{loadingText}</span>
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F] to-transparent pt-4">
          <div className="max-w-3xl mx-auto px-4 pb-4 md:pb-6">
            <div className="relative flex items-end bg-white/[0.05] border border-white/10 focus-within:border-white/20 transition-colors rounded-2xl shadow-xl backdrop-blur-md">
              <textarea
                rows={1}
                className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 p-4 pr-14 outline-none resize-none max-h-40 overflow-y-auto custom-scrollbar"
                placeholder="Message LearnTube AI..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              
              <button
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                className={`absolute right-3 bottom-3 h-8 w-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
                  message.trim() 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                {loading ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 32 32" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.192 8.906a1.143 1.143 0 011.616 0l5.143 5.143a1.143 1.143 0 01-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 01-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 01-1.616-1.616l5.143-5.143z" fill="currentColor"/>
                  </svg>
                )}
              </button>
            </div>
            <p className="text-center text-[11px] text-gray-600 mt-2">
              LearnTube AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>

      </div>

      <style jsx global>{`
        .fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </main>
  );
}