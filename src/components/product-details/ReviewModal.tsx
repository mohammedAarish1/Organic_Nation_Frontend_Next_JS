"use client";

import { useCallback, useEffect, memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Play, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAddReviewMutation } from "@/lib/services/api/reviewsApi";
import Image from "next/image";
// import Image from "next/image";

interface RatingInputProps {
  value: number;
  onChange: (rating: any) => void;
  disabled: boolean;
}

interface ImageUploadProps {
  images: any[];
  onRemove: (id: any) => void;
  disabled: boolean;
}

interface VideoUploadProps {
  video: any;
  onRemove: () => void;
  disabled: boolean;
}

// Validation Schema
const reviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Please select a rating")
    .required("Rating is required"),
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  review: Yup.string()
    .trim()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review must not exceed 1000 characters"),
  images: Yup.array()
    .max(5, "Maximum 5 images allowed")
    .test("fileSize", "Each image must be under 5MB", (files) => {
      if (!files || files.length === 0) return true;
      return files.every((file) => file.file.size <= 5 * 1024 * 1024);
    })
    .test("fileType", "Only JPG, PNG, WebP allowed", (files) => {
      if (!files || files.length === 0) return true;
      return files.every((file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(file.file.type),
      );
    }),
  video: Yup.mixed()
    .nullable()
    .test("fileSize", "Video must be under 50MB", (file) => {
      if (!file) return true;
      return (file as any).file.size <= 50 * 1024 * 1024;
    })
    .test("fileType", "Only MP4, WebM, OGG allowed", (file) => {
      if (!file) return true;
      return ["video/mp4", "video/webm", "video/ogg"].includes(
        (file as any).file.type,
      );
    }),
});

// Memoized Star Rating Component
const StarRating = memo(({ value, onChange, disabled }: RatingInputProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          disabled={disabled}
          className="rounded transition-transform hover:scale-110 focus:outline-none disabled:cursor-not-allowed"
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={36}
            fill={star <= (hoveredRating || value) ? "#F59E0B" : "none"}
            color={star <= (hoveredRating || value) ? "#F59E0B" : "#D1D5DB"}
            className="transition-colors duration-200"
          />
        </button>
      ))}
    </div>
  );
});

StarRating.displayName = "StarRating";

// Memoized Image Preview Component
const ImagePreview = memo(
  ({ images, onRemove, disabled }: ImageUploadProps) => {
    if (images.length === 0) return null;

    return (
      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
        {images.map((img) => (
          <div key={img.id} className="group relative">
            <Image
              src={img.preview}
              alt="Review preview"
              width={250}
              height={96}
              className="rounded-lg border-2 border-gray-200 object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(img.id)}
              disabled={disabled}
              className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1.5 text-white shadow-md transition-colors hover:bg-red-600 disabled:opacity-50"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    );
  },
);

ImagePreview.displayName = "ImagePreview";
// Memoized Video Preview Component
const VideoPreview = memo(({ video, onRemove, disabled }: VideoUploadProps) => {
  if (!video) return null;

  return (
    <div className="group relative">
      <video
        src={video.preview}
        className="h-48 w-full rounded-lg border-2 border-gray-200 object-cover"
        controls
      />
      <button
        type="button"
        onClick={onRemove}
        disabled={disabled}
        className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1.5 text-white shadow-md transition-colors hover:bg-red-600 disabled:opacity-50"
        aria-label="Remove video"
      >
        <X size={16} />
      </button>
    </div>
  );
});

VideoPreview.displayName = "VideoPreview";

export default function ReviewModal({ isOpen, onClose, productId }) {
  const [addReview, { isLoading }] = useAddReviewMutation();
  // Initial form values
  const initialValues = {
    rating: 0,
    title: "",
    review: "",
    images: [],
    video: null,
  };

  // Cleanup URLs on unmount

  // Cleanup function for blob URLs
  const cleanupBlobUrls = useCallback((values) => {
    values.images?.forEach((img) => URL.revokeObjectURL(img.preview));
    if (values.video) URL.revokeObjectURL(values.video.preview);
  }, []);

  // Handle image upload
  const handleImageUpload = useCallback((e, setFieldValue, currentImages) => {
    const files = Array.from(e.target.files);

    if (currentImages.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      e.target.value = "";
      return;
    }
    for (const file of files) {
      if ((file as File).size > 5 * 1024 * 1024) {
        toast.error("Each image must be under 5MB");
        e.target.value = "";
        return;
      }
      if (
        !["image/jpeg", "image/png", "image/webp"].includes((file as File).type)
      ) {
        toast.error("Only JPG, PNG, WebP allowed");
        e.target.value = "";
        return;
      }
    }

    const previews = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file as any),
    }));

    setFieldValue("images", [...currentImages, ...previews]);
    e.target.value = "";
  }, []);

  // Handle video upload
  const handleVideoUpload = useCallback((e, setFieldValue, currentVideo) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      toast.error("Video must be under 50MB");
      e.target.value = "";
      return;
    }
    if (!["video/mp4", "video/webm", "video/ogg"].includes(file.type)) {
      toast.error("Only MP4, WebM, OGG allowed");
      e.target.value = "";
      return;
    }

    // Cleanup previous video
    if (currentVideo) URL.revokeObjectURL(currentVideo.preview);

    setFieldValue("video", {
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    });

    e.target.value = "";
  }, []);

  // Remove image
  const removeImage = useCallback((id, setFieldValue, currentImages) => {
    const img = currentImages.find((i) => i.id === id);
    if (img) URL.revokeObjectURL(img.preview);
    setFieldValue(
      "images",
      currentImages.filter((i) => i.id !== id),
    );
  }, []);

  // Remove video
  const removeVideo = useCallback((setFieldValue, currentVideo) => {
    if (currentVideo) {
      URL.revokeObjectURL(currentVideo.preview);
      setFieldValue("video", null);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("productName", productId);
      formData.append("rating", values.rating);
      formData.append("title", values.title.trim());
      formData.append("review", values.review.trim());

      values.images.forEach((img) => formData.append("images", img.file));
      if (values.video) formData.append("video", values.video.file);

      // Uncomment when ready to use
      const result = await addReview(formData).unwrap();
      if (result.success) {
        toast.success(result.message);
        cleanupBlobUrls(values);
        resetForm();
        onClose();
      }

      // Temporary success simulation
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // toast.success("Review submitted successfully!");
      // cleanupBlobUrls(values);
      // resetForm();
      // onClose();
    } catch (err) {
      toast.error(err?.message || "Failed to submit review. Please try again.");
      console.error("Review submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle modal close
  const handleClose = useCallback(
    (resetForm, values) => {
      cleanupBlobUrls(values);
      resetForm();
      onClose();
    },
    [onClose, cleanupBlobUrls],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Formik
        initialValues={initialValues}
        validationSchema={reviewSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({
          values,
          setFieldValue,
          isSubmitting,
          resetForm,
          handleSubmit: formikSubmit,
        }) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => handleClose(resetForm, values)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="scrollbar-hide max-h-[70vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="mb-6 flex items-center justify-between border-b pb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Write a Review
                </h3>
                <button
                  type="button"
                  onClick={() => handleClose(resetForm, values)}
                  disabled={isSubmitting}
                  className="rounded-full p-2 transition-colors hover:bg-gray-100 disabled:opacity-50"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* FORM CONTENT */}
              <div className="space-y-6">
                {/* RATING */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-700">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <StarRating
                    value={values.rating}
                    onChange={(rating) => setFieldValue("rating", rating)}
                    disabled={isSubmitting}
                  />
                  <ErrorMessage
                    name="rating"
                    component="p"
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                {/* TITLE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Summarize your experience"
                    disabled={isSubmitting}
                    maxLength={100}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="mt-1 flex justify-between">
                    <ErrorMessage
                      name="title"
                      component="p"
                      className="text-sm text-red-500"
                    />
                    <p className="ml-auto text-xs text-gray-500">
                      {values.title.length}/100
                    </p>
                  </div>
                </div>

                {/* REVIEW */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Review <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="review"
                    as="textarea"
                    rows={5}
                    placeholder="Share your thoughts about this product..."
                    disabled={isSubmitting}
                    maxLength={1000}
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="mt-1 flex justify-between">
                    <ErrorMessage
                      name="review"
                      component="p"
                      className="text-sm text-red-500"
                    />
                    <p className="ml-auto text-xs text-gray-500">
                      {values.review.length}/1000
                    </p>
                  </div>
                </div>

                {/* IMAGE UPLOAD */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Upload Images{" "}
                    <span className="text-gray-500">(Optional)</span>
                  </label>
                  <p className="mb-3 text-xs text-gray-500">
                    Max 5 images • JPG, PNG, WebP • Up to 5MB each
                  </p>

                  {values.images.length < 5 && (
                    <label className="group block w-full cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-all hover:border-orange-500 hover:bg-orange-50/50">
                      <ImageIcon
                        className="mx-auto mb-2 text-gray-400 transition-colors group-hover:text-orange-500"
                        size={32}
                      />
                      <p className="text-sm font-medium text-gray-600 group-hover:text-orange-600">
                        Click to upload images
                      </p>
                      <input
                        type="file"
                        hidden
                        multiple
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) =>
                          handleImageUpload(e, setFieldValue, values.images)
                        }
                        disabled={isSubmitting}
                      />
                    </label>
                  )}

                  <ImagePreview
                    images={values.images}
                    onRemove={(id) =>
                      removeImage(id, setFieldValue, values.images)
                    }
                    disabled={isSubmitting}
                  />

                  <ErrorMessage
                    name="images"
                    component="p"
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                {/* VIDEO UPLOAD */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Upload Video{" "}
                    <span className="text-gray-500">(Optional)</span>
                  </label>
                  <p className="mb-3 text-xs text-gray-500">
                    MP4, WebM, OGG • Up to 50MB
                  </p>

                  {!values.video ? (
                    <label className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 transition-all hover:border-orange-500 hover:bg-orange-50/50">
                      <Play
                        size={32}
                        className="mb-2 text-gray-400 transition-colors group-hover:text-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-orange-600">
                        Click to upload video
                      </span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/ogg"
                        onChange={(e) =>
                          handleVideoUpload(e, setFieldValue, values.video)
                        }
                        className="hidden"
                        disabled={isSubmitting}
                      />
                    </label>
                  ) : (
                    <VideoPreview
                      video={values.video}
                      onRemove={() => removeVideo(setFieldValue, values.video)}
                      disabled={isSubmitting}
                    />
                  )}

                  <ErrorMessage
                    name="video"
                    component="p"
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <motion.button
                  type="button"
                  onClick={() => formikSubmit()}
                  disabled={isSubmitting || values.rating === 0}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </Formik>
    </AnimatePresence>
  );
}
