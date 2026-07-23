"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, Play } from "lucide-react";
import axios from "axios";
import { useGetProductReviewsQuery } from "@/lib/services/api/productsApi";
import Link from "next/link";
import ReviewModal from "./ReviewModal";
import { timeAgo } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MediaGrid } from "../mediaViewer";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const StarRating = ({ rating, size = 20 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = i === Math.floor(rating) && rating % 1 !== 0;
        return (
          <div key={i}>
            {filled ? (
              <Star size={size} fill="#F59E0B" color="#F59E0B" />
            ) : half ? (
              <div className="relative">
                <Star size={size} color="#D1D5DB" />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: "50%" }}
                >
                  <Star size={size} fill="#F59E0B" color="#F59E0B" />
                </div>
              </div>
            ) : (
              <Star size={size} color="#D1D5DB" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function ReviewsSection({
  categoryId = "",
  productId,
  isFullPage = false,
}) {
  const router = useRouter();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState("all");
  const [selectedTagFilter, setSelectedTagFilter] = useState("all");
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data, error, isLoading } = useGetProductReviewsQuery(productId);

  // const [lightboxOpen, setLightboxOpen] = useState(false);
  // const [lightboxMedia, setLightboxMedia] = useState([]);
  // const [lightboxIndex, setLightboxIndex] = useState(0);
  // Calculate rating distribution
  const ratingDistribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    data?.reviews.forEach((review) => {
      dist[review.rating]++;
    });
    return dist;
  }, [data?.reviews]);

  // const tags = getReviewFilterTags(categoryUrl)||[];
  // Filter reviews
  const filteredReviews = useMemo(() => {
    return data?.reviews.filter((review) => {
      const ratingMatch =
        selectedRatingFilter === "all" ||
        review.rating === parseInt(selectedRatingFilter);
      const tagMatch =
        selectedTagFilter === "all" ||
        review.review?.includes(selectedTagFilter);
      return ratingMatch && tagMatch;
    });
  }, [data?.reviews, selectedRatingFilter, selectedTagFilter]);

  const handleShowReviewModal = () => {
    if (isAuthenticated) {
      setShowReviewModal(true);
    } else {
      router.push("/login");
    }
  };

  // Display only first 3 reviews initially
  const displayedReviews = isFullPage
    ? filteredReviews
    : filteredReviews?.slice(0, 3);
  // const displayedReviews = filteredReviews;
  // const openLightbox = (media, index) => {
  //   setLightboxMedia(media);
  //   setLightboxIndex(index);
  //   setLightboxOpen(true);
  // };

  // const tags=[
  //   'all',
  //   'all2'
  // ]

  // const reviewPlatforms = [
  //   { platform: "Our Website", count: 127, rating: 4.5 },
  //   { platform: "Amazon", count: 543, rating: 4.3 },
  //   { platform: "Flipkart", count: 289, rating: 4.6 },
  // ];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Server Error in fetching reviews</div>;
  }
  return (
    <div className="bg-gray-50 py-12" id="reviews">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 border-b pb-3 text-3xl font-bold text-gray-900">
          Customer Reviews ({data?.reviews.length})
        </h2>

        {/* Review Stats */}
        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Overall Rating */}
          <div className="flex flex-col items-center justify-center rounded-2xl border-t-4 border-orange-500 bg-white p-6 text-center shadow-xl">
            <p className="text-4xl font-extrabold text-gray-900">
              {data.averageRating}
            </p>
            <StarRating rating={data.averageRating} size={28} />
            <p className="mt-2 text-sm text-gray-600">
              Based on {data.reviews.length} ratings
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShowReviewModal}
              className="mt-4 cursor-pointer rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            >
              Write a Review
            </motion.button>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-3 rounded-2xl bg-white p-6 shadow-xl lg:col-span-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating];
              const percentage =
                filteredReviews.length > 0
                  ? (count / data.reviews.length) * 100
                  : 0;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="w-4 text-sm font-medium text-gray-700">
                    {rating} ★
                  </span>
                  <div className="h-2 flex-1 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-orange-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-right text-sm text-gray-600">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-xl bg-white p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Rating Filter */}
            <div className="flex-1">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Filter by Rating
              </label>
              <div className="flex flex-wrap gap-2">
                {["all", "5", "4", "3", "2", "1"].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRatingFilter(rating)}
                    className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                      selectedRatingFilter === rating
                        ? "bg-orange-500 text-white"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {rating === "all" ? "All" : `${rating} ★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div className="flex-1">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Filter by Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {["All", "Taste", "Packaging", "Texture", "Purity"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTagFilter(tag.toLowerCase())}
                      className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                        selectedTagFilter === tag.toLowerCase()
                          ? "bg-orange-500 text-white"
                          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {tag}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {displayedReviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              // transition={{ delay: idx * 0.1 }}
              className="rounded-xl border-l-4 border-orange-500 bg-white p-6 shadow-md"
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 font-bold text-orange-500">
                    {review.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {review.userName}
                    </p>
                    {review.verified && (
                      <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 text-xs font-medium text-green-600">
                        <CheckCircle size={12} /> Verified
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <StarRating rating={review.rating} size={16} />
                  <span className="mt-1 block text-sm text-gray-500">
                    {timeAgo(review.createdAt)}
                  </span>
                </div>
              </div>

              <h5 className="mb-2 font-semibold text-gray-900">
                {review.title}
              </h5>
              <p className="mb-4 leading-relaxed text-gray-700">
                {review.review}
              </p>

              {/* Images & Videos */}
              {(review.images.length > 0 || review.hasVideo) && (
                <div className="flex flex-wrap gap-3">
                  <MediaGrid
                    images={review.images}
                    videos={review.videoUrl ? [review.videoUrl] : []}
                    // thumbnail style — matches your existing card layout
                    thumbnailWidth="w-24"
                    thumbnailHeight="h-24"
                    thumbnailRounded="rounded-lg"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* View All Reviews Button */}
        {!isFullPage && (
          <div className="mt-10 text-center">
            <Link
              href={`/shop/${categoryId.toLowerCase()}/${productId}/reviews`}
              className="rounded-xl border-2 border-orange-500 px-8 py-3 font-semibold text-orange-500 transition-colors hover:bg-orange-50"
            >
              View All {data.reviews.length} Reviews
            </Link>
          </div>
        )}
        {/* Other Platform Reviews */}
        <div className="mt-12 border-t pt-8">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Reviews from Other Platforms
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {data.otherReviews.map((review, idx) => (
              <Link
                href={review.url}
                target="_blank"
                key={idx}
                className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-md"
              >
                <h4 className="mb-2 font-semibold text-gray-900">
                  {review.platform}
                </h4>
                <StarRating rating={review.rating} size={18} />
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {review.rating}
                </p>
                <p className="text-sm text-gray-600">
                  {review.totalReviews} reviews
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        productId={productId}
      />
    </div>
  );
}
