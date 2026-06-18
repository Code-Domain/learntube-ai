type Props = {
  text: string;
  sender: "user" | "bot";
};

export default function Message({ text, sender }: Props) {
  return (
    <div
      className={`p-3 rounded-lg max-w-[80%] ${
        sender === "user"
          ? "bg-blue-500 text-white ml-auto"
          : "bg-gray-200 text-black"
      }`}
    >
      {text}
    </div>
  );
}