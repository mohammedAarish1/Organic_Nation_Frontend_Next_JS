import ReviewsSection from "@/components/product-details/ReviewsSection";

const AllReviews = async ({ params }) => {
  const { productId } = await params;
  return (
    <div className="pt-20">
      <ReviewsSection productId={productId} isFullPage />
    </div>
  );
};

export default AllReviews;
