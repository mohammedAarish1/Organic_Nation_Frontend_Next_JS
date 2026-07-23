import { MediaGrid } from "../mediaViewer";

export default function AdditionalProductImages({ images, productName }) {
  return (
    <div className="py-10">
      <h2 className="mb-6 border-b pb-3 text-center text-3xl font-bold text-gray-900">
        Product Gallery
      </h2>

      <div className="rounded-lg bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="">
            {images?.length > 0 && (
              <MediaGrid
                images={images}
                videos={[]}
                thumbnailWidth="w-60"
                thumbnailHeight="h-60"
                thumbnailRounded="rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
