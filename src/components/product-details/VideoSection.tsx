// import { Play } from "lucide-react";
import VideoPlayer from "../common/VideoPlayer";

export default function VideoSection({ videos }) {
  return (
    <div className="mt-8 scroll-smooth bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          See It In Action
        </h2>
        <div className="scrollbar-hide flex flex-row gap-5 overflow-x-auto p-1">
          {videos.map((videoUrl, index) => {
            return (
              <div key={index}>
                <VideoPlayer src={videoUrl} className="h-125" />
              </div>
              // <video
              //   key={index}
              //   src={videoUrl}
              //   className="h-[420px] w-full rounded-lg border bg-gray-700 object-center"
              //   controls
              // />
            );
          })}
        </div>
      </div>
    </div>
  );
}
