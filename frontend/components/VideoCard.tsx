type Props = {
  title: string;
  channel: string;
  url: string;
  thumbnail: string;
  reason?: string;
};

export default function VideoCard({
  title,
  channel,
  url,
  thumbnail,
  reason,
}: Props) {
  return (
    <div className="max-width-sgssg border p-4 rounded-lg shadow">

      <img
        src={thumbnail}
        alt={title}
        className="w-full rounded-lg mb-3"
      />

      <h3 className="font-bold">
        {title}
      </h3>

      <p className="text-sm text-gray-600">
        {channel}
      </p>
      {reason && (
        <p className="text-sm mt-2 whitespace-pre-wrap">
          {reason}
        </p>
      )}


      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500"
      >
        Watch Video
      </a>

    </div>
  );
}