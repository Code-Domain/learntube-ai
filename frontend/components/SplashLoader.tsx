"use client";

export default function SplashLoader() {
  return (
    <div
      className="
      fixed
      inset-0
      z-[9999]
      flex
      flex-col
      items-center
      justify-center
      bg-[#030712]
    "
    >
      {/* Glow */}

      <div
        className="
        absolute
        w-72
        h-72
        rounded-full
        bg-purple-600/20
        blur-3xl
        animate-pulse
      "
      />

      {/* Logo */}

      <div className="relative mb-8">

        <div
          className="
          w-24
          h-24
          rounded-3xl
          bg-gradient-to-br
          from-indigo-500
          to-purple-600
          flex
          items-center
          justify-center
          shadow-2xl
          animate-bounce
        "
        >
          <span className="text-4xl">
            🎓
          </span>
        </div>

      </div>

      <h1
        className="
        text-4xl
        font-bold
        text-white
        mb-3
      "
      >
        LearnTube AI
      </h1>

      <p
        className="
        text-gray-400
      "
      >
        Loading your learning experience...
      </p>

      {/* Loading dots */}

      <div className="flex gap-2 mt-8">

        <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />

        <span
          className="
          w-2
          h-2
          rounded-full
          bg-purple-500
          animate-bounce
          [animation-delay:0.15s]
        "
        />

        <span
          className="
          w-2
          h-2
          rounded-full
          bg-purple-500
          animate-bounce
          [animation-delay:0.3s]
        "
        />

      </div>
    </div>
  );
}