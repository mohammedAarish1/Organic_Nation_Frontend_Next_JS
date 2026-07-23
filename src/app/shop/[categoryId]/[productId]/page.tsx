import ProductDescriptionSection from "@/components/product-details/ProductDescriptionSection";
import ProductImageGallery from "../../../../components/product-details/ProductImageGallery";
import ProductInfo from "../../../../components/product-details/ProductInfo";
// import LabCertification from "@/components/product-details/LabCertification";
import ReviewsSection from "@/components/product-details/ReviewsSection";
import FAQSection from "@/components/product-details/FAQSection";
import WhyUs from "@/components/product-details/WhyUs";
import AdditionalInfo from "@/components/product-details/AdditionalInfo";
import ServiceHighlights from "@/components/product-details/ServiceHighlights";
import PaymentMethods from "@/components/product-details/PaymentMethods";
import StickyAddToCart from "@/components/product-details/StickyAddToCart";
import YouMayAlsoLike from "@/components/product-details/YouMayAlsoLike";
import AdditionalProductImages from "@/components/product-details/AdditionalProductImages";
import ProductTabs from "@/components/product-details/ProductTabs";
import VideoSection from "@/components/product-details/VideoSection";
import { Metadata } from "next";
import { cache } from "react";
import JsonLd from "@/components/JsonLd";
import { API_BASE_URL } from "@/constants";
import { Product } from "@/types";

// This would come from your API/database

type Params = {
  categoryId: string;
  productId: string;
};

// ✅ NEW — tells Next.js which 72 pages to pre-build
export async function generateStaticParams() {
  const res = await fetch(`${API_BASE_URL}/products/all`);
  const products = await res.json();

  return products.map((p: Product) => ({
    categoryId: p["category-url"].toLowerCase(),
    productId: p["name-url"].toLowerCase(),
  }));
}

// ✅ NEW — re-generate pages in background every hour (keeps stock/price fresh)
export const revalidate = 3600;
export const dynamicParams = true;

// 👇 Your existing code — UNCHANGED
const getProductDetails = cache(async (productId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/products/product/details/${productId}`,
    { next: { revalidate: 3600 } },
  );
  if (!response.ok) return null;
  return response.json();
});

// const getProductDetails = cache(async (productId: string) => {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/products/product/details/${productId}`,
//       {
//         next: { revalidate: 300 }, // cache for 5 mins, no DB hit on every visit
//       },
//     );
//     if (!response.ok) return null;
//     return response.json();
//   } catch (error) {
//     return error.message || "Something went wrong";
//   }
// });

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { productId } = await params;
  const productData = await getProductDetails(productId);
  if (!productData) return;
  const { seoData } = productData;

  if (!seoData) return;
  return {
    title: `${seoData?.title} — Buy Online at Your Store`,
    description: `Buy ${seoData?.title} at the best price. ${seoData.description}. Free shipping available.`,
    openGraph: {
      title: seoData?.title,
      description: seoData.description,
      url: seoData.canonicalUrl,
      images: [
        {
          url: seoData.image,
          width: 800,
          height: 800,
          alt: seoData.title,
        },
      ],
      type: "website",
    },
  };
}

export default async function ProductDetails({ params }: { params: Params }) {
  const { categoryId, productId } = await params;
  const productData = await getProductDetails(productId);

  if (!productData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500">
          Product is currently unavailable. Please try again later.
        </p>
      </div>
    );
  }
  const { details, reviews, averageRating, seoData, productInfo } = productData;
  // const product = mockProduct;
  const finalPrice = Math.round(
    productData.details.price -
      (productData.details.price * productData.details.discount) / 100,
  );

  // ✅ Product schema — enables price, rating, availability in Google
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: details.name,
    description: productInfo?.description,
    image: details.img,
    sku: details["category-url"],
    brand: {
      "@type": "Brand",
      name: "Organic Nation",
    },
    offers: {
      "@type": "Offer",
      price: details.price,
      priceCurrency: "INR",
      availability: details.availability
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://organicnation.co.in/shop/${categoryId}`,
      seller: {
        "@type": "Organization",
        name: "Organic Nation",
      },
    },
    // If you have reviews in your DB, add this:
    aggregateRating:
      reviews.length > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: averageRating,
            reviewCount: reviews.length,
          }
        : undefined,
  };

  // ✅ Breadcrumb schema — shows the path in Google results
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://organicnation.co.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: details.category,
        item: `https://organicnation.co.in/shop/${details["category-url"].toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: details.name,
        item: `https://organicnation.co.in/shop/${details["category-url"].toLowerCase()}/${details["name-url"].toLowerCase()}`,
      },
    ],
  };

  return (
    <>
      {/* Inject both schemas in the page's <head> */}
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Mobile Sticky Tabs - Client Component */}
        <ProductTabs />

        {/* Main Content Area */}
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Left - Image Gallery (Client Component) */}
              <ProductImageGallery
                images={details.img}
                productName={details.name}
              />

              {/* Right - Product Info (Client Component) */}
              <ProductInfo product={productData} finalPrice={finalPrice} />
            </div>
          </div>
        </div>

        {/* Video Section (Server Component) */}
        {productInfo?.video.length > 1 && (
          <VideoSection videos={productInfo?.video} />
        )}

        <hr className="border-t border-gray-200" />

        {/* Product Description, FAQs, Reviews, etc. */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Product Description Section (Server) */}
          <ProductDescriptionSection productInfo={productData.productInfo} />

          {/* Lab Certification (Server) */}
          {/* <LabCertification /> */}

          {/* Product Gallery Grid (Server) */}
          {productInfo?.additionalImages.length > 0 && (
            <AdditionalProductImages
              images={productInfo?.additionalImages}
              productName={productData.details.name}
            />
          )}

          {/* Reviews Section (Client) */}
          <ReviewsSection categoryId={categoryId} productId={productId} />

          {/* FAQs Section (Server) */}
          {productInfo?.faqs.length > 0 && (
            <FAQSection faqs={productInfo?.faqs} />
          )}

          {/* Why Us Section (Server) */}
          <WhyUs usps={productInfo?.WhyUs} />

          {/* You may also like Products (Server) */}
          <YouMayAlsoLike categoryId={details["category-url"]} />

          {/* Additional Info (Server) */}
          <AdditionalInfo additionalInfo={productInfo?.additionalInfo || []} />

          {/* Service Highlights (Server) */}
          <ServiceHighlights />

          <hr className="border-t border-gray-200" />

          {/* Payment Methods (Server) */}
          <PaymentMethods />
        </div>

        {/* Sticky Add to Cart (Client Component) */}
        <StickyAddToCart product={details} finalPrice={finalPrice} />
      </div>
    </>
  );
}
